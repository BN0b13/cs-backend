import { sequelize } from "../db.js";
const t = await sequelize.transaction();

import UserRepository from '../repositories/UserRepository.js';

import { Cart, User } from '../models/Associations.js';

import UserService from './UserService.js';

const userRepository = new UserRepository();
const userService = new UserService();

export const createAdminTransaction = async (params) => {
    const {
        email, 
        password
    } = params;

    const emailExists = await userRepository.getByEmail(email);
    
    if(emailExists.length > 0) {
        throw Error('Email already exists');
    }
    
    const hashedPassword = await userService.hashPassword(password);
    
    try {
        const res = await sequelize.transaction(async (t) => {
            const data = { 
                ...params, 
                password: hashedPassword,
                emailVerified: false,
                roleId: 2
            };

            const result = await User.create(data, { transaction: t });
            const userId = result.id;

            try {
                await Cart.create({ userId }, { transaction: t });
            } catch (err) {
                console.log('Create Cart Error: '. err);
                throw Error(`Cart creation error: ${err}`);
            }

            return result;
        });
        
        return res;
    } catch (err) {
        await t.rollback();
        console.log('Customer Create Error: ', err);
        throw Error('There was an error creating the customer');
    }
}

export const createEmployeeTransaction = async (params) => {
    const {
        email, 
        password
    } = params;

    const emailExists = await userRepository.getByEmail(email);
    
    if(emailExists.length > 0) {
        throw Error('Email already exists');
    }
    
    const hashedPassword = await userService.hashPassword(password);
    
    try {
        const res = await sequelize.transaction(async (t) => {
            const data = { 
                ...params, 
                password: hashedPassword,
                emailVerified: false,
                roleId: 3
            };

            const result = await User.create(data, { transaction: t });
            const userId = result.id;

            try {
                await Cart.create({ userId }, { transaction: t });
            } catch (err) {
                console.log('Create Cart Error: '. err);
                throw Error(`Cart creation error: ${err}`);
            }

            return result;
        });
        
        return res;
    } catch (err) {
        await t.rollback();
        console.log('Customer Create Error: ', err);
        throw Error('There was an error creating the customer');
    }
}

export const createCustomerTransaction = async (params) => {
    const {
        email, 
        password
    } = params;

    const emailExists = await userRepository.getByEmail(email);
    
    if(emailExists.length > 0) {
        throw Error('Email already exists');
    }
    
    const hashedPassword = await userService.hashPassword(password);
    
    try {
        const res = await sequelize.transaction(async (t) => {
            const data = { 
                ...params, 
                password: hashedPassword,
                emailVerified: false,
                roleId: 4
            };

            const result = await User.create(data, { transaction: t });
            const userId = result.id;

            try {
                await Cart.create({ userId }, { transaction: t });
            } catch (err) {
                console.log('Create Cart Error: '. err);
                throw Error(`Cart creation error: ${err}`);
            }

            return result;
        });
        
        return res;
    } catch (err) {
        await t.rollback();
        console.log('Customer Create Error: ', err);
        throw Error('There was an error creating the customer');
    }
}