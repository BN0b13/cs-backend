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
            token,
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
            // TODO update return, maybe include status?
            return 'Inventory not available';
        }

        const refId = `CS${userId + 420}-${Date.now()}`;

        let inventoryIds = [];
        
        checkInventory.data.map(inventories => inventories.map(inventory => inventoryIds.push(inventory.id)));
    
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
                    fulfilledBy: null,
                    tracking: null
                };

                const result = await Order.create(orderData, { transaction: t });

                await inventoryService.modifyInventory(inventoryIds, { transaction: t });
                
                await cartService.modifyCart(userId, { transaction: t });

                return result;
            });

            const processPayment = await paymentService.processPayment({ token, total });

            if(processPayment.payment.status === 'COMPLETED') {
                await emailService.orderReceivedEmail({ buyerEmail: email, refId });
                return {
                    status: 201,
                    refId
                };
            } else {
                throw Error('Payment failed');
            }
        } catch (err) {
            await t.rollback();
            console.log('Product Create Error: ', err);
            throw Error('There was an error creating the product');
        }
    }

    confirmInventoryIsAvailable = (productsInCart, products) => {
        // Database indexing -> important for querying through large amounts of data
        let result = true;
        const data = [];
        
        productsInCart.rows.map(product => {
            const availableInventory = product.Inventories.filter(inventory => inventory.available);
            const inCart = products.filter(cartItem => cartItem.productId === product.id);
            if(inCart[0].quantity > availableInventory.length) {
                result = false;
            } else {
                const inventoryQuantity = availableInventory.slice(availableInventory.length - inCart[0].quantity);
                data.push(inventoryQuantity);
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
} 