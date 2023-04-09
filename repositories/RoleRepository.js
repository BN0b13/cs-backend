import Role from '../models/Role.js';

class RoleRepository {


    // CREATE

    async create({ role }) {
        const params = {
            role
        };

        try {
            const res = await Role.create(params);
            return res;
        } catch (err) {
            console.log(err);
            throw Error('There was an error creating the role');
        }
    }

    // READ

    async getRoles() {
        try {
            const res = await Role.findAndCountAll({});
            return res;
        } catch (err) {
            console.log('Get Role Messages Error: ', err);
            throw Error('There was an error getting roles');
        }
    }
}

export default RoleRepository;