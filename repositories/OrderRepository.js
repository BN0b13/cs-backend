import Order from '../models/Order.js';

class OrderRepository {


    // CREATE

    async create({ products, total, couponId }) {
        const params = {
            products,
            total,
            couponId
        };

        try {
            const res = await Order.create(params);
            return res;
        } catch (err) {
            console.log('Order Create Error: ', err);
            throw Error('There was an error creating the new role');
        }
    }

    // READ

    async getOrders() {
        try {
            const res = await Order.findAndCountAll({});
            return res;
        } catch (err) {
            console.log('Get Role Messages Error: ', err);
            throw Error('There was an error getting all roles');
        }
    }
}

export default OrderRepository;