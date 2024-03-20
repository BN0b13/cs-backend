import { Sequelize, Op } from 'sequelize';
import dayjs from 'dayjs';

import { sequelize } from '../db.js';

import { Coupon, Order, Sale } from '../models/Associations.js';

class OrderRepository {

    // READ

    async getOrders() {
        try {
            const res = await Order.findAndCountAll({
                include: [
                    { 
                        model: Coupon
                    },
                    { 
                        model: Sale
                    }
                ]
            });
            return res;
        } catch (err) {
            console.log('Get Orders Messages Error: ', err);
            throw Error('There was an error getting all orders');
        }
    }

    async getOrderById(id) {
        try {
            const res = await Order.findOne({
                where: {
                    id
                },
                include: [
                    { 
                        model: Coupon
                    },
                    { 
                        model: Sale
                    }
                ]
            });
            return res;
        } catch (err) {
            console.log('Get Order Error: ', err);
            throw Error('There was an error getting order by id');
        }
    }

    async getOrdersByUserId(id) {
        try {
            const res = await Order.findAndCountAll({
                where: {
                    userId: id
                },
                include: [
                    { 
                        model: Coupon
                    },
                    { 
                        model: Sale
                    }
                ]
            });
            return res;
        } catch (err) {
            console.log('Get Orders Messages Error: ', err);
            throw Error('There was an error getting all orders');
        }
    }

    async getOrdersByProductId(productId) {
        try {
            const res = await sequelize.query(`select *
            from cosmic."Orders"
            where products @> '[{"productId": ${productId}}]'::jsonb`);
            return res;
        } catch (err) {
            console.log('Get Orders Messages Error: ', err);
            throw Error('There was an error getting all orders');
        }
    }

    async getOrderByRefId(refId) {
        try {
            const res = await Order.findOne({
                where: {
                    refId: refId
                },
                include: [
                    { 
                        model: Coupon
                    },
                    { 
                        model: Sale
                    }
                ]
            });

            return res;
        } catch (err) {
            console.log('Get Orders Messages Error: ', err);
            throw Error('There was an error getting all orders');
        }
    }

    async getOrderByRef(refId) {
        try {
            const res = await Order.findOne({
                where: {
                    refId
                },
                include: [
                    { 
                        model: Coupon
                    },
                    { 
                        model: Sale
                    }
                ]
            });
            return res;
        } catch (err) {
            console.log('Get Orders Messages Error: ', err);
            throw Error('There was an error getting all orders');
        }
    }

    async getOrdersByDateRange({ start, end }) {
        try {
            const startDate = dayjs.unix(start);
            const endDate = dayjs.unix(end);
            
            const res = await Order.findAndCountAll({
                where: {
                    createdAt: {
                       [Op.between]: [startDate.$d, endDate.$d],
                    },
                },
                include: [
                    { 
                        model: Coupon
                    },
                    { 
                        model: Sale
                    }
                ]
            });
            return res;
        } catch (err) {
            console.log('Get Order By Date Range Error: ', err);
            throw Error('There was an error getting order by date range');
        }
    }

    // UPDATE

    async updateOrder(orderId, data) {
        try {
            const res = await Order.update(
                data,
                {
                    where: {
                                id: orderId
                            }
                }
            );
            return res;
        } catch (err) {
            console.log('Update User Error: ', err);
            throw Error('There was an error updating the user');
        }
    }

    // DELETE

    async deleteOrder(id) {
        try {
            const res = await Order.destroy(
                {
                    where: {
                                id
                            }
                }
            );
            return res;
        } catch (err) {
            console.log('DELETE Order Error: ', err);
            throw Error('There was an error deleting the order');
        }
    }
    
}

export default OrderRepository;