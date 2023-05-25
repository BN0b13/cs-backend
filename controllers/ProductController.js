import ProductService from '../services/ProductService.js';

import ProductRepository from '../repositories/ProductRepository.js';

const productService = new ProductService();
const productRepository = new ProductRepository();

class ProductController {

    // CREATE

    async create(req, res) {
        try {
            const {
                categoryId,
                name,
                details,
                image,
                price,
                serialized,
                quantity
            } = req.body;

            const params = {
                categoryId,
                name,
                details,
                image,
                price,
                serialized,
                quantity
            };
            
            const data = await productService.createProductAndInventory(params);

            res.send({
                message: 'Product Creation Result',
                result: data
            });
        } catch (err) {
            res.send({
                err,
                message: 'There was an error creating product'
            });
        }
    }

    // READ
    
    async getProducts(req, res) {
        const data = await productRepository.getProducts();
        res.send(data);
    }

    async getById(req, res) {
        const { id } = req.params;
        const data = await productRepository.getProductInventoryById(id);
        res.send(data);
    }
    
    async getInventory(req, res) {
        const data = await productRepository.getInventory();
        res.send(data);
    }
}

export default ProductController;