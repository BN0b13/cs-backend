import ContactRepository from '../repositories/ContactRepository.js';

const contactRepository = new ContactRepository();

class ContactController {

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

        const data = await contactRepository.create(params);

        res.send({
            message: 'Contact Message Creation Result',
            result: data
        });
        } catch (err) {
            res.send({
                err,
                message: 'There was an error creating contact message'
            });
        }
    }

    // READ
    
    async getMessages(req, res) {
        const data = await contactRepository.getMessages();
        res.send(data);
    }

}

export default ContactController;