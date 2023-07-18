import { Category, Product } from '../models/Associations.js';

class CategoryRepository {

    // CREATE

    async create({ name, description, type }) {
        const params = {
            name,
            description,
            type,
            image: [],
            status: true
        };

        try {
            const res = await Category.create(params);
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
                        model: Product,
                        required: true
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