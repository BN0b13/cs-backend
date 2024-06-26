import { Category, Product } from '../models/Associations.js';

class CategoryRepository {

    // READ

    async getCategories({ sortKey = 'createdAt', sortDirection = 'ASC', size = 10, page = 0 }) {
        try {
            const res = await Category.findAndCountAll({
                order: [
                    [sortKey, sortDirection],
                ],
                limit: size,
                offset: page,
            });
            return res;
        } catch (err) {
            console.log('Get Categories Error: ', err);
            throw Error('There was an error getting all categories');
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
            console.log('Get Category by id Messages Error: ', err);
            throw Error('There was an error getting category by id');
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