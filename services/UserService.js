import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sequelize } from "../db.js";
import { Op } from 'sequelize';

import AuthManagement from '../services/AuthManagement.js';
import EmailService from './EmailService.js';

import { Cart, Company, User } from '../models/Associations.js';

import UserTools from '../tools/user.js';

const authManagement = new AuthManagement();
const emailService = new EmailService();
const userTools = new UserTools();

export default class UserService {
    // READ

    searchUsers = async ({ search, page, size, sortKey, sortDirection }) => {
        try {
            console.log('Search Users hit');
            const getCount = await sequelize.query(`
            select *
            from  ${process.env.PG_SCHEMA_NAME}."Users" as "User"
            where ("User".email ilike '%${search}%' or "User".username ilike '%${search}%' or "User"."firstName" ilike '%${search}%' or "User"."lastName" ilike '%${search}%')
            `);

            const currentPage = page * size;
            const res = await sequelize.query(`
            SELECT *
            FROM  ${process.env.PG_SCHEMA_NAME}."Users" AS "User"
            WHERE ("User".email ilike '%${search}%' OR "User".username ilike '%${search}%' OR "User"."firstName" ilike '%${search}%' OR "User"."lastName" ilike '%${search}%')
            ORDER BY "User"."${sortKey}" ${sortDirection}
            LIMIT ${size}
            OFFSET ${currentPage}
            `);

            return {
                count: getCount[1].rowCount,
                rows: res[0]
            };
        } catch (err) {
            console.log('Search Users Error: ', err);
            throw Error('There was an error searching Users');
        }
    }

