import { Op } from 'sequelize';

import { Category, Inventory, Product, ProductImage, ProductType } from '../models/Associations.js';

class ProductRepository {

    // READ

    async getProducts() {
        try {
            const res = await Product.findAndCountAll({
                include: [
                    { 
                        model: Category,
                        required: true
                    },
                    { 
                        model: Inventory,
                        required: true
                    },
                    { 
                        model: ProductImage
                    },
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
                        model: Category,
                        required: true
                    },
                    { 
                        model: Inventory,
                        required: true
                    },
                    { 
                        model: ProductImage
                    },
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
                        model: Category,
                        required: true
                    },
                    { 
                        model: Inventory,
                        required: true
                    },
                    { 
                        model: ProductImage
                    }
                ]
            });
            return res;
        } catch (err) {
            console.log('GET Product Error: ', err);
            throw Error('There was an error getting products');
        }
    }

    async getProductsByType(type) {
        try {
            const res = await Product.findAndCountAll({
                where: {
                    type: type
                },
                include: [
                    { 
                        model: Category,
                        required: true
                    },
                    { 
                        model: Inventory,
                        required: true
                    },
                    { 
                        model: ProductImage
                    }
                ]
            });
            return res;
        } catch (err) {
            console.log('GET Product Error: ', err);
            throw Error('There was an error getting products');
        }
    }

    async getProductsByCategoryId(id) {
        try {
            const res = await Product.findAndCountAll({
                where: {
                    categoryId: id
                },
                include: [
                    { 
                        model: Category,
                        required: true
                    },
                    { 
                        model: Inventory,
                        required: true
                    },
                    { 
                        model: ProductImage
                    }
                ]
            });
            return res;
        } catch (err) {
            console.log('GET Product by Category ID Error: ', err);
            throw Error('There was an error getting products by Category ID');
        }
    }

    async getInventory() {
        try {
            const res = await Product.findAndCountAll({
                include: [
                    { 
                        model: Category,
                        required: true
                    },
                    { 
                        model: Inventory,
                        required: true
                    },
                    { 
                        model: ProductImage
                    }
                ]
            });
            const availableInventory = res.rows.filter(item => item.dataValues.Inventories[0].dataValues.available === true);
            const inventoryCount = availableInventory.map(item => {
                return {
                    categoryId: item.categoryId,
                    name: item.name,
                    description: item.description,
                    type: item.type,
                    time: item.time,
                    mother: item.mother,
                    father: item.father,
                    profile: item.profile,
                    sex: item.sex,
                    size: item.size,
                    price: item.price,
                    quantity: item.Inventories.length,
                    createdAt: item.createdAt
                }
            });
            return inventoryCount;
        } catch (err) {
            console.log('GET Product Error: ', err);
            throw Error('There was an error getting products');
        }
    }

    async getProductTypes() {
        const res = await ProductType.findAndCountAll();

        return res;
    }
}

export default ProductRepository;