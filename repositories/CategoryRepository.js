import { Category, Product } from '../models/Associations.js';

class CategoryRepository {

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

            const productIds = res.rows

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
            console.log('Get Categories Without Associations Error: ', err);
            throw Error('There was an error getting categories with out associations');
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

    async getCategoriesByPage(page, size) {
        try {
            const currentPage = page * size;
            const res = await Category.findAndCountAll({
                limit: size,
                offset: currentPage,
                include: [
                    {
                        model: Product
                    }
                ]
            });

            return res;
        } catch (err) {
            console.log('GET Categories By Page Error: ', err);
            throw Error('There was an error getting categories by page');
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