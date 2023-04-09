import UserRepository from '../repositories/UserRepository.js';

const userRepository = new UserRepository();

class UserController {

    // CREATE

    async create(req, res) {
        try {
        const { 
            email = null,
            password = null,
            firstName = null,
            lastName = null,
            phone = null,
            address = null,
            city = null,
            state = null,
            zipCode = null,
            emailList = null
        } = req.body;

        const params = {
            email: email.toLowerCase(),
            password,
            firstName,
            lastName,
            phone,
            address,
            city,
            state,
            zipCode,
            emailList
        };

        Object.values(params).forEach(param => {
            if(param === null) {
                throw Error(`Missing ${params[param]} Param`);
            }
        });

        const data = await userRepository.create(params);

        res.send(data);
        } catch (err) {
            res.send({
                err,
                message: 'There was an error creating user'
            });
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

    async getAccountInformation(req, res) {
        console.log('Get Account Info hit');
        const { id } = req.userData;
        const data = await userRepository.getAccountInformation(id);
        res.send(data);
    }

    async getByPK(req, res) {
        // Primary Key
        const { id } = req.params;
        const data = await userRepository.getByPK(id);
        res.send(data);
    }
    
    async getUsers(req, res) {
        const data = await userRepository.getUsers();
        res.send(data);
    }

    // UPDATE

    async updateUser(req, res) {
        const { id } = req.userData;
        const {
            password = null,
            firstName = null,
            lastName = null,
            phone = null,
            address = null,
            city = null,
            state = null,
            zipCode = null,
            emailList = null
        } = req.body;

        const params = {
            password,
            firstName,
            lastName,
            phone,
            address,
            city,
            state,
            zipCode,
            emailList
        };

        Object.keys(params).forEach(param => params[param] == null && delete params[param]);

        const data = await userRepository.updateUser(id, params);
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