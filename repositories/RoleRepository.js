import Role from '../models/Role.js';

class RoleRepository {


    // CREATE

    async create({ role }) {
        const params = {
            role
        };

        try {
            const createRole = await Role.create(params);
            console.log('User Create res: ', createRole);
            return createRole;
        } catch (err) {
            console.log(err);
            throw Error('There was an error creating the new role');
        }
    }

    // READ

    async getRoles() {
        try {
            const getRolesRes = await Role.findAndCountAll({});
            console.log('Get Role Messages Success: ', getRolesRes);
            return getRolesRes;
        } catch (err) {
            console.log('Get Role Messages Error: ', err);
            throw Error('There was an error getting all roles');
        }
    }
}

export default RoleRepository;