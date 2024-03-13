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
    
    async getProductsByPage(req, res) {
        const { page, size } = req.query;
        const data = await productRepository.getProductsByPage(page, size);
        res.send(data);
    }

    async getById(req, res) {
        const { id } = req.params;
        const data = await productRepository.getProductInventoryById(id);
        res.send(data);
    }

    async getProductById(req, res) {
        const { id } = req.params;
        const data = await productRepository.getProductById(id);
        res.send(data);
    }

    async getByName(req, res) {
        const { name } = req.params;
        const data = await productRepository.getProductInventoryByName(name);
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

    async searchProducts(req, res) {
        const { search = null, 
                page = 0, 
                size = 10, 
        } = req.query;

        if(search === null) {
            const data = await productRepository.getProductsByPage(page, size);
            return res.send(data);
        }
        const data = await productService.searchProducts(search, page, size);
        res.send(data);
    }

    // CREATE

    async create(req, res) {
        try {
            const {
                categoryId = null,
                type = null,
                name = null,
                description = null,
                time = null,
                mother = null,
                father = null,
                profile = null,
                inventoryType = null,
                size = null,
                sizeDescription = null,
                price = null,
                quantity = null
            } = req.body;

            const params = {
                categoryId,
                type,
                name,
                description,
                details: {
                    time,
                    mother,
                    father
                },
                profile,
                inventoryType,
                size,
                sizeDescription,
                price,
                quantity,
                image: req.files[0]
            };
            
            const data = await productService.createProductAndInventory(params);

            res.send({
                status: 201,
                message: 'Product Created',
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
                caption = null,
            } = req.body;

            const params = {
                id,
                caption,
                image: req.files[0]
            };

            const data = await productService.addProductImage(params);

            res.send({
                status: 201,
                message: 'Product Image Added',
                result: data
            });
        } catch (err) {
            console.log('UPDATE Add Product Image Error: ', err);
            throw Error('There was an error adding the product image');
        }
    }

    async updateProduct(req, res) {
        try {
            const {
                id,
                categoryId = null,
                type = null,
                name = null,
                description = null,
                time = null,
                mother = null,
                father = null,
                profile = null
            } = req.body;

            const params = {
                categoryId,
                type,
                name,
                description,
                details: {
                    time,
                    mother,
                    father
                },
                profile
            };

            Object.keys(params).forEach(param => params[param] == null && delete params[param]);

            const data = await productService.updateProduct(id, params);

            res.send({
                statusCode: 200,
                result: data
            });
        } catch (err) {
            console.log('UPDATE Product Error: ', err);
            throw Error('There was an error updating the product');
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

    async deleteProductImageById(req, res) {
        const {
            id
        } = req.body;

        const data = await productService.deleteProductImageById(id);
        res.send(data);
    }
}

export default ProductController;