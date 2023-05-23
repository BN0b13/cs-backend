import Order from '../models/Order.js';

import { deliveryInsuranceAmount, shippingAndHandling } from '../config.js';

class OrderRepository {


    // CREATE

    async create(data) {
        const {
            userId,
            products,
            total,
            billingAddress,
            shippingAddress,
            shipping,
            deliveryInsurance,
            couponId
        } = data;
        // TODO create helper function to check inventory and remove inventory

        // TODO generate ref id to return to customer
        const refId = 'CS420CS420420';

        const params = {
            userId,
            refId,
            products,
            total,
            billingAddress,
            shippingAddress,
            shipping,
            deliveryInsurance,
            couponId,
            status: 'new'
        };

        console.log('Order params: ', params);

        try {
            const res = await Order.create(params);
            return res;
        } catch (err) {
            console.log('Order Create Error: ', err);
            throw Error('There was an error creating the order');
        }
    }

    // READ

    async getOrders() {
        try {
            const res = await Order.findAndCountAll({});
            return res;
        } catch (err) {
            console.log('Get Orders Messages Error: ', err);
            throw Error('There was an error getting all orders');
        }
    }

    async getOrdersById(id) {
        try {
            const res = await Order.findAndCountAll({
                where: {
                    userId: id
                }
            });
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
            return res;
        } catch (err) {
            console.log('Get Orders Messages Error: ', err);
            throw Error('There was an error getting all orders');
        }
    }

    getDeliveryInsuranceAmount() {
        return { 
            deliveryInsuranceAmount,
            shippingAndHandling
        };
    }
}

export default OrderRepository;