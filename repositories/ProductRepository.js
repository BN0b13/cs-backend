import { Op } from 'sequelize';

import { Category, Inventory, Product, ProductImage } from '../models/Associations.js';

class ProductRepository {

    // READ

    async getProducts({ sortKey = 'createdAt', sortDirection = 'ASC', size = 10, page = 0 }) {
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
                ],
                order: [
                    [sortKey, sortDirection],
                ],
                limit: size,
                offset: page,
            });
            return res;
        } catch (err) {
            console.log('Get Products Error: ', err);
            throw Error('There was an error getting all products');
        }
    }

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

    async getProductsByPage(page, size) {
        try {
            const currentPage = page * size;
            const res = await Product.findAndCountAll({
                limit: size,
                offset: currentPage,
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
            console.log('GET Products By Page Error: ', err);
            throw Error('There was an error getting products by page');
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

    async getProductById(id) {
        try {
            const res = await Product.findOne({
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

            if(res === null) {
                return {
                    statusCode: 404
                }
            }

            return {
                statusCode: 200,
                data: res
            };
        } catch (err) {
            console.log('GET Product Error: ', err);
            throw Error('There was an error getting products');
        }
    }

    async getProductInventoryByName(name) {
        try {
            const res = await Product.findAndCountAll({
                where: {
                    name
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
                    type: item.type,
                    name: item.name,
                    description: item.description,
                    details: item.details,
                    profile: item.profile,
                    inventoryType: item.Inventories.type,
                    size: item.Inventories.size,
                    sizeDescription: item.Inventories.sizeDescription,
                    price: item.Inventories.price,
                    quantity: item.Inventories.quantity,
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