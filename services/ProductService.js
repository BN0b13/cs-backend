import fs from 'fs';
import { Op } from 'sequelize';
import { sequelize } from "../db.js";

import { 
    FlavorProfile, 
    Inventory, 
    Product, 
    ProductImage 
} from '../models/Associations.js';

import ProductRepository from '../repositories/ProductRepository.js';

const productRepository = new ProductRepository();

export default class ProductService {
    // READ

    getProductById = async (id) => {
        return await productRepository.getProductsByIds(id);
    }

    getProductsByIds = async (ids) => {
        return await productRepository.getProductsByIds(ids);
    }

    getFlavorProfiles = async () => {
        try {
            const res = await FlavorProfile.findAndCountAll(); 
            return res;
        } catch (err) {
            console.log('GET Flavor Profiles Error: ', err);
            throw Error('There was an error getting Flavor Profiles');
        }
    }

    getFlavorProfilesByIds = async (ids) => {
        try {
            const res = await FlavorProfile.findAndCountAll(
                {
                    where: {
                        id: {
                                [Op.in]: ids
                            }
}
                }
            ); 
            return res;
        } catch (err) {
            console.log('GET Flavor Profiles Error: ', err);
            throw Error('There was an error getting Flavor Profiles');
        }
    }

    // CREATE

    createProductAndInventory = async (params) => {
        const {
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
            address = '',
            bay = '',
            available,
            image
        } = params;

        const flavorProfile = [];

        for(let id of profile) {
            const reg = /^\d+$/;

            if(reg.test(id)) {
                flavorProfile.push(parseInt(id));
            }
        }

        const t = await sequelize.transaction();

        try {
            const res = await sequelize.transaction(async (t) => {
                const productData = {
                    categoryId,
                    name,
                    description,
                    type,
                    time,
                    mother,
                    father,
                    profile: flavorProfile,
                    sex,
                    size,
                    price
                };

                const result = await Product.create(productData, { transaction: t });
                const productId = result.id;

                const productImageData = {
                    productId,
                    name,
                    filename: image.filename,
                    path: `/img/products/${image.filename}`,
                    link: '',
                    position: 1
                }

                await ProductImage.create(productImageData, { transaction: t });

                const inventoryData = {
                    productId,
                    quantity,
                    sku: `${ productId }.1`,
                    address,
                    bay,
                    available
                };

                try {
                    await Inventory.create(inventoryData, { transaction: t });
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

    createFlavorProfile = async (params) => {
        try {
            const {
                name,
                description,
                image
            } = params;

            const data = {
                name,
                description,
                filename: image.filename,
                path: `/img/icons/${image.filename}`
            };

            const res = await FlavorProfile.create(data);

            return res;
        } catch (err) {
            console.log('CREATE Flavor Profile Error: ', err);
            throw Error('There was an error creating the flavor profile');
        }
    }
}