import OrderRepository from '../repositories/OrderRepository.js';

import OrderService from '../services/OrderService.js';

const orderRepository = new OrderRepository();
const orderService = new OrderService();

class OrderController {

    // CREATE

    async create(req, res) {
        try {
        const {
            token,
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
        };

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
    
    async getOrderByRef(req, res) {
        const { refId } = req.params;
        const data = await orderService.getOrderByRef(refId);
        res.send(data);
    }
}

export default OrderController;