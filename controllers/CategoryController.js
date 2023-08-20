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
        
        const data = await categoryRepository.create(params);
        
        res.send(data);
        } catch (err) {
            res.send({
                err,
                message: 'There was an error creating category'
            });
        }
    }

    // READ
    
    async getCategories(req, res) {
        const data = await categoryRepository.getCategories();
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
    
    async getCategoriesWithoutAssociations(req, res) {
        const data = await categoryRepository.getCategoriesWithoutAssociations();
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