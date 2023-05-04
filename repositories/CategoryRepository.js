import { Category, Product } from '../models/Associations.js';

class CategoryRepository {


    // CREATE

    async create({ name, description }) {
        const params = {
            name,
            description,
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
}

export default CategoryRepository;