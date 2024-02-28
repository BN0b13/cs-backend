import { Op } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

import { sequelize } from "../db.js";

import { Order } from '../models/Associations.js';

import CartService from './CartService.js';
import EmailService from './EmailService.js';
import InventoryService from './InventoryService.js';
import PaymentService from './PaymentService.js'
import ProductService from './ProductService.js';
import OrderRepository from '../repositories/OrderRepository.js';

const cartService = new CartService();
const emailService = new EmailService();
const inventoryService = new InventoryService();
const paymentService = new PaymentService();
const productService = new ProductService();
const orderRepository = new OrderRepository();

export default class OrderService {

    // Create

    createOrder = async (params) => {
        const {
            userId,
            products,
            total,
            billingAddress,
            shippingAddress,
            shippingId,
            shippingTotal,
            deliveryInsurance,
            deliveryInsuranceTotal,
            couponId,
            saleId,
            notes = null,
            paymentType
        } = params;

        const refId = uuidv4();

        try {
            const res = await sequelize.transaction(async (t) => {
        
                const orderData = {
                    userId,
                    refId,
                    products,
                    total,
                    billingAddress,
                    shippingAddress,
                    shippingId,
                    shippingTotal,
                    deliveryInsurance,
                    deliveryInsuranceTotal,
                    couponId,
                    saleId,
                    status: 'pending',
                    paid: false,
                    paymentLink: '',
                    fulfilledBy: null,
                    tracking: null,
                    notes,
                    paymentType
                };

                const result = await Order.create(orderData, { transaction: t });
                return result;
            });

            return {
                result: res,
                status: 201,
                refId
            };
        } catch (err) {
            console.log('Order Create Error: ', err);
            throw Error('There was an error creating the Order');
        }
    }

    sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

    checkOrderStatus = async (id) => {
        let orderPending = true;
        let order;

        while(orderPending) {
            await this.sleep(1000);
            const getOrder = await orderRepository.getOrderById(id);
            
            if(getOrder.dataValues.status !== 'pending') {
                orderPending = false;
                order = getOrder.dataValues;
                break;
            }
        }

        return order;
    }

    processOrder = async (params) => {
        const {
            userId,
            email,
            orderRefId
        } = params;

        const order = await Order.findOne({
            where: {
                refId: orderRefId
            }
        });

        const orderId = order.dataValues.id;
        const products = order.dataValues.products;

        
        const productIds = products.map(product => product.productId);
        const getProductsInCart = await productService.getProductsByIds(productIds);

        const checkInventory = this.confirmInventoryIsAvailable(getProductsInCart, products);

        if(!checkInventory.result) {
            await orderRepository.deleteOrder(orderId);
            await cartService.modifyCart(userId);

            return {
                status: 404,
                message: 'Inventory not available'
            };
        }

        let newInventoryQuantity = [];
        
        checkInventory.data.map(inventory => newInventoryQuantity.push(inventory));

        try {
            const res = await sequelize.transaction(async (t) => {

                for(const singleInventory of newInventoryQuantity) {
                    await inventoryService.modifyInventory(singleInventory, { transaction: t });
                }

                
                await cartService.modifyCart(userId, { transaction: t });

                return;
            });

            // const processPayment = await paymentService.processPayment({ token, total });

            // if(processPayment.payment.status === 'COMPLETED') {

                await emailService.orderReceivedEmail({ buyerEmail: email, refId: orderRefId });

                await orderRepository.updateOrder(orderId, { status: 'new' });

                return {
                    status: 201
                };
            // } else {
            //     throw Error('Payment failed');
            // }
        } catch (err) {
            console.log('Order Create Error: ', err);
            throw Error('There was an error creating the Order');
        }
    }

    confirmInventoryIsAvailable = (inventoryProducts, productsInCart) => {
        // Database indexing -> important for querying through large amounts of data
        let result = true;
        const data = [];
        
        inventoryProducts.rows.map(product => {
            const inventoryId = product.Inventories[0].id;
            const inventoryQuantity = product.Inventories[0].quantity;
            const productInCart = productsInCart.filter(item => item.productId === product.id);
            const quantityRequested = productInCart[0].quantity;
            if(inventoryQuantity === 0 ||
                inventoryQuantity < quantityRequested) {
                result = false;
            } else {
                data.push({
                    id: inventoryId,
                    quantity: inventoryQuantity - quantityRequested
                });
            }
        });

        return {
            result,
            data
        };
    }

    // Read

    async getOrderById(id) {
        try {
            const res = await Order.findAndCountAll({
                where: {
                    userId: id
                }
            });

            const data = res.rows[0].products;
            const ids = data.map(item => item.productId);
            const products = await productService.getProductsByIds(ids);
            const productData = products.rows.map(item => item.dataValues);

            data.forEach((item, index) => {
                item['product'] = productData.filter(product => product.id === item.productId);
            });

            res.rows[0].products = data;

            return res;
        } catch (err) {
            console.log('Get Orders Messages Error: ', err);
            throw Error('There was an error getting all orders');
        }
    }

    async getOrderByRef(refId) {
        try {
            const res = await Order.findAndCountAll({
                where: {
                    refId
                }
            });

            if(res.count === 0) {
                return {
                    status: 404
                }
            }

            const data = res.rows[0].products;
            const ids = data.map(item => item.productId);
            const products = await productService.getProductsByIds(ids);
            const productData = products.rows.map(item => item.dataValues);

            data.forEach((item, index) => {
                item['product'] = productData.filter(product => product.id === item.productId);
            });

            res.rows[0].products = data;

            return res;
        } catch (err) {
            console.log('Get Order By Ref Error: ', err);
            throw Error('There was an error getting order by ref');
        }
    }

    async sendPaymentLink(orderId, data) {
        try {
        const {
            email,
            refId,
            paymentLink,
            status
        } = data;

        const params = {
            status,
            paymentLink
        }
        
            const res = await Order.update(
                params,
                {
                    where: {
                        id: orderId
                    }
                }
            );

            await emailService.sendPaymentLink({ buyerEmail: email, refId, paymentLink });

            return res;
        } catch (err) {
            console.log('Update User Error: ', err);
            throw Error('There was an error updating the user');
        }

    }

    async shipOrder(orderId, data) {
        try {
        const {
            email,
            refId,
            status,
            tracking
        } = data;

        const params = {
            status,
            tracking
        }
        
            const res = await Order.update(
                params,
                {
                    where: {
                        id: orderId
                    }
                }
            );

            await emailService.orderShippedEmail({ buyerEmail: email, refId, tracking });

            return res;
        } catch (err) {
            console.log('Update User Error: ', err);
            throw Error('There was an error updating the user');
        }

    }
}

// const processOrder = async (job) => {

//     const {
//         userId,
//         products,
//         total,
//         billingAddress,
//         shippingAddress,
//         shippingId,
//         shippingTotal,
//         deliveryInsurance,
//         deliveryInsuranceTotal,
//         couponId
//     } = job;
    
    
//     const productIds = products.map(product => product.productId);
//     const getProductsInCart = await productService.getProductsByIds(productIds);

//     const checkInventory = confirmInventoryIsAvailable(getProductsInCart, products);

//     if(!checkInventory.result) {
//         console.log('Inventory not available');
//         return {
//             status: 404,
//             message: 'Inventory not available'
//         };
//     }

//     const refId = `CS${userId + 420}-${Date.now()}`;

//     let newInventoryQuantity = [];
    
//     checkInventory.data.map(inventory => newInventoryQuantity.push(inventory));

//     try {
//         const res = await sequelize.transaction(async (t) => {
    
//             const orderData = {
//                 userId,
//                 refId,
//                 products,
//                 total,
//                 billingAddress,
//                 shippingAddress,
//                 shippingId,
//                 shippingTotal,
//                 deliveryInsurance,
//                 deliveryInsuranceTotal,
//                 couponId,
//                 status: 'new',
//                 paid: false,
//                 paymentLink: '',
//                 fulfilledBy: null,
//                 tracking: null,
//                 notes: null
//             };

//             const result = await Order.create(orderData, { transaction: t });

//             for(const singleInventory of newInventoryQuantity) {
//                 console.log('Id in for loop: ', singleInventory);
//                 await inventoryService.modifyInventory(singleInventory, { transaction: t });
//             }
            
//             await cartService.modifyCart(userId, { transaction: t });

//             return result;
//         });

//         // await emailService.orderReceivedEmail({ buyerEmail: email, refId });
//         return {
//             res,
//             status: 201,
//             refId
//         };
//     } catch (err) {
//         console.log('Order Create Error: ', err);
//         throw Error('There was an error creating the Order');
//     }
// }

// const confirmInventoryIsAvailable = (inventoryProducts, productsInCart) => {
//     // Database indexing -> important for querying through large amounts of data
//     let result = true;
//     const data = [];
    
//     inventoryProducts.rows.map(product => {
//         const inventoryId = product.Inventories[0].id;
//         const inventoryQuantity = product.Inventories[0].quantity;
//         const productInCart = productsInCart.filter(item => item.productId === product.id);
//         const quantityRequested = productInCart[0].quantity;
//         if(inventoryQuantity === 0 ||
//             inventoryQuantity < quantityRequested) {
//             result = false;
//         } else {
//             data.push({
//                 id: inventoryId,
//                 quantity: inventoryQuantity - quantityRequested
//             });
//         }
//     });

//     console.log('Data: ', data);

//     return {
//         result,
//         data
//     };
// }

// orderQueue.process(processOrder);