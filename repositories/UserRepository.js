import AuthManagement from '../services/AuthManagement.js';
import UserService from '../services/UserService.js';
import User from '../models/User.js';

const authManagement = new AuthManagement();
const userService = new UserService();

class UserRepository {


    // CREATE

    async create(params) {
        const {
            username, 
            password
        } = params;

        const userExists = await this.getByUsername(username);

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

            const userCreate = await User.create(options);

            const token = await authManagement.createToken({
                roleId: userCreate.roleId,
                username: userCreate.username
            });

            return {
                token,
                username: userCreate.username
            };
        } catch (err) {
            console.log('Create New User Error: ', err);
            throw Error('There was an error creating the new user');
        }
    }

    // READ

    async login({ username, password }) {
        try {
            const getUsername = await this.getByUsername(username);

            if(!getUsername) {
                throw Error('Username does not exist');
            }

            const verifyPassword = await userService.verifyPassword(password, getUsername.password);

            if(!verifyPassword) {
                throw Error('Password was not correct');
            }

            const token = await authManagement.createToken({
                roleId: getUsername.roleId,
                username: getUsername.username
            });

            return {
                token,
                username: getUsername.username
            };
        } catch (err) {
            console.log('Login error: ', err);
            throw Error('There was an error logging in');
        }
    }

    async getByUsername(username) {
        return await User.findOne({
            where: {
                username
            }
        });
    }

    async getByPK(id) {
        return await User.findByPk(id);
    }

    async getUsers() {
        try {
            const getUsersReq = await User.findAndCountAll({});
            return getUsersReq;
        } catch (err) {
            console.log('Get Users Error: ', err);
            throw Error('There was an error getting all users');
        }
    }

    // UPDATE

    async updateUser(id, data) {
        try {
            const updateUserRes = await User.update(
                data,
                {
                    where: {
                                id: id
                            }
                }
            );
            return updateUserRes;
        } catch (err) {
            console.log('Update User Error: ', err);
            throw Error('There was an error updating the user');
        }
    }

    // DELETE

    async deleteUser(id) {
        try {
            const deletedUsers = await User.destroy(
                {
                    where: {
                                id: id
                            }
                }
            );
            return {
                deletedUsers
            };
        } catch (err) {
            console.log('Update User Error: ', err);
            throw Error('There was an error deleting the user');
        }
    }
}

export default UserRepository;