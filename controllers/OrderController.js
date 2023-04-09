import OrderRepository from '../repositories/OrderRepository.js';

const orderRepository = new OrderRepository();

class OrderController {

    // CREATE

    async create(req, res) {
        try {
        const {
            userId = req.userData.id,
            products,
            total,
            couponId = null
        } = req.body;

        const params = {
            userId,
            products,
            total,
            couponId
        };

        const data = await orderRepository.create(params);

        const orderProducts = data.products;
        const orderTotal = data.total;

        res.send({
            status: 201,
            data: {
                products: orderProducts,
                total: orderTotal
            }
        });
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

}

export default OrderController;