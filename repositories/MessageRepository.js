import { Message } from '../models/Associations.js';

class MessageRepository {


    // CREATE

    async create(params) {

        const data = {
            ...params,
            status: 'new',
            replied: false,
            deleted: false
        };

        try {
            const res = await Message.create(data);
            return {
                status: 201,
                message: 'Message created.',
                response: res
            };
        } catch (err) {
            console.log(err);
            throw Error('There was an error creating the message');
        }
    }

    // READ

    async getMessages() {
        try {
            const res = await Message.findAndCountAll({});
            return res;
        } catch (err) {
            console.log('Get Messages Error: ', err);
            throw Error('There was an error getting the messages');
        }
    }

    async getMessageById(id) {
        try {
            const res = await Message.findAll(
                {
                    where: {
                        id: id
                    }
                }
            );
            return res;
        } catch (err) {
            console.log('Get Message by id Error: ', err);
            throw Error('There was an error getting the message by id');
        }
    }

    // UPDATE 

    async updateMessage(id, data) {
        try {
            const res = await Message.update(
                data,
                {
                    where: {
                                id: id
                            }
                }
            );
            return res;
        } catch (err) {
            console.log('Update Message Error: ', err);
            throw Error('There was an error updating the message');
        }
    }
}

export default MessageRepository;