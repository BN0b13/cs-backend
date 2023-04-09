import AuthManagement from '../services/AuthManagement.js';
import UserService from '../services/UserService.js';
import User from '../models/User.js';

const authManagement = new AuthManagement();
const userService = new UserService();

class UserRepository {


    // CREATE

    async create(params) {
        const {
            email, 
            password
        } = params;

        const emailExists = await this.getByEmail(email);

        if(emailExists.length > 0) {
            throw Error('Email already exists');
        }

        const hashedPassword = await userService.hashPassword(password);

        try {
            const options = { 
                ...params, 
                password: hashedPassword,
                emailVerified: false,
                roleId: 1
            };

            const userCreate = await User.create(options);

            const token = await authManagement.createToken({
                roleId: userCreate.roleId,
                email: userCreate.email
            });

            return {
                status: 201,
                token,
                email: userCreate.email
            };
        } catch (err) {
            console.log('Create New User Error: ', err);
            throw Error('There was an error creating the new user');
        }
    }

    // READ

    async login({ email, password }) {
        try {
            const getUser = await this.getSingleUserByEmail(email);

            if(!getUser) {
                throw Error('Email does not exist');
            }

            const verifyPassword = await userService.verifyPassword(password, getUser.password);

            if(!verifyPassword) {
                throw Error('Password was not correct');
            }

            const token = await authManagement.createToken({
                id: getUser.id,
                roleId: getUser.roleId,
                email: getUser.email
            });

            return {
                status: 200,
                token,
                email: getUser.email
            };
        } catch (err) {
            console.log('Login error: ', err);
            throw Error('There was an error logging in');
        }
    }

    async getAccountInformation(id) {
        const user = await User.findOne({
            where: {
                id
            }
        });

        const data = {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            address: user.address,
            city: user.city,
            state: user.state,
            zipCode: user.zipCode,
            emailList: user.emailList,
            emailVerified: user.emailVerified,
        }

        return data;
    }

    async getByEmail(email) {
        return await User.findAll({
            where: {
                email
            }
        });
    }

    async getSingleUserByEmail(email) {
        return await User.findOne({
            where: {
                email
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