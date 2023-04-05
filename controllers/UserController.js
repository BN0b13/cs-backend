import UserRepository from '../repositories/UserRepository.js';

const userRepository = new UserRepository();

class UserController {
    async create(req, res) {
        try {
            console.log('USER CREATE REQ: ', req.body);
        const {
            username, 
            password,
            firstName,
            lastName,
            phone,
            email,
            address,
            city,
            state,
            zipCode,
            emailList
        } = req.body;

        const params = {
            username, 
            password,
            firstName,
            lastName,
            phone,
            email,
            address,
            city,
            state,
            zipCode,
            emailList
        };

        // TODO create field checker logic
        // params.forEach(param => {
        //     if(typeof param === undefined) {
        //         throw Error('Missing Params');
        //     }
        // });

        const createUser = await userRepository.create(params);

        res.send({
            message: 'User Creation Result',
            result: createUser
        });
        } catch (err) {
            res.send({
                err,
                message: 'There was an error creating user'
            });
        }
    }

    async getByPK(req, res) {
        // Primary Key
        const { id } = req.params;
        const result = await userRepository.getByPK(id);
        res.send(result);
    }
    
    async getUsers(req, res) {
        const result = await userRepository.getUsers();
        res.send(result);
    }
}

export default UserController;