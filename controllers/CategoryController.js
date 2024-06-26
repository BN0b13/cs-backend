import CategoryRepository from '../repositories/CategoryRepository.js';
import CategoryService from '../services/CategoryService.js';

const categoryRepository = new CategoryRepository();
const categoryService = new CategoryService();

class CategoryController {

    // CREATE

    async create(req, res) {
        try {
        const {
            name,
            description,
            type,
            motherProductId,
            fatherProductId
        } = req.body;

        const params = {
            name,
            description,
            type,
            details: {
                motherProductId,
                fatherProductId
            },
            image: req.files[0] ? req.files[0] : ''
        };
        
        const data = await categoryService.create(params);
        
        res.send(data);
        } catch (err) {
            res.send({
                err,
                message: 'There was an error creating category'
            });
        }
    }

    async addThumbnail(req, res) {
        try {
            const {
                id
            } = req.body;

            const params = {
                id,
                image: req.files[0]
            };
            
            const data = await categoryService.addCategoryThumbnail(params);

            res.send({
                status: 201,
                message: 'Category Thumbnail Added',
                result: data
            });
        } catch (err) {
            console.log('Update Category Add Thumbnail Error: ', err);
            throw Error('There was an error updating the Category to add thumbnail');
        }
    }

    // READ
    
    async getCategories(req, res) {
        const { 
            search = null, 
            page = 0, 
            size = 10,
            sortKey = 'createdAt',
            sortDirection = 'ASC'
        } = req.query;

        const params = {
            sortKey,
            sortDirection,
            page,
            size
        };

        if(search === null) {
            const data = await categoryRepository.getCategories(params);
            return res.send(data);
        }

        params.search = search;

        const data = await categoryService.searchCategories(params);
        res.send(data);
    }

    async getCategoryByName(req, res) {
        const { name } = req.params;
        const data = await categoryService.getCategoryByName(name);
        res.send(data);
    }

    async getCategoriesByType(req, res) {
        const { type } = req.params;
        const data = await categoryService.getCategoriesByType(type);
        res.send(data);
    }
    
    async getCategoryById(req, res) {
        const { id } = req.params;
        const data = await categoryRepository.getCategoryById(id);
        res.send(data);
    }

    // UPDATE

    async updateCategoryById(req, res) {
        const {
            id,
            name = null,
            description = null,
            thumbnailPath = null,
            thumbnailFilename = null,
            backSplashPath = null,
            backSplashFilename = null,
            details = null,
            status = null,
        } = req.body;

        const params = {
            name,
            description,
            thumbnailPath,
            thumbnailFilename,
            backSplashPath,
            backSplashFilename,
            details,
            status
        };

        Object.keys(params).forEach(param => params[param] == null && delete params[param]);

        const data = await categoryRepository.updateCategory(id, params);
        res.send(data);
    }

    // DELETE

    async deleteCategoryById(req, res) {
        const {
            id
        } = req.body;

        const data = await categoryService.deleteCategory(id);
        res.send(data);
    }

}

export default CategoryController;