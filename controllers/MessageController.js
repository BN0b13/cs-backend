import MessageRepository from '../repositories/MessageRepository.js';

const messageRepository = new MessageRepository();

class MessageController {

    // CREATE

    async create(req, res) {
        try {
        const {
            userId,
            message
        } = req.body;

        const params = {
            userId,
            message
        };

        const data = await messageRepository.create(params);

        res.send({
            message: 'Message Creation Result',
            result: data
        });
        } catch (err) {
            res.send({
                err,
                message: 'There was an error creating message'
            });
        }
    }

    // READ
    
    async getMessages(req, res) {
        const data = await messageRepository.getMessages();
        res.send(data);
    }

}

export default MessageController;