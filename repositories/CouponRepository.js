import { Coupon } from '../models/Associations.js';

class CouponRepository {


    // CREATE

    async create(params) {

        const data = {
            ...params,
            status: 'new',
            replied: false,
            deleted: false
        };

        try {
            const res = await Coupon.create(data);
            return {
                status: 201,
                message: 'Coupon created.',
                response: res
            };
        } catch (err) {
            console.log(err);
            throw Error('There was an error creating the coupon');
        }
    }

    // READ

    async getCoupons() {
        try {
            const res = await Coupon.findAndCountAll({});
            return res;
        } catch (err) {
            console.log('Get Coupons Error: ', err);
            throw Error('There was an error getting the coupons');
        }
    }

    async getCouponById(id) {
        try {
            const res = await Coupon.findAll(
                {
                    where: {
                        id: id
                    }
                }
            );
            return res;
        } catch (err) {
            console.log('Get Coupon by id Error: ', err);
            throw Error('There was an error getting the Coupon by id');
        }
    }

    // UPDATE 

    async updateCoupon(id, data) {
        try {
            const res = await Coupon.update(
                data,
                {
                    where: {
                                id: id
                            }
                }
            );
            return res;
        } catch (err) {
            console.log('Update Coupon Error: ', err);
            throw Error('There was an error updating the coupon');
        }
    }
}

export default CouponRepository;