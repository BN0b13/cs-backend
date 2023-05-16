import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sequelize } from "../db.js";

import AuthManagement from '../services/AuthManagement.js';
import EmailService from './EmailService.js';

import { Cart, User } from '../models/Associations.js';

const authManagement = new AuthManagement();
const emailService = new EmailService();

export default class UserService {
    hashPassword = async (password) => {
        const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPTSALT));
        return await bcrypt.hash(password, salt);
    }

    verifyPassword = async (data, encrypted) => {
        return await bcrypt.compare(data, encrypted);
    }

    verifyEmail = async ({ email }) => {
        console.log('Verify Email hit! ', email);
        const token = jwt.sign(email, process.env.JWT_SECRET);

        await this.updateUserEmailToken(token, email);

        await emailService.verifyEmail({ email, token });

        return{
            status: 200
        };
    }

    completeEmailVerification = async ({ emailToken }) => {
        const getUser = await this.getByEmailToken(emailToken);

        await this.updateUserEmailVerified(getUser[0].id);

        return{
            status: 201
        };
    }

    initiatePasswordReset = async ({ email }) => {
        const user = await this.getByEmail(email);

        if(user.length === 0) {
            return {
                status: 200
            };
        }

        const token = jwt.sign(email, process.env.JWT_SECRET);

        await this.updateUserPasswordToken(token, email);

        await emailService.passwordReset({ email, token });

        return{
            status: 200
        };
    }

    completePasswordReset = async ({ passwordToken, password }) => {
        const hashedPassword = await this.hashPassword(password);
        
        return await this.updateUserPassword(passwordToken, hashedPassword);
    }

    getByEmail = async (email) => {
        return await User.findAll({
            where: {
                email
            }
        });
    }

    getByEmailToken = async (emailToken) => {
        return await User.findAll({
            where: {
                emailToken
            }
        });
    }

    createAdminTransaction = async (params) => {
        const {
            email, 
            password
        } = params;
    
        const emailExists = await this.getByEmail(email);
        
        if(emailExists.length > 0) {
            throw Error('Email already exists');
        }
        
        const hashedPassword = await this.hashPassword(password);
        
        const t = await sequelize.transaction();

        try {
            const res = await sequelize.transaction(async (t) => {
                const data = { 
                    ...params, 
                    password: hashedPassword,
                    emailVerified: false,
                    roleId: 2,
                    emailToken: null,
                    passwordToken: null,
                    credit: 0
                };
    
                const result = await User.create(data, { transaction: t });
                const userId = result.id;
                
                await Cart.create({ userId }, { transaction: t });
    
                return result;
            });
            
            return res;
        } catch (err) {
            await t.rollback();
            console.log('Customer Create Error: ', err);
            throw Error('There was an error creating the customer');
        }
    }
    
    createEmployeeTransaction = async (params) => {
        const {
            email, 
            password
        } = params;
    
        const emailExists = await this.getByEmail(email);
        
        if(emailExists.length > 0) {
            throw Error('Email already exists');
        }
        
        const hashedPassword = await this.hashPassword(password);

        const t = await sequelize.transaction();
        
        try {
            const res = await sequelize.transaction(async (t) => {
                const data = { 
                    ...params, 
                    password: hashedPassword,
                    emailVerified: false,
                    roleId: 3,
                    emailToken: null,
                    passwordToken: null,
                    credit: 0
                };
    
                const result = await User.create(data, { transaction: t });
                const userId = result.id;

                await Cart.create({ userId }, { transaction: t });
    
                return result;
            });
            
            return res;
        } catch (err) {
            await t.rollback();
            console.log('Customer Create Error: ', err);
            throw Error('There was an error creating the customer');
        }
    }
    
    createCustomer = async (params) => {
        const {
            email, 
            password
        } = params;
    
        const emailExists = await this.getByEmail(email);
        
        if(emailExists.length > 0) {
            throw Error('Email already exists');
        }
        
        const hashedPassword = await this.hashPassword(password);
        
        const t = await sequelize.transaction();

        try {
            const res = await sequelize.transaction(async (t) => {
                const data = { 
                    ...params, 
                    password: hashedPassword,
                    emailVerified: false,
                    roleId: 4,
                    emailToken: null,
                    passwordToken: null,
                    credit: 0
                };
    
                const result = await User.create(data, { transaction: t });
                const cartData = {
                    userId: result.id,
                    products: []
                };
    
                await Cart.create(cartData, { transaction: t });

                
                return result;
            });

            await this.verifyEmail({ email });

            const token = await authManagement.createToken({
                id: res.id,
                roleId: res.roleId,
                email: res.email
            });

            return {
                status: 201,
                token,
                email: res.email
            };
        } catch (err) {
            await t.rollback();
            console.log('Customer Create Error: ', err);
            throw Error('There was an error creating the customer');
        }
    }

    async updateUserPasswordToken(token, email) {
        return await User.update(
            { 
                passwordToken: token
            },
            {
                where: {
                    email
                }
            }
        );
    }

    async updateUserEmailToken(emailToken, email) {
        return await User.update(
            { 
                emailToken
            },
            {
                where: {
                    email
                }
            }
        );
    }

    async updateUserEmailVerified(id) {
        return await User.update(
            { 
                emailVerified: true
            },
            {
                where: {
                    id
                }
            }
        );
    }

    async updateUserPassword(passwordToken, password) {
        return await User.update(
            { 
                password
            },
            {
                where: {
                    passwordToken
                }
            }
        );
    }
}