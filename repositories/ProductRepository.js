import InventoryRepository from '../repositories/InventoryRepository.js';

import { Category, Inventory, Product } from '../models/Associations.js';

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

            const res = await Product.create(data);
            return res;
        } catch (err) {
            console.log(err);
            throw Error('There was an error creating the product');
        }
    }

    // READ

    async getProducts() {
        try {
            const res = await Product.findAndCountAll({
                include: [
                    { 
                        model: Inventory
                    },
                    { 
                        model: Category
                    }
                ]
            });
            return res;
        } catch (err) {
            console.log('GET Product Error: ', err);
            throw Error('There was an error getting products');
        }
    }

    async getInventory() {
        try {
            const res = await Product.findAndCountAll({
                include: [
                    { 
                        model: Inventory
                    },
                    { 
                        model: Category
                    }
                ]
            });
            const availableInventory = res.rows.filter(item => item.Inventory.quantity> 0);
            return availableInventory;
        } catch (err) {
            console.log('GET Product Error: ', err);
            throw Error('There was an error getting products');
        }
    }

    async getByPK(id) {
        return await Product.findByPk(id);
    }
}

export default ProductRepository;