    hashPassword = async (password) => {
        const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPTSALT));
        return await bcrypt.hash(password, salt);
    }

    verifyPassword = async (data, encrypted) => {
        return await bcrypt.compare(data, encrypted);
    }

    checkIfUsernameExists = async (username, id = null) => {
        const res = await User.findOne({
            where: {
                username: {
                    [Op.iLike]: username
                }
                
            }
        });

        if(res) {
            if(res.id === id) {
                return false
            }
            return true;
        }
        return false;
    }

    createEmailToken = async (id, email, expiresIn = 3600) => {
        const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn });
        await this.updateUserEmailToken(token, email);

        return token;
    }

    sendEmailVerificationEmail = async ({ id }) => {
        const user = await User.findByPk(id);
        const token = await this.createEmailToken(id, user.email);

        await emailService.verifyEmail({ email: user.email, token });

        return {
            status: 200
        };
    }

    verifyUserResetPasswordToken = async (token) => {
        const res = await User.findAndCountAll(
            {
                where: {
                    passwordToken: token
                }
            }
        );

        if(res.count === 0) {
            return {
                status: 404
            }
        }

        const user = res.rows[0];
        const decoded = jwt.decode(user.passwordToken, process.env.JWT_SECRET);

        if(!decoded) {
            return {
                status: 404
            }
        }

        const currentUnix = Math.round(Date.now() / 1000);
        if(currentUnix > decoded.exp) {
            return {
                status: 403,
                expirationDate: decoded.exp
            };
        }
        return {
            status: 200,
            expirationDate: decoded.exp
        };
    }

    verifyEmailTokenIsValid = async ({ id }) => {
        const user = await User.findByPk(id);
        const decoded = jwt.decode(user.emailToken, process.env.JWT_SECRET);
        if(!decoded) {
            return {
                status: 404
            }
        }

        const currentUnix = Math.round(Date.now() / 1000);
        if(currentUnix > decoded.exp) {
            return {
                status: 403,
                expirationDate: decoded.exp
            };
        }
        return {
            status: 200,
            expirationDate: decoded.exp
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

        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: 300 });

        await this.updateUserPasswordToken(token, email);

        await emailService.passwordReset({ email, token });

        return{
            status: 200
        };
    }

    completePasswordReset = async ({ passwordToken, password }) => {
        const decoded = jwt.decode(passwordToken, process.env.JWT_SECRET);
        if(!decoded) {
            throw Error('Token Expired');
        }

        const hashedPassword = await this.hashPassword(password);
        
        return await this.updateUserPasswordByToken(passwordToken, hashedPassword);
    }

    getByUsername = async (username) => {
        return await User.findAll({
            where: {
                username
            }
        });
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

        try {
            const res = await sequelize.transaction(async (t) => {
                const data = { 
                    ...params,
                    emailOriginal: email,
                    password: hashedPassword,
                    subscriptions: [],
                    emailVerified: false,
                    roleId: 2,
                    emailToken: null,
                    passwordToken: null,
                    credit: 0,
                    themeId: 1,
                    themeInverted: false,
                    eula: true,
                    eulaVersion: 'v1.0.0',
                    status: 'active'
                };
    
                const result = await User.create(data, { transaction: t });
                const userId = result.id;
                
                await Cart.create({ userId }, { transaction: t });
    
                return result;
            });
            
            return res;
        } catch (err) {
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
        
        try {
            const res = await sequelize.transaction(async (t) => {
                const data = { 
                    ...params,
                    emailOriginal: email,
                    password: hashedPassword,
                    subscriptions: [],
                    emailVerified: false,
                    roleId: 3,
                    emailToken: null,
                    passwordToken: null,
                    credit: 0,
                    themeId: 1,
                    themeInverted: false,
                    eula: false,
                    eulaVersion: 'v1.0.0',
                    status: 'active'
                };
    
                const result = await User.create(data, { transaction: t });
                const userId = result.id;

                await Cart.create({ userId }, { transaction: t });
    
                return result;
            });
            
            return res;
        } catch (err) {
            console.log('Customer Create Error: ', err);
            throw Error('There was an error creating the customer');
        }
    }
    
    createCustomer = async (params) => {
        const {
            email,
            username, 
            password
        } = params;
    
        const emailExists = await this.getByEmail(email);
        
        if(emailExists.length > 0) {
            return {
                status: 422,
                error: 'Unable to sign up'
            }
        }
    
        if(await this.checkIfUsernameExists(username)) {
            return {
                statusCode: 422,
                error: 'Username already exists'
            }
        }
        
        const hashedPassword = await this.hashPassword(password);

        try {
            const res = await sequelize.transaction(async (t) => {
                const data = { 
                    ...params,
                    emailOriginal: email,
                    password: hashedPassword,
                    subscriptions: [],
                    emailVerified: false,
                    roleId: 4,
                    emailToken: null,
                    passwordToken: null,
                    credit: 0,
                    themeId: 1,
                    themeInverted: false,
                    eula: true,
                    eulaVersion: 'v1.0.0',
                    status: 'active'
                };
    
                const result = await User.create(data, { transaction: t });
                const cartData = {
                    userId: result.id,
                    products: []
                };
    
                await Cart.create(cartData, { transaction: t });

                
                return result;
            });

            // Refactoring how a verified email works - eg. subscriptions
            // const emailToken = await this.createEmailToken(res.id, email);

            // await emailService.verifyEmail({ email, token: emailToken });

            const token = await authManagement.createToken({ id: res.id });

            return {
                status: 201,
                token,
                email: res.email
            };
        } catch (err) {
            console.log('Customer Create Error: ', err);
            throw Error('There was an error creating the customer');
        }
    }
    
    adminCreateAccount = async (params) => {
        const {
            email
        } = params;
    
        const emailExists = await this.getByEmail(email);
        
        if(emailExists.length > 0) {
            throw Error('Email already exists');
        }

        try {
            const res = await sequelize.transaction(async (t) => {
                const passwordToken = jwt.sign({ email }, process.env.JWT_SECRET);

                const data = { 
                    ...params,
                    password: 'none',
                    emailOriginal: email,
                    subscriptions: [],
                    emailVerified: false,
                    passwordToken,
                    credit: 0,
                    themeId: 1,
                    themeInverted: false,
                    eula: false,
                    status: 'pending'
                };
    
                const result = await User.create(data, { transaction: t });
                const cartData = {
                    userId: result.id,
                    products: []
                };
    
                await Cart.create(cartData, { transaction: t });

                if(result.roleId == 5) {
                    const companyData = {
                        userId: result.id,
                        active: true,
                        socials: [{
                            discord: {
                                url: '',
                                display: false
                            },
                            facebook: {
                                url: '',
                                display: false
                            },
                            instagram: {
                                url: '',
                                display: false
                            },
                            linkedIn: {
                                url: '',
                                display: false
                            },
                            reddit: {
                                url: '',
                                display: false
                            },
                            twitter: {
                                url: '',
                                display: false
                            }
                        }]
                    }
    
                    await Company.create(companyData, { transaction: t });
                }

                
                return {
                    ...result,
                    passwordToken
                };
            });

            // Refactoring how a verified email works - eg. subscriptions
            // const emailToken = await this.createEmailToken(res.id, email);

            // await emailService.verifyEmail({ email, token: emailToken });

            const token = await authManagement.createToken({ id: res.id });

            return {
                status: 201,
                token,
                email: res.email
            };
        } catch (err) {
            console.log('Customer Create Error: ', err);
            throw Error('There was an error creating the customer');
        }
    }

    // UPDATE

    async updateUser(id, params) {
        try {
            let data = params;
            if(data.username && await this.checkIfUsernameExists(data.username, id)) {
                return {
                    statusCode: 422,
                    error: 'Username already exists'
                }
            }

            if(data.password) {
                data.password = await this.hashPassword(data.password);
            }

            return await User.update(
                data,
                {
                    where: {
                                id: id
                            }
                }
            );
        } catch (err) {
            console.log('Update User Error: ', err);
            throw Error('There was an error updating the user');
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

    async updateUserPassword(id, password) {
        return await User.update(
            { 
                password
            },
            {
                where: {
                    id
                }
            }
        );
    }

    async updateUserPasswordByToken(passwordToken, password) {
        return await User.update(
            { 
                password,
                passwordToken: null
            },
            {
                where: {
                    passwordToken
                }
            }
        );
    }


    async updateAccountPassword(id, data) {
        try {
            const { currentPassword, newPassword } = data;
            const getUser = await User.findByPk(id);

            if(!getUser) {
                return {
                    status: 404,
                    error: 'Unable to update user password'
                }
            }

            const verifyPassword = await this.verifyPassword(currentPassword, getUser.password);

            if(!verifyPassword) {
                return {
                    status: 403,
                    error: 'Current password incorrect'
                }
            }
            
            if(!userTools.passwordValidation(newPassword) || currentPassword === newPassword) {
                return {
                    status: 406,
                    error: 'Password does not meet validation standards'
                }
            }

            const hashedPassword = await this.hashPassword(newPassword);

            const res = await this.updateUserPassword(id, hashedPassword);

            console.log('Update password res: ', res.length);
            if(res.length === 1) {
                return {
                    success: 'Password updated successfully'
                }
            } else {
                return {
                    error: 'Something went wrong. Please try again.'
                }
            }
        } catch (err) {
            console.log('Update User Error: ', err);
            throw Error('There was an error updating the user');
        }
    }

    async activateAdminCreatedUser(passwordToken, data) {
        try {
            if(await this.checkIfUsernameExists(data.username)) {
                return {
                    statusCode: 422,
                    error: 'Username already exists'
                }
            }

            const getUser = await User.findOne({
                where: {
                    passwordToken
                }
            });

            const hashedPassword = await this.hashPassword(data.password);

            const res = await User.update(
                {
                    ...data,
                    password: hashedPassword,
                    passwordToken: null,
                    status: 'active'
                },
                {
                    where: {
                                id: getUser.id
                            }
                }
            );

            const token = await authManagement.createToken({ id: getUser.id });

            return {
                status: 200,
                token,
                email: getUser.email
            };
        } catch (err) {
            console.log('Update User Error: ', err);
            throw Error('There was an error updating the user');
        }
    }
}