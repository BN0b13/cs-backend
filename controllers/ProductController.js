import ProductService from '../services/ProductService.js';

import ProductRepository from '../repositories/ProductRepository.js';

const productService = new ProductService();
const productRepository = new ProductRepository();

class ProductController {

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

    async getProductsByType(req, res) {
        const { type } = req.params;
        const data = await productRepository.getProductsByType(type);
        res.send(data);
    }
    
    async getInventory(req, res) {
        const data = await productRepository.getInventory();
        res.send(data);
    }

    async getProductTypes(req, res) {
        const data = await productRepository.getProductTypes();
        res.send(data);
    }

    async getProductsByCategoryId(req, res) {
        const { id } = req.params;
        const data = await productRepository.getProductsByCategoryId(id);
        res.send(data);
    }

    async getFlavorProfiles(req, res) {
        const data = await productService.getFlavorProfiles();
        res.send(data);
    }

    async getFlavorProfilesByIds(req, res) {
        const {
            ids = null
        } = req.body;
        const data = await productService.getFlavorProfilesByIds(ids);
        res.send(data);
    }

    // CREATE

    async create(req, res) {
        try {
            const {
                categoryId = null,
                name = null,
                description = null,
                type = null,
                time = null,
                mother = null,
                father = null,
                profile = null,
                sex = null,
                size = null,
                price = null,
                quantity = null
            } = req.body;

            const params = {
                categoryId,
                name,
                description,
                type,
                time,
                mother,
                father,
                profile,
                sex,
                size,
                price,
                quantity,
                image: req.files[0]
            };
            
            const data = await productService.createProductAndInventory(params);

            res.send({
                message: 'Product Creation Result',
                result: data
            });
        } catch (err) {
            console.log('CREATE Product Error: ', err);
            throw Error('There was an error creating the product');
        }
    }

    async createFlavorProfile(req, res) {
        const {
            name = null,
            description = null
        } = req.body;

        const params = {
            name,
            description,
            image: req.files[0]
        };
        
        const data = await productService.createFlavorProfile(params);

        res.send(data);
    }
}

export default ProductController;