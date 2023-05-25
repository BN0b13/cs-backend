import Order from '../models/Order.js';

class OrderRepository {

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
}

export default OrderRepository;