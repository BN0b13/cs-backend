import OrderRepository from '../repositories/OrderRepository.js';

import OrderService from '../services/OrderService.js';

const orderRepository = new OrderRepository();
const orderService = new OrderService();

class OrderController {

    // CREATE

    async create(req, res) {
        try {
        const {
            email,
            userId = req.userData.id,
            products,
            total,
            billingAddress,
            shippingAddress,
            shippingId,
            shippingTotal,
            deliveryInsurance,
            deliveryInsuranceTotal,
            couponId = null
        } = req.body;

        const params = {
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
        };
        // const {
        //     token,
        //     email,
        //     userId = req.userData.id,
        //     products,
        //     total,
        //     billingAddress,
        //     shippingAddress,
        //     shippingId,
        //     shippingTotal,
        //     deliveryInsurance,
        //     deliveryInsuranceTotal,
        //     couponId = null
        // } = req.body;

        // const params = {
        //     token,
        //     email,
        //     userId,
        //     products,
        //     total,
        //     billingAddress,
        //     shippingAddress,
        //     shippingId,
        //     shippingTotal,
        //     deliveryInsurance,
        //     deliveryInsuranceTotal,
        //     couponId
        // };

        const data = await orderService.createOrder(params);

        res.send(data);
        } catch (err) {
            res.send({
                err,
                message: 'There was an error creating the order'
            });
        }
    }

    // READ
    
    async getOrders(req, res) {
        const data = await orderRepository.getOrders();
        res.send(data);
    }
    
    async getOrdersById(req, res) {
        const { id } = req.userData;
        const data = await orderRepository.getOrdersById(id);
        res.send(data);
    }
    
    async getOrdersByProductId(req, res) {
        const { productId } = req.body;
        const data = await orderRepository.getOrdersByProductId(productId);
        res.send(data);
    }
    
    async getOrdersByRefId(req, res) {
        const { refId } = req.params;
        const data = await orderRepository.getOrdersByRefId(refId);
        res.send(data);
    }
    
    async getOrderByRef(req, res) {
        const { refId } = req.params;
        const data = await orderService.getOrderByRef(refId);
        res.send(data);
    }

    async updateOrder(req, res) {
        const {
            orderId,
            status = null,
            tracking = null,
        } = req.body;

        const params = {
            status,
            tracking
        };

        Object.keys(params).forEach(param => params[param] == null && delete params[param]);

        console.log('Params: ', params);

        const data = await orderRepository.updateOrder(orderId, params);
        res.send(data);
    }

    async paymentLink(req, res) {
        const {
            orderId,
            email = null,
            refId = null,
            status = null,
            paymentLink = null,
        } = req.body;

        const params = {
            email,
            refId,
            status,
            paymentLink
        };

        Object.keys(params).forEach(param => params[param] == null && delete params[param]);

        console.log('Params: ', params);

        const data = await orderService.sendPaymentLink(orderId, params);
        res.send(data);
    }

    async shipOrder(req, res) {
        const {
            orderId,
            email = null,
            refId = null,
            status = null,
            tracking = null,
        } = req.body;

        const params = {
            email,
            refId,
            status,
            tracking
        };

        Object.keys(params).forEach(param => params[param] == null && delete params[param]);

        const data = await orderService.shipOrder(orderId, params);
        res.send(data);
    }
}

export default OrderController;