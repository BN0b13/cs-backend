import fs from 'fs';
import { Op } from 'sequelize';
import { sequelize } from "../db.js";

import {
    Category,
    ProductProfile, 
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

    getProductProfiles = async () => {
        try {
            const res = await ProductProfile.findAndCountAll(); 
            return res;
        } catch (err) {
            console.log('GET Product Profiles Error: ', err);
            throw Error('There was an error getting Product Profiles');
        }
    }

    getProductProfilesByIds = async (ids) => {
        try {
            const res = await ProductProfile.findAndCountAll(
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
            console.log('GET Product Profiles Error: ', err);
            throw Error('There was an error getting Product Profiles');
        }
    }

    // CREATE

    createProductAndInventory = async (params) => {
        const {
            categoryId,
            type,
            name,
            description,
            details,
            profile,
            inventoryType,
            size,
            sizeDescription,
            price,
            quantity,
            address = '',
            bay = '',
            image
        } = params;

        const productProfile = [];

        for(let id of profile) {
            const reg = /^\d+$/;

            if(reg.test(id)) {
                productProfile.push(parseInt(id));
            }
        }

        const t = await sequelize.transaction();

        try {
            const res = await sequelize.transaction(async (t) => {
                const productData = {
                    categoryId,
                    type,
                    name,
                    description,
                    details,
                    profile: productProfile
                };

                const result = await Product.create(productData, { transaction: t });
                const productId = result.id;

                const productImageData = {
                    productId,
                    caption: name,
                    filename: image.filename,
                    path: `/img/products/${image.filename}`,
                    position: 1
                }

                await ProductImage.create(productImageData, { transaction: t });

                const inventoryData = {
                    productId,
                    type: inventoryType,
                    quantity,
                    price,
                    size,
                    sizeDescription,
                    sku: `${ productId }.1`,
                    address,
                    bay
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

    createProductProfile = async (params) => {
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

            const res = await ProductProfile.create(data);

            return res;
        } catch (err) {
            console.log('CREATE Product Profile Error: ', err);
            throw Error('There was an error creating the product profile');
        }
    }

    // UPDATE

    addProductImage = async (params) => {
        try {
            const {
                id,
                caption,
                image
            } = params;

            const productImageData = {
                productId: id,
                caption,
                filename: image.filename,
                path: `/img/products/${image.filename}`,
                position: 1
            }

            const res = await ProductImage.create(productImageData);

            return res;
        } catch (err) {
            console.log('CREATE Product Image Error: ', err);
            throw Error('There was an error creating the product image');
        }
    }

    updateProduct = async (id, data, productInventoryId, productInventoryData, productImageId, productImageData) => {
        const t = await sequelize.transaction();
        try {
            const res = await sequelize.transaction(async (t) => {
                let updateRes = {};

                if(data !== undefined) {
                    const updateProduct = await Product.update(
                        data,
                        {
                            where: {
                                id: id
                            }
                        },
                        { transaction: t }
                    );

                    updateRes.updateProduct = { updateProduct };
                }

                if(productInventoryData !== undefined) {
                    const updateInventory = await Inventory.update(
                        productInventoryData,
                        {
                            where: {
                                id: productInventoryId
                            }
                        },
                        { transaction: t }
                    );

                    updateRes.updateInventory = { updateInventory };
                }

                if(productImageData !== undefined) {
                    const updateProductImage = await ProductImage.update(
                        productImageData,
                        {
                            where: {
                                id: productImageId
                            }
                        },
                        { transaction: t }
                    );

                    updateRes.updateProductImage = updateProductImage;
                }
                return updateRes;
            });
            
            return res;
        } catch (err) {
            await t.rollback();
            console.log('Update User Error: ', err);
            throw Error('There was an error updating the user');
        }
    }

    deleteProduct = async (id) => {
        try {
            const orderStatus = await sequelize.query(`select *
            from ${process.env.PG_SCHEMA_NAME}."Orders"
            where products @> '[{"productId": ${id}}]'::jsonb`);

            if(orderStatus[0].length !== 0) {
                return {
                    status: 403,
                    message: 'Unable to delete Product. Product is associated with Order(s).'
                }
            }

            const getProduct = await Product.findAll(
                {
                    where: {
                        id: id
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
                }
            );

            const inventoryId = getProduct[0].Inventories[0].id;
            const productImages = getProduct[0].ProductImages;

            // Delete inventory

            const deleteInventoryRes = await Inventory.destroy(
                {
                    where: {
                                id: inventoryId
                            }
                }
            );

            let deleteProductImagesRes = [];

            
            if(productImages.length > 0) {
                for(let productImage of productImages) {

                    // Delete Product Image(s) from db
                    const deleteProductImageRes = await ProductImage.destroy(
                        {
                            where: {
                                id: productImage.id
                            }
                        }
                    );
                    
                    // Delete local image
                    fs.stat(`./public${productImage.path}`, function (err) {
                        if (err) {
                            return console.error(err);
                        }
                    
                        fs.unlink(`./public${productImage.path}`,function(err){
                            if(err) return console.log(err);
                            console.log('file deleted successfully');
                        });
                    });
                    
                    deleteProductImagesRes.push({
                        productImageId: productImage.id,
                        deleteProductImageRes
                    })
                }
            }

            const deleteProductRes = await Product.destroy(
                {
                    where: {
                        id: id
                    }
                }
            );

            return {
                deleteProductRes,
                deleteInventoryRes,
                deleteProductImagesRes
            };
        } catch (err) {
            console.log('DELETE Product Error: ', err);
            throw Error('There was an error deleting the product');
        }
    }
}