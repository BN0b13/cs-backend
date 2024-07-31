import UserRepository from '../repositories/UserRepository.js';

import UserService from '../services/UserService.js';

const userRepository = new UserRepository();
const userService = new UserService();

class UserController {

    // CREATE

    async createAdmin(req, res) {
        try {
        const { 
            email = null,
            password = null,
            firstName = null,
            lastName = null,
            phone = null,
            billingAddress = null,
            shippingAddress = null,
            username = null
        } = req.body;

        const params = {
            email: email.toLowerCase(),
            password,
            firstName,
            lastName,
            phone,
            billingAddress,
            shippingAddress,
            username
        };

        Object.values(params).forEach(param => {
            if(param === null) {
                throw Error(`Missing ${params[param]} Param`);
            }
        });

        const data = await userService.createAdminTransaction(params);

        res.send(data);
        } catch (err) {
            res.send({
                err,
                message: 'There was an error creating Admin'
            });
        }
    }

    async createEmployee(req, res) {
        try {
        const { 
            email = null,
            password = null,
            firstName = null,
            lastName = null,
            phone = null,
            billingAddress = null,
            shippingAddress = null,
            username = null
        } = req.body;

        const params = {
            email: email.toLowerCase(),
            password,
            firstName,
            lastName,
            phone,
            billingAddress,
            shippingAddress,
            username
        };

        Object.values(params).forEach(param => {
            if(param === null) {
                throw Error(`Missing ${params[param]} Param`);
            }
        });

        const data = await userService.createEmployeeTransaction(params);

        res.send(data);
        } catch (err) {
            res.send({
                err,
                message: 'There was an error creating Employee'
            });
        }
    }

    async createCustomer(req, res) {
        try {
        const { 
            email = null,
            password = null,
            firstName = null,
            lastName = null,
            phone = null,
            billingAddress = null,
            shippingAddress = null,
            eula = null,
            username = null
        } = req.body;

        const params = {
            email: email.toLowerCase(),
            password,
            firstName,
            lastName,
            phone,
            billingAddress,
            shippingAddress,
            eula,
            username
        };

        Object.values(params).forEach(param => {
            if(param === null) {
                throw Error(`Missing ${params[param]} Param`);
            }
        });

        const data = await userService.createCustomer(params);

        res.send(data);
        } catch (err) {
            res.send({
                err,
                message: 'There was an error creating user'
            });
        }
    }

    async adminCreateAccount(req, res) {
        try {
        const { 
            email = null,
            roleId = null
        } = req.body;

        const params = {
            email: email.toLowerCase(),
            roleId
        };

        Object.values(params).forEach(param => {
            if(param === null) {
                throw Error(`Missing ${params[param]} Param`);
            }
        });

        const data = await userService.adminCreateAccount(params);

        res.send(data);
        } catch (err) {
            res.send({
                err,
                message: 'There was an error creating user'
            });
        }
    }
    
    async initiatePasswordReset(req, res) {
        try {
            const {
                email = null
            } = req.body;

            const params = {
                email: email.toLowerCase()
            };

            Object.values(params).forEach(param => {
                if(param === null) {
                    throw Error(`Missing ${params[param]} Param`);
                }
            });

            const data = await userService.initiatePasswordReset(params);

            res.send(data);
        } catch (err) {
            console.log('Initiate Password Reset Error: ', err);
            
        }
    }

    async completePasswordReset(req, res) {
        try {
            const {
                passwordToken = null,
                password = null
            } = req.body;

            const params = {
                passwordToken,
                password
            };

            Object.values(params).forEach(param => {
                if(param === null) {
                    throw Error(`Missing ${params[param]} Param`);
                }
            });

            const data = await userService.completePasswordReset(params);

            res.send(data);
        } catch (err) {
            console.log('Initiate Password Reset Error: ', err);
            
        }
    }

    async verifyEmail(req, res) {
        try {
            const {
                email = null
            } = req.body;

            const params = {
                email: email.toLowerCase()
            };

            Object.values(params).forEach(param => {
                if(param === null) {
                    throw Error(`Missing ${params[param]} Param`);
                }
            });

            const data = await userService.verifyEmail(params);

            res.send(data);
        } catch (err) {
            console.log('Initiate Password Reset Error: ', err);
        }
    }

    async completeEmailVerification(req, res) {
        try {
            const { token } = req.params;

            const params = {
                emailToken: token
            };

            if(token === null) {
                throw Error(`Missing Email Verification Token`);
            }

            const data = await userService.completeEmailVerification(params);

            res.send(data);
        } catch (err) {
            console.log('Initiate Password Reset Error: ', err);
            
        }
    }

    // READ

    async login(req, res) {
        try {
            const {
                email = null, 
                password = null
            } = req.body;
    
            const params = {
                email: email.toLowerCase(), 
                password
            };
    
            Object.values(params).forEach(param => {
                if(param === null) {
                    throw Error(`Missing ${params[param]} Param`);
                }
            });

            const data = await userRepository.login(params);

            res.send(data);
        } catch (err) {
            console.log(err);
            res.send({
                err,
                message: 'There was an error logging in'
            });
        }
    }

    async adminLogin(req, res) {
        try {
            const {
                email = null, 
                password = null
            } = req.body;
    
            const params = {
                email: email.toLowerCase(), 
                password
            };
    
            Object.values(params).forEach(param => {
                if(param === null) {
                    throw Error(`Missing ${params[param]} Param`);
                }
            });

            const data = await userRepository.adminLogin(params);

            res.send(data);
        } catch (err) {
            res.send({
                err,
                message: 'There was an error logging in'
            });
        }
    }

    async getAdmin(req, res) {
        const data = await userRepository.getAdmin();
        res.send(data);
    }

