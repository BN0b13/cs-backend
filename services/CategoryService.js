import fs from 'fs';
import { compressImage } from '../tools/images.js';

import { Category, Product, ProductImage } from '../models/Associations.js';

export default class CategoryService {

    categoryTypes = {
        CLOTHING: 'clothing',
        SEEDS: 'seeds'
    }

    // READ

    async getCategoriesByType(type) {
        const res = await Category.findAndCountAll(
            {
                where: {
                    type
                }
            }
        );

        return res;
    }

    async getCategoryByName(name) {
        try {
            const res = await Category.findAndCountAll(
                {
                    where: {
                        name
                    },
                    include: [
                        {
                            model: Product,
                            include: [
                                {
                                    model: ProductImage
                                }
                            ]
                        },
                    ],
                }
            );
    
            return res;
        } catch (err) {
            console.log('Get Category by name Error: ', err);
            throw Error('There was an error getting category by name');
        }
    }

    // CREATE

    async create(params) {
        const { 
            name, 
            description, 
            type, 
            image = null,
            details
        } = params;

        const data = {
            name,
            description,
            type,
            backSplashFilename: '',
            backSplashPath: '',
            thumbnailFilename: image ? image.filename : '',
            thumbnailPath: image ? `/img/categories/${image.filename}` : '',
            details,
            status: false
        };

        try {
            const res = await Category.create(data);

            if(image) {
                const { path, filename } = image;
                await compressImage(path, `categories/${filename}`);
            }
            
            return res;
        } catch (err) {
            console.log(err);
            throw Error('There was an error creating the category');
        }
    }

    // UPDATE

    addCategoryThumbnail = async (params) => {
        try {
            const {
                id,
                image
            } = params;

            console.log('Add Category Image hit: ', id);

            const data = {
                thumbnailFilename: image.filename,
                thumbnailPath: `/img/categories/${image.filename}`
            };

            const res = await Category.update(
                data,
                {
                    where: {
                        id: id
                    }
                }
            );

            return res;
        } catch (err) {
            console.log('UPDATE Category Add Thumbnail Error: ', err);
            throw Error('There was an error updating the category adding thumbnail');
        }
    }
    
    // DELETE

    async deleteCategory(id) {
        try {
            const getCategoryProducts = await Product.findAndCountAll(
                {
                    where: {
                        categoryId: id
                    }
                }
            );

            if(getCategoryProducts.rows.length > 0) {
                return {
                    status: 403,
                    message: 'Unable to delete Category. Category has associated products.',
                    associatedProducts: getCategoryProducts.rows
                }
            }

            const getCategory = await Category.findAndCountAll(
                {
                    where: {
                        id: id
                    }
                }
            );

            const res = await Category.destroy(
                {
                    where: {
                                id: id
                            }
                }
            );

            console.log('getCategory res: ', getCategory);

            fs.stat(`./public${getCategory.rows[0].thumbnailPath}`, function (err) {
                if (err) {
                    return console.error(err);
                }
             
                fs.unlink(`./public${getCategory.rows[0].thumbnailPath}`,function(err){
                     if(err) return console.log(err);
                     console.log('file deleted successfully');
                });
             });


             fs.stat(`./public${getCategory.rows[0].thumbnailPath}-mobile.webp`, function (err) {
                if (err) {
                    return console.error(err);
                }
            
                fs.unlink(`./public${getCategory.rows[0].thumbnailPath}-mobile.webp`,function(err){
                    if(err) return console.log(err);
                    console.log('file deleted successfully');
                });
            });

            fs.stat(`./public${getCategory.rows[0].thumbnailPath}-desktop.webp`, function (err) {
                if (err) {
                    return console.error(err);
                }
            
                fs.unlink(`./public${getCategory.rows[0].thumbnailPath}-desktop.webp`,function(err){
                    if(err) return console.log(err);
                    console.log('file deleted successfully');
                });
            });
            
            return {
                status: 200,
                message: `Deleted ${res} category.`,
                categoryName: getCategory.rows[0].name,
                categoryDescription: getCategory.rows[0].description
            };
        } catch (err) {
            console.log('Update Category Error: ', err);
            throw Error('There was an error deleting the category');
        }
    }
}