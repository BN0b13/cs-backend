import { Cart } from '../models/Associations.js';

import ProductService  from '../services/ProductService.js';

const productService = new ProductService();

export default class CartService {
    
    async getCartContents(id) {
        try {
            const res = await Cart.findAndCountAll({
                where: {
                    userId: id
                }
            });

            if(res.count === 0) {
                await this.create(id);
                return await Cart.findAndCountAll({
                    where: {
                        userId: id
                    }
                });
            }

            if(res.rows[0].products.length === 0) {
                return res;
            }

            const data = res.rows[0].products;
            const ids = data.map(item => item.productId);
            const products = await productService.getProductsByIds(ids);
            const productData = products.rows.map(item => item.dataValues);

            data.forEach((item, index) => {
                item['product'] = productData.filter(product => product.id === item.productId);
            });

            res.rows[0].products = data;

            return res;
        } catch (err) {
            console.log('Get Cart Error: ', err);
            throw Error('There was an error getting cart');
        }
    }

    modifyCart = async (userId) => {
        return Cart.update(
            {
                products: []
            },
            { 
                where: {
                    userId
                }
            });
    }
}