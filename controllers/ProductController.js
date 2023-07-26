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

    async getProductProfiles(req, res) {
        const data = await productService.getProductProfiles();
        res.send(data);
    }

    async getProductProfilesByIds(req, res) {
        const {
            ids = null
        } = req.body;
        const data = await productService.getProductProfilesByIds(ids);
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

    async createProductProfile(req, res) {
        const {
            name = null,
            description = null
        } = req.body;

        const params = {
            name,
            description,
            image: req.files[0]
        };
        
        const data = await productService.createProductProfile(params);

        res.send(data);
    }

    // UPDATE

    async addProductImage(req, res) {
        try {
            const {
                id,
                caption,
            } = req.body;

            const params = {
                id,
                caption,
                image: req.files[0]
            };
            
            const data = await productService.addProductImage(params);

            res.send({
                message: 'Product Creation Result',
                result: data
            });
        } catch (err) {
            console.log('CREATE Product Error: ', err);
            throw Error('There was an error creating the product');
        }
    }

    async updateProduct(req, res) {
        try {
            const {
                id,
                categoryId = null,
                name = null,
                description = null,
                type = null,
                time = null,
                mother = null,
                father = null,
                profile = null,
                sex = null,
                price = null,
                productInventoryId = null,
                quantity = null,
                size = null,
                sku = null,
                address = null,
                bay = null,
                available = null,
                productImageId = null,
                caption = null,
                position = null
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
                price
            };

            const inventoryParams = {
                quantity,
                size,
                sku,
                address,
                bay,
                available
            }

            const productImageParams = {
                caption,
                position
            }

            Object.keys(params).forEach(param => params[param] == null && delete params[param]);

            Object.keys(inventoryParams).forEach(inventoryParam => inventoryParams[inventoryParam] == null && delete inventoryParams[inventoryParam]);
            
            Object.keys(productImageParams).forEach(productImageParam => productImageParams[productImageParam] == null && delete productImageParams[productImageParam]);

            const data = await productService.updateProduct(id, params, productInventoryId, inventoryParams, productImageId, productImageParams);

            res.send({
                message: 'Product Creation Result',
                result: data
            });
        } catch (err) {
            console.log('CREATE Product Error: ', err);
            throw Error('There was an error creating the product');
        }
    }

    // DELETE

    async deleteProduct(req, res) {
        const {
            id
        } = req.body;

        const data = await productService.deleteProduct(id);
        res.send(data);
    }
}

export default ProductController;