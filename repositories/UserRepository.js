import AuthManagement from '../services/AuthManagement.js';
import UserService from '../services/UserService.js';

import { Cart, Order, Role, User } from '../models/Associations.js';

const authManagement = new AuthManagement();
const userService = new UserService();

class UserRepository {
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

            const token = await authManagement.createToken({ id: getUser.id });

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

    async adminLogin({ email, password }) {
        try {
            const getUser = await this.getSingleUserByEmail(email);

            console.log('Admin Login GET user: ', );

            if(!getUser) {
                throw Error('Email does not exist');
            }

            if(getUser.roleId !== 1) {
                throw Error('Access Denied');
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

    async getUser(id) {
        const user = await User.findOne({
            where: {
                id
            },
            include: [
                { 
                    model: Cart
                },
                { 
                    model: Order
                }
            ]
        });

        const data = {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            billingAddress: user.billingAddress,
            shippingAddress: user.shippingAddress,
            subscriptions: user.subscriptions,
            emailVerified: user.emailVerified,
            favorites: user.favorites,
            subscriptions: user.subscriptions,
            themeId: user.themeId,
            themeInverted: user.themeInverted,
            cart: user.Cart,
            orders: user.Orders,
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
            const res = await User.findAndCountAll({
                include: [
                    { 
                        model: Cart
                    },
                    { 
                        model: Order
                    },
                    { 
                        model: Role
                    }
                ]
            });
            return res;
        } catch (err) {
            console.log('Get Users Error: ', err);
            throw Error('There was an error getting all users');
        }
    }

    async getUserById(id) {
        try {
            const res = await User.findAll(
                {
                    where: {
                        id:id
                    },
                    include: [
                        { 
                            model: Cart
                        },
                        { 
                            model: Order
                        },
                        { 
                            model: Role
                        }
                    ]
                }
            );
            return res;
        } catch (err) {
            console.log('Get Users Error: ', err);
            throw Error('There was an error getting all users');
        }
    }

    async getAdmin() {
        return await User.findAndCountAll({
            where: {
                roleId: 2
            },
            include: [
                { 
                    model: Cart
                },
                { 
                    model: Order
                },
                { 
                    model: Role
                }
            ]
        });
    }

    async getEmployees() {
        return await User.findAndCountAll({
            where: {
                roleId: 3
            },
            include: [
                { 
                    model: Cart
                },
                { 
                    model: Order
                },
                { 
                    model: Role
                }
            ]
        });
    }

    async getCustomers() {
        return await User.findAndCountAll({
            where: {
                roleId: 4
            },
            include: [
                { 
                    model: Cart
                },
                { 
                    model: Order
                },
                { 
                    model: Role
                }
            ]
        });
    }

    // UPDATE

    async updateUser(id, data) {
        try {
            const res = await User.update(
                data,
                {
                    where: {
                                id: id
                            }
                }
            );
            return res;
        } catch (err) {
            console.log('Update User Error: ', err);
            throw Error('There was an error updating the user');
        }
    }

    // DELETE

    async deleteUser(id) {
        try {
            const res = await User.destroy(
                {
                    where: {
                                id: id
                            }
                }
            );
            return res;
        } catch (err) {
            console.log('Delete User Error: ', err);
            throw Error('There was an error deleting the user');
        }
    }

    async deleteCustomer(id) {
        try {
            const res = await User.update(
                {
                    email: 'deleted'
                },
                {
                    where: {
                                id: id
                            }
                }
            );
            return res;
        } catch (err) {
            console.log('DELETE Customer Error: ', err);
            throw Error('There was an error deleting the customer');
        }
    }
}

export default UserRepository;