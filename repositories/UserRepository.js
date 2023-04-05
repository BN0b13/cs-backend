import UserService from '../services/UserService.js';
import User from '../models/User.js';

const userService = new UserService();

class UserRepository {
    async create(params) {
        console.log('Create User Hit: ', params);
        const {
            username, 
            password
        } = params;

        const userExists = await this.getByUsername(username);

        console.log('Does user exist?', userExists);

        if(userExists.length > 0) {
            throw Error('Username already exists');
        }

        const hashedPassword = await userService.hashPassword(password);

        try {
            const options = { 
                ...params, 
                password: hashedPassword,
                emailVerified: true,
                roleId: 1
            };
            console.log('Options: ', options);
            const userCreate = await User.create(options);
            console.log('User Create res: ', userCreate);
            return userCreate;
        } catch (err) {
            console.log(err);
            throw Error('There was an error creating the new user');
        }
    }

    async getByUsername(username) {
        return await User.findAll({
            where: {
                username
            }
        });
    }

    async getByPK(id) {
        return await User.findByPK(id);
    }

    async getUsers() {
        try {
            const getUsersReq = await User.findAndCountAll({});
            console.log('Get Users Success: ', getUsersReq);
            return getUsersReq;
        } catch (err) {
            console.log('Get Users Error: ', err);
        }
    }
}

export default UserRepository;