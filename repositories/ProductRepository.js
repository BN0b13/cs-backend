import { Op } from 'sequelize';
import { sequelize } from '../db.js';
const t = await sequelize.transaction();

import InventoryRepository from '../repositories/InventoryRepository.js';

import { Category, Inventory, Product } from '../models/Associations.js';

const inventoryRepository = new InventoryRepository();

class ProductRepository {

    // READ

    async getProducts() {
        try {
            const res = await Product.findAndCountAll({
                include: [
                    { 
                        model: Inventory,
                        required: true
                    },
                    { 
                        model: Category,
                        required: true
                    }
                ]
            });
            return res;
        } catch (err) {
            console.log('GET Product Error: ', err);
            throw Error('There was an error getting products');
        }
    }

    async getProductInventoryById(id) {
        try {
            const res = await Product.findAndCountAll({
                where: {
                    id
                },
                include: [
                    { 
                        model: Inventory,
                        required: true
                    }
                ]
            });
            return res;
        } catch (err) {
            console.log('GET Product Error: ', err);
            throw Error('There was an error getting products');
        }
    }

    async getProductsByIds(ids) {
        try {
            const res = await Product.findAndCountAll({
                where: {
                    id: {
                        [Op.in]: ids
                    }
                },
                include: [
                    { 
                        model: Inventory,
                        required: true
                    },
                    { 
                        model: Category,
                        required: true
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
                        model: Inventory,
                        required: true
                    },
                    { 
                        model: Category,
                        required: true
                    }
                ]
            });
            console.log('Res rows: ', res.rows);
            const availableInventory = res.rows.filter(item => item.dataValues.Inventories[0].dataValues.available === true);
            const inventoryCount = availableInventory.map(item => {
                return {
                    categoryId: item.categoryId,
                    name: item.name,
                    quantity: item.Inventories.length,
                    price: item.price,
                    time: item.time,
                    mother: item.mother,
                    father: item.father,
                    profile: item.profile,
                    sex: item.sex,
                    image: item.image,
                    createdAt: item.createdAt
                }
            });
            return inventoryCount;
        } catch (err) {
            console.log('GET Product Error: ', err);
            throw Error('There was an error getting products');
        }
    }
}

export default ProductRepository;