import ProductRepository from '../repositories/ProductRepository.js';

const productRepository = new ProductRepository();

class ProductController {

    // CREATE

    async create(req, res) {
        try {
            const {
                categoryId,
                name,
                description,
                price,
                time,
                mother,
                father,
                profile,
                sex,
                image,
                quantity
            } = req.body;

            const params = {
                categoryId,
                name,
                description,
                price,
                time,
                mother,
                father,
                profile,
                sex,
                image,
                quantity
            };

            const data = await productRepository.create(params);

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

    async getByPK(req, res) {
        const { id } = req.params;
        const data = await productRepository.getByPK(id);
        res.send(data);
    }

}

export default ProductController;