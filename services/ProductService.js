import fs from 'fs';
import { Op } from 'sequelize';
import { sequelize } from "../db.js";
import { compressImage } from '../tools/images.js';

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

    searchProducts = async (keyword, page, size) => {
        try {
            const getCount = await sequelize.query(`
            select *
            from  ${process.env.PG_SCHEMA_NAME}."Products" as "Product"
            where ("Product".name ilike '%${keyword}%' or "Product".description ilike '%${keyword}%' or "Product".details->>'mother' ilike '%${keyword}%' or "Product".details->>'father' ilike '%${keyword}%')
            `);

            const currentPage = page * size;
            const res = await sequelize.query(`
            select "Product"."id",
            "Product"."categoryId",
            "Product"."type",
            "Product"."name",
            "Product"."description",
            "Product"."details",
            "Product"."profile",
            "Product"."createdAt",
            "Product"."updatedAt",
            "Category"."id" as "Category.id",
            "Category"."name" as "Category.name",
            "Category"."description" as "Category.description",
            "Category"."type" as "Category.type",
            "Category"."thumbnailPath" as "Category.thumbnailPath",
            "Category"."thumbnailFilename" as "Category.thumbnailFilename",
            "Category"."backSplashPath" as "Category.backSplashPath",
            "Category"."backSplashFilename" as "Category.backSplashFilename",
            "Category"."details" as "Category.details",
            "Category"."status" as "Category.status",
            "Category"."createdAt" as "Category.createdAt",
            "Category"."updatedAt" as "Category.updatedAt",
            "Inventories"."id" as "Inventories.id",
            "Inventories"."productId" as "Inventories.productId",
            "Inventories"."type" as "Inventories.type",
            "Inventories"."quantity" as "Inventories.quantity",
            "Inventories"."price" as "Inventories.price",
            "Inventories"."size" as "Inventories.size",
            "Inventories"."sizeDescription" as "Inventories.sizeDescription",
            "Inventories"."sku" as "Inventories.sku",
            "Inventories"."address" as "Inventories.address",
            "Inventories"."bay" as "Inventories.bay",
            "Inventories"."createdAt" as "Inventories.createdAt",
            "Inventories"."updatedAt" as "Inventories.updatedAt",
            "ProductImages"."id" as "ProductImages.id",
            "ProductImages"."productId" as "ProductImages.productId",
            "ProductImages"."caption" as "ProductImages.caption",
            "ProductImages"."filename" as "ProductImages.filename",
            "ProductImages"."path" as "ProductImages.path",
            "ProductImages"."position" as "ProductImages.position",
            "ProductImages"."createdAt" as "ProductImages.createdAt",
            "ProductImages"."updatedAt" as "ProductImages.updatedAt"
            from  ${process.env.PG_SCHEMA_NAME}."Products" as "Product"
            inner join ${process.env.PG_SCHEMA_NAME}."Categories" as "Category" on
                "Product"."categoryId" = "Category"."id"
            inner join ${process.env.PG_SCHEMA_NAME}."Inventories" as "Inventories" on
                "Product"."id" = "Inventories"."productId"
            left outer join ${process.env.PG_SCHEMA_NAME}."ProductImages" as "ProductImages" on
                "Product"."id" = "ProductImages"."productId"
            where ("Product".name ilike '%${keyword}%' or "Product".description ilike '%${keyword}%' or "Product".details->>'mother' ilike '%${keyword}%' or "Product".details->>'father' ilike '%${keyword}%')
            LIMIT ${size}
            OFFSET ${currentPage}
            `);

            return {
                count: getCount[1].rowCount,
                rows: res[0]
            };
        } catch (err) {
            console.log('Search Products Error: ', err);
            throw Error('There was an error searching Products');
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
            address = null,
            bay = '',
            image = null
        } = params;

        const productProfile = [];

        for(let id of profile) {
            const reg = /^\d+$/;

            if(reg.test(id)) {
                productProfile.push(parseInt(id));
            }
        }


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

                if(image !== null) {
                    const productImageData = {
                        productId,
                        caption: name,
                        filename: image.filename,
                        path: `/img/products/${image.filename}`,
                        position: 1
                    }
    
                    await ProductImage.create(productImageData, { transaction: t });

                    const { path, filename } = image;
                    // await compressImage(path, `products/${filename}`);
                }

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

            const { path, filename } = image;
            // await compressImage(path, `products/${filename}`);

            return res;
        } catch (err) {
            console.log('CREATE Product Image Error: ', err);
            throw Error('There was an error creating the product image');
        }
    }

    updateProduct = async (id, data) => {
        try {
            const res = await Product.update(
                data,
                {
                    where: {
                        id: id
                    }
                }
            );

            return res;
        } catch (err) {
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

                    fs.stat(`./public${productImage.path}-mobile.webp`, function (err) {
                        if (err) {
                            return console.error(err);
                        }
                    
                        fs.unlink(`./public${productImage.path}-mobile.webp`,function(err){
                            if(err) return console.log(err);
                            console.log('file deleted successfully');
                        });
                    });

                    fs.stat(`./public${productImage.path}-desktop.webp`, function (err) {
                        if (err) {
                            return console.error(err);
                        }
                    
                        fs.unlink(`./public${productImage.path}-desktop.webp`,function(err){
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

    deleteProductImageById = async (id) => {
        try {

            const productImage = await ProductImage.findOne({
                where: {
                    id
                }
            });
            
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

            fs.stat(`./public${productImage.path}-mobile.webp`, function (err) {
                if (err) {
                    return console.error(err);
                }
            
                fs.unlink(`./public${productImage.path}-mobile.webp`,function(err){
                    if(err) return console.log(err);
                    console.log('file deleted successfully');
                });
            });

            fs.stat(`./public${productImage.path}-desktop.webp`, function (err) {
                if (err) {
                    return console.error(err);
                }
            
                fs.unlink(`./public${productImage.path}-desktop.webp`,function(err){
                    if(err) return console.log(err);
                    console.log('file deleted successfully');
                });
            });

            await ProductImage.destroy(
                {
                    where: {
                        id: id
                    }
                }
            );


            return {
                msg: "Product Image Deleted Successfully",
                status: 200
            }
        } catch (err) {
            console.log('DELETE Product Error: ', err);
            throw Error('There was an error deleting the product');
        }
    }
}