import CartRepository from '../repositories/CartRepository.js';

import CartService from '../services/CartService.js';

const cartRepository = new CartRepository();
const cartService = new CartService();

class CartController {

    // READ
    
    async getCart(req, res) {
        const { id } = req.userData;
        const data = await cartRepository.getCart(id);
        res.send(data);
    }
    
    async getCartContents(req, res) {
        const { id } = req.userData;
        const data = await cartService.getCartContents(id);
        res.send(data);
    }
    
    async getCartsWithContents(req, res) {
        const data = await cartRepository.getCartsWithContents();
        res.send(data);
    }

    // UPDATE

    async patchCart(req, res) {
        const { id } = req.userData;
        const { products = null } = req.body;
        const params = {
            products
        };

        const data = await cartRepository.patchCart(id, params);
        res.send(data);
    }

}

export default CartController;