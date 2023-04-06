import Product from '../models/Product.js';

import InventoryRepository from '../repositories/InventoryRepository.js';

const inventoryRepository = new InventoryRepository();

class ProductRepository {


    // CREATE

    async create(params) {
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
        } = params;

        try {

            // TODO create inventory to pair with product
            const createInventory = await inventoryRepository.create(quantity);

            const data = {
                categoryId,
                inventoryId: createInventory.id,
                name,
                description,
                price,
                time,
                mother,
                father,
                profile,
                sex,
                image,
            };

            const createProductRes = await Product.create(data);
            console.log('Product Create res: ', createProductRes);
            return createProductRes;
        } catch (err) {
            console.log(err);
            throw Error('There was an error creating the new role');
        }
    }

    // READ

    async getProducts() {
        try {
            const data = await Product.findAndCountAll({});
            console.log('GET Products Success: ', data);
            return data;
        } catch (err) {
            console.log('GET Product Error: ', err);
            throw Error('There was an error getting the products');
        }
    }

    async getByPK(id) {
        return await Product.findByPk(id);
    }
}

export default ProductRepository;