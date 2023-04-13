import CategoryRepository from '../repositories/CategoryRepository.js';

const categoryRepository = new CategoryRepository();

class RoleController {

    // CREATE

    async create(req, res) {
        try {
        const {
            name,
            description
        } = req.body;

        const params = {
            name,
            description
        };

        const data = await categoryRepository.create(params);

        res.send(data);
        } catch (err) {
            res.send({
                err,
                message: 'There was an error creating role'
            });
        }
    }

    // READ
    
    async getCategories(req, res) {
        const data = await categoryRepository.getCategories();
        res.send(data);
    }

}

export default RoleController;