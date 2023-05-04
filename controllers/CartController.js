import CartRepository from '../repositories/CartRepository.js';

const cartRepository = new CartRepository();

class CartController {
    // READ
    
    async getCart(req, res) {
        const { id } = req.userData;
        const data = await cartRepository.getCart(id);
        res.send(data);
    }
    
    async getCartContents(req, res) {
        const { id } = req.userData;
        const data = await cartRepository.getCartContents(id);
        res.send(data);
    }

    // UPDATE

    async patchCart(req, res) {
        const { id } = req.userData;
        const { products = null } = req.body;
        const params = {
            products
        };

        Object.keys(params).forEach(param => params[param] == null && delete params[param]);

        const data = await cartRepository.patchCart(id, params);
        res.send(data);
    }

}

export default CartController;