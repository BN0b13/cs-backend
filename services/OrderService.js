import { Op } from 'sequelize';

import { sequelize } from "../db.js";

import { Order } from '../models/Associations.js';

import CartService from './CartService.js';
import EmailService from './EmailService.js';
import InventoryService from './InventoryService.js';
import PaymentService from './PaymentService.js'
import ProductService from './ProductService.js';

const cartService = new CartService();
const emailService = new EmailService();
const inventoryService = new InventoryService();
const paymentService = new PaymentService();
const productService = new ProductService();


export default class OrderService {

    // Create

    createOrder = async (params) => {
        const {
            email,
            userId,
            products,
            total,
            billingAddress,
            shippingAddress,
            shippingId,
            shippingTotal,
            deliveryInsurance,
            deliveryInsuranceTotal,
            couponId
        } = params;
        
        const productIds = products.map(product => product.productId);
        const getProductsInCart = await productService.getProductsByIds(productIds);

        const checkInventory = this.confirmInventoryIsAvailable(getProductsInCart, products);

        if(!checkInventory.result) {
            console.log('Inventory not available');
            return {
                status: 404,
                message: 'Inventory not available'
            };
        }

        const refId = `CS${userId + 420}-${Date.now()}`;

        let newInventoryQuantity = [];
        
        checkInventory.data.map(inventory => newInventoryQuantity.push(inventory));
    
        const t = await sequelize.transaction();

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
                    status: 'new',
                    paid: false,
                    paymentLink: '',
                    fulfilledBy: null,
                    tracking: null,
                    notes: null
                };

                const result = await Order.create(orderData, { transaction: t });

                // TODO logic for new quantity after successful order

                for(const singleInventory of newInventoryQuantity) {
                    console.log('Id in for loop: ', singleInventory);
                    await inventoryService.modifyInventory(singleInventory, { transaction: t });
                }

                
                await cartService.modifyCart(userId, { transaction: t });

                return result;
            });

            // const processPayment = await paymentService.processPayment({ token, total });

            // if(processPayment.payment.status === 'COMPLETED') {
                await emailService.orderReceivedEmail({ buyerEmail: email, refId });
                return {
                    status: 201,
                    refId
                };
            // } else {
            //     throw Error('Payment failed');
            // }
        } catch (err) {
            await t.rollback();
            console.log('Product Create Error: ', err);
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

        console.log('Data: ', data)

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