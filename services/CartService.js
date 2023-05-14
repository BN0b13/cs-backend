import { Cart } from '../models/Associations.js';

export default class CartService {
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