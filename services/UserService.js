import * as bcrypt from 'bcrypt';
import { sequelize } from "../db.js";

import { Cart, User } from '../models/Associations.js';

export default class UserService {
    hashPassword = async (password) => {
        const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPTSALT));
        return await bcrypt.hash(password, salt);
    }

    verifyPassword = async (data, encrypted) => {
        return await bcrypt.compare(data, encrypted);
    }

    getByEmail = async (email) => {
        return await User.findAll({
            where: {
                email
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
                    roleId: 2
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
                    roleId: 3
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
                    roleId: 4
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
}