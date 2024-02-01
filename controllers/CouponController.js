import CouponRepository from '../repositories/CouponRepository.js';

const couponRepository = new CouponRepository();

class CouponController {

    // CREATE

    async create(req, res) {
        try {
            const {
                code = null,
                name = null,
                description = null,
                percentOff = null
            } = req.body;

            const params = {
                code,
                name,
                description,
                percentOff
            };

            Object.values(params).forEach(param => {
                if(param === null) {
                    throw Error(`Coupon missing ${params[param]} Param`);
                }
            });

            const data = await couponRepository.create(params);

            res.send(data);
        } catch (err) {
            res.send({
                err,
                message: 'There was an error creating coupon'
            });
        }
    }

    // READ
    
    async getCoupons(req, res) {
        const data = await couponRepository.getCoupons();
        res.send(data);
    }
    
    async getCouponById(req, res) {
        const { id } = req.params;
        const data = await couponRepository.getCouponById(id);
        res.send(data);
    }

    // UPDATE

    async updateCoupon(req, res) {
        const {
            id,
            code = null,
            name = null,
            description = null,
            percentOff = null
        } = req.body;

        const params = {
            code,
            name,
            description,
            percentOff
        };

        Object.keys(params).forEach(param => params[param] == null && delete params[param]);

        const data = await couponRepository.updateCoupon(id, params);
        res.send(data);
    }
}

export default CouponController;