import UserRepository from '../repositories/UserRepository.js';

const userRepository = new UserRepository();

class UserController {
    create(req, res) {
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

        params.forEach(param => {
            if(typeof param === undefined) {
                throw Error('Missing Params');
            }
        });

        const createUser = userRepository.create(params);

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
}

export default UserController;