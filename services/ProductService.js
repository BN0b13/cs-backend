import { sequelize } from "../db.js";

import { Inventory, Product } from '../models/Associations.js';

import ProductRepository from '../repositories/ProductRepository.js';

const productRepository = new ProductRepository();

export default class ProductService {
    createProductAndInventory = async (params) => {
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
            quantity,
            address = '',
            bay = '',
            available
        } = params;

        const t = await sequelize.transaction();

        try {
            const res = await sequelize.transaction(async (t) => {
                const productData = {
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
                };

                const result = await Product.create(productData, { transaction: t });
                const productId = result.id;
                let inventoryArr = [];

                if(quantity === 0) {
                    inventoryArr.push({
                        productId,
                        sku: `${ productId }.0`,
                        address,
                        bay,
                        available
                    });
                } else {
                    for(let i = 0; i < quantity; i++) {
                        inventoryArr.push({
                            productId,
                            sku: `${ productId }.${i}`,
                            address,
                            bay,
                            available
                        });
                    }
                }

                try {
                    await Inventory.bulkCreate(inventoryArr, { transaction: t });
                } catch (err) {
                    console.log('Create Inventory Error: '. err);
                    throw Error(`INVENTORY CREATION ERROR: ${err}`);
                }

                return result;
            });
            
            return res;
        } catch (err) {
            await t.rollback();
            console.log('Product Create Error: ', err);
            throw Error('There was an error creating the product');
        }
    }

    getProductById = async (id) => {
        return await productRepository.getProductsByIds(id);
    }

    getProductsByIds = async (ids) => {
        return await productRepository.getProductsByIds(ids);
    }
}