import OrderRepository from '../repositories/OrderRepository.js';

import OrderService from '../services/OrderService.js';

const orderRepository = new OrderRepository();
const orderService = new OrderService();

class OrderController {

    // CREATE

    async create(req, res) {
        try {
            // TODO Make helper function with transactions to update necessary inventory to available false and empty customer's cart
        const {
            token,
            email,
            userId = req.userData.id,
            products,
            total,
            billingAddress,
            shippingAddress,
            shipping,
            deliveryInsurance,
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
            shipping,
            deliveryInsurance,
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
        const data = await orderRepository.getOrderByRef(refId);
        res.send(data);
    }
    
    async getDeliveryInsuranceAmount(req, res) {
        const data = orderRepository.getDeliveryInsuranceAmount();
        res.send(data);
    }

}

export default OrderController;