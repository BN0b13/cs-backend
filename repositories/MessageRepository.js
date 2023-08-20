import Message from '../models/Message.js';

class MessageRepository {


    // CREATE

    async create({ userId, message }) {
        const params = {
            userId,
            message,
            status: 'new',
            replied: false
        };

        try {
            const res = await Message.create(params);
            return res;
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
}

export default MessageRepository;