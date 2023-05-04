import { Op } from 'sequelize';

import { Cart, Product } from '../models/Associations.js';

import { getProductsByIds}  from '../services/ProductTransactions.js';

class CartRepository {


    // CREATE

    async create(id) {
        const params = {
            userId: id,
            products: []
        };

        try {
            const res = await Cart.create(params);
            return res;
        } catch (err) {
            console.log(err);
            throw Error('There was an error creating the cart');
        }
    }

    // READ

    async getCart(id) {
        try {
            const res = await Cart.findAndCountAll({
                where: {
                    userId: id
                }
            });

            // TODO make seeder and remove if statement
            if(res.count === 0) {
                await this.create(id);
                return await Cart.findAndCountAll({
                    where: {
                        userId: id
                    }
                });
            }

            return res;
        } catch (err) {
            console.log('Get Cart Error: ', err);
            throw Error('There was an error getting cart');
        }
    }

    async getCartContents(id) {
        try {
            const res = await Cart.findAndCountAll({
                where: {
                    userId: id
                }
            });

            const data = res.rows[0].products;
            const ids = data.map(item => item.productId);

            const products = await getProductsByIds(ids);

            const productData = products.rows.map(item => item.dataValues);

            data.forEach((item, index) => {
                item['productDetails'] = productData.filter(product => product.id === item.productId);
            });

            return data;
        } catch (err) {
            console.log('Get Cart Error: ', err);
            throw Error('There was an error getting cart');
        }
    }

    // UPDATE

    async patchCart(id, data) {
        try {
            const res = await Cart.update(
                data,
                {
                    where: {
                                userId: id
                            }
                }
            );
            return res;
        } catch (err) {
            console.log('Add to Cart Error: ', err);
            throw Error('There was an error adding to cart');
        }
    }
}

export default CartRepository;