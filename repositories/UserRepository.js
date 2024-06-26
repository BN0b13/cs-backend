import { Sequelize, Op } from 'sequelize';
import dayjs from 'dayjs';

import AuthManagement from '../services/AuthManagement.js';
import UserService from '../services/UserService.js';

import { Cart, Company, Giveaway, Order, Role, User } from '../models/Associations.js';

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

            if(!getUser) {
                throw Error('Email does not exist');
            }

            if(getUser.roleId === 4) {
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
                },
                {
                    model: Role
                }
            ]
        });

        const data = {
            email: user.email,
            username: user.username,
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
            credit: user.credit
        }

        return data;
    }

    async getUserByPasswordToken(passwordToken) {
        return await User.findAll({
            where: {
                passwordToken
            }
        });
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

    async getUsers({ sortKey = 'createdAt', sortDirection = 'ASC', size = 10, page = 0 }) {
        try {
            const res = await User.findAndCountAll({
                include: [
                    { 
                        model: Role
                    }
                ],
                order: [
                    [sortKey, sortDirection],
                ],
                limit: size,
                offset: page,
            });
            return res;
        } catch (err) {
            console.log('Get Users Error: ', err);
            throw Error('There was an error getting all users');
        }
    }

    async getUserById(id) {
        try {
            return await User.findOne(
                {
                    where: {
                        id
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

    async getCustomersByDateRange({ start, end }) {
        try {
            const startDate = dayjs.unix(start);
            const endDate = dayjs.unix(end);
            
            const res = await User.findAndCountAll({
                where: {
                    createdAt: {
                       [Op.between]: [startDate.$d, endDate.$d],
                    },
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
            return res;
        } catch (err) {
            console.log('Get Customers by date range Error: ', err);
            throw Error('There was an error getting customers by date range');
        }
    }

    async getUsersByPage({ page = 0, size = 10, sortColumn = 'createdAt', sortDirection = 'ASC' }) {
        try {
            const currentPage = page * size;
            const res = await User.findAndCountAll({
                limit: size,
                offset: currentPage,
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
                ],
                order: [
                    [sortColumn, sortDirection],
                ]
            });

            return res;
        } catch (err) {
            console.log('GET Users By Page Error: ', err);
            throw Error('There was an error getting users by page');
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
            if(id === 1) {
                return {
                    error: 'Cannot DELETE Super Admin user'
                }
            }
            const res = await User.update(
                {
                    email: 'deleted',
                    username: ''
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