    async getCustomers(req, res) {
        const data = await userRepository.getCustomers();
        res.send(data);
    }
    
    async getUser(req, res) {
        const { id } = req.userData;
        const data = await userRepository.getUser(id);
        res.send(data);
    }

    async getAccountById(req, res) {
        const { id } = req.userData;
        const data = await userRepository.getUserById(id);
        res.send(data);
    }

    async getUserByPasswordToken(req, res) {
        const { passwordToken } = req.params;
        const data = await userRepository.getUserByPasswordToken(passwordToken);
        res.send(data);
    }

    async getByPK(req, res) {
        // Primary Key
        const { id } = req.params;
        const data = await userRepository.getByPK(id);
        res.send(data);
    }

    async getUserById(req, res) {
        const { id } = req.params;
        const data = await userRepository.getUserById(id);
        res.send(data);
    }
    
    async getUsers(req, res) {
        const { 
            search = null, 
            page = 0, 
            size = 10,
            sortKey = 'createdAt',
            sortDirection = 'ASC'
        } = req.query;

        const params = {
            sortKey,
            sortDirection,
            page,
            size
        };

        if(search === null) {
            const data = await userRepository.getUsers(params);
            return res.send(data);
        }

        params.search = search;

        const data = await userService.searchUsers(params);
        res.send(data);
    }

    async getCustomersByDateRange(req, res) {
        const {
            start,
            end
        } = req.body;
        const data = await userRepository.getCustomersByDateRange({ start, end });
        res.send(data);
    }

    async searchUsers(req, res) {
        const { search = null, 
                page = 0, 
                size = 10,
                sortColumn = 'createdAt',
                sortDirection = 'ASC'
        } = req.query;

        const params = {
            page,
            size,
            sortColumn,
            sortDirection
        };

        if(search === null) {
            const data = await userRepository.getUsersByPage(params);
            return res.send(data);
        }
        const data = await userService.searchUsers(params);
        res.send(data);
    }

    async sendEmailVerificationEmail(req, res) {
        const { id } = req.userData;
        const data = userService.sendEmailVerificationEmail({ id });
        res.send(data);
    }

    async verifyUserEmailToken(req, res) {
        const { id } = req.userData;
        const data = await userService.verifyEmailTokenIsValid({ id });
        res.send(data);
    }

    async verifyUserResetPasswordToken(req, res) {
        const { token } = req.params;
        const data = await userService.verifyUserResetPasswordToken(token);
        res.send(data);
    }

    // UPDATE

    async updateCustomer(req, res) {
        const { id } = req.userData;
        const {
            username,
            firstName = null,
            lastName = null,
            phone = null,
            billingAddress = null,
            shippingAddress = null,
            subscriptions = null
        } = req.body;

        const params = {
            username,
            firstName,
            lastName,
            phone,
            billingAddress,
            shippingAddress,
            subscriptions
        };

        Object.keys(params).forEach(param => params[param] == null && delete params[param]);

        const data = await userService.updateUser(id, params);
        res.send(data);
    }

    async updateUser(req, res) {
        const { id } = req.userData;
        const {
            username,
            password = null,
            firstName = null,
            lastName = null,
            phone = null,
            billingAddress = null,
            shippingAddress = null,
            subscriptions = null,
            credit = null
        } = req.body;

        const params = {
            username,
            password,
            firstName,
            lastName,
            phone,
            billingAddress,
            shippingAddress,
            subscriptions,
            credit
        };

        Object.keys(params).forEach(param => params[param] == null && delete params[param]);

        const data = await userService.updateUser(id, params);
        res.send(data);
    }

    async updateAdminUser(req, res) {

        const {
            id,
            roleId = null,
            username = null,
            password = null,
            firstName = null,
            lastName = null,
            phone = null,
            billingAddress = null,
            shippingAddress = null,
            subscriptions = null,
            credit = null
        } = req.body;

        console.log('REQ body: ', req.body);

        const params = {
            roleId,
            username,
            password,
            firstName,
            lastName,
            phone,
            billingAddress,
            shippingAddress,
            subscriptions,
            credit
        };

        Object.keys(params).forEach(param => params[param] == null && delete params[param]);

        console.log('Params: ', params);

        const data = await userService.updateUser(id, params);
        res.send(data);
    }

    async updateAccountPassword(req, res) {
        const { id } = req.userData;
        const {
            currentPassword = null,
            newPassword = null,
        } = req.body;

        const params = {
            currentPassword,
            newPassword
        };

        Object.values(params).forEach(param => {
            if(param === null) {
                throw Error(`Missing ${params[param]} Param`);
            }
        });

        const data = await userService.updateAccountPassword(id, params);
        res.send(data);
    }

    async deleteCustomer(req, res) {
        const { id } = req.userData;

        const data = await userRepository.deleteCustomer(id);
        res.send(data);
    }

    async activateAdminCreatedAccount(req, res) {
        const {
            passwordToken = null,
            username = null,
            password = null,
            firstName = null,
            lastName = null,
            phone = null,
            billingAddress = null,
            eula = null
        } = req.body;

        const params = {
            username,
            password,
            firstName,
            lastName,
            phone,
            billingAddress,
            shippingAddress: billingAddress,
            eula
        };

        Object.values(params).forEach(param => {
            if(param === null) {
                throw Error(`Missing ${param} Param`);
            }
        });

        const data = await userService.activateAdminCreatedUser(passwordToken, params);
        res.send(data);
    }

    // DELETE

    async deleteUser(req, res) {
        const {
            id
        } = req.body;

        const data = await userRepository.deleteUser(id);
        res.send(data);
    }
}

export default UserController;