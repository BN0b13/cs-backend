import RoleRepository from '../repositories/RoleRepository.js';

const roleRepository = new RoleRepository();

class RoleController {

    // CREATE

    async create(req, res) {
        try {
        const {
            role
        } = req.body;

        const params = {
            role
        };

        const data = await roleRepository.create(params);

        res.send({
            message: 'Role Creation Result',
            result: data
        });
        } catch (err) {
            res.send({
                err,
                message: 'There was an error creating role'
            });
        }
    }

    // READ
    
    async getRoles(req, res) {
        const data = await roleRepository.getRoles();
        res.send(data);
    }

}

export default RoleController;