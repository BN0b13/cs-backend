import { Category, Product } from '../models/Associations.js';

class CategoryRepository {

    // CREATE

    async create(params) {
        const { 
            name, 
            description, 
            type, 
            image
        } = params;

        const data = {
            name,
            description,
            type,
            backSplashFilename: '',
            backSplashPath: '',
            thumbnailFilename: image.filename,
            thumbnailPath: `/img/categories/${image.filename}`,
            status: true
        };

        try {
            const res = await Category.create(data);
            
            return res;
        } catch (err) {
            console.log(err);
            throw Error('There was an error creating the category');
        }
    }

    // READ

    async getCategories() {
        try {
            const res = await Category.findAndCountAll({
                include: [
                    {
                        model: Product
                    }
                ]
            });
            return res;
        } catch (err) {
            console.log('Get Categories Messages Error: ', err);
            throw Error('There was an error getting categories');
        }
    }

    async getCategoriesWithoutAssociations() {
        try {
            const res = await Category.findAndCountAll();
            return res;
        } catch (err) {
            console.log('Get Categories Messages Error: ', err);
            throw Error('There was an error getting categories');
        }
    }

    async getCategoryById(id) {
        try {
            const res = await Category.findAndCountAll({
                where: {
                    id
                },
                include: [
                    {
                        model: Product
                    }
                ]
            });
            return res;
        } catch (err) {
            console.log('Get Categories Messages Error: ', err);
            throw Error('There was an error getting categories');
        }
    }

    // UPDATE

    async updateCategory(id, data) {
        try {
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
            console.log('Update Category Error: ', err);
            throw Error('There was an error updating the category');
        }
    }
}

export default CategoryRepository;