import OrderRepository from '../repositories/OrderRepository.js';

import OrderService from '../services/OrderService.js';

const orderRepository = new OrderRepository();
const orderService = new OrderService();

class OrderController {

    // CREATE

    async create(params) {
        const data = await orderService.createOrder(params);

        return data;
    }

    async processOrder(job) {
        const {
            userId,
            email,
            orderRefId
        } = job.data;

        const params = {
            userId,
            email,
            orderRefId
        };

        const data = await orderService.processOrder(params);

        return data;
    }

    // READ
    
    async getOrders(req, res) {
        const data = await orderRepository.getOrders();
        res.send(data);
    }
    
    async getOrderId(req, res) {
        const { id } = req.params;
        const data = await orderRepository.getOrderId(id);
        res.send(data);
    }
    
    async getOrdersByUserId(req, res) {
        const { id } = req.userData;
        const data = await orderRepository.getOrdersByUserId(id);
        res.send(data);
    }
    
    async getOrdersByProductId(req, res) {
        const { productId } = req.params;
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

    async checkOrderStatus(id) {
        const data = await orderService.checkOrderStatus(id);
        return data;
    }

    // UPDATE

    async updateOrder(req, res) {
        const {
            orderId,
            status = null,
            tracking = null,
            refId = null,
            paymentLink = null,
            paid = null,
            fulfilledBy = null,
            notes = null
        } = req.body;

        const params = {
            status,
            tracking,
            refId,
            paymentLink,
            paid,
            fulfilledBy,
            notes
        };

        Object.keys(params).forEach(param => params[param] == null && delete params[param]);

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