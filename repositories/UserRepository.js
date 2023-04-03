import UserService from '../services/UserService.js';
import User from '../models/user.js';

const userService = new UserService();

class UserRepository {
    async create(params) {
        const {
            username, 
            password
        } = params;

        const userExists = await this.getByUsername(username);

        console.log('Does user exist?', userExists);

        if(userExists.length > 0) {
            throw Error('Username already exists');
        }

        const hashedPassword = userService.hashPassword(password);

        try {
            return await User.create({ ...params, password: hashedPassword });
        } catch (err) {
            throw Error('There was an error creating the new user');
        }
    }

    async getByUsername(username) {
        return await User.findAll({
            Where: {
                username
            }
        });
    }

    async getByPK(id) {
        return await User.findByPK(id);
    }
}

export default UserRepository;