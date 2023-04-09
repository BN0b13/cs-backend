import Contact from '../models/Contact.js';

class ContactRepository {


    // CREATE

    async create({ userId, message }) {
        const params = {
            userId,
            message,
            status: 'new',
            replied: false
        };

        try {
            const res = await Contact.create(params);
            return res;
        } catch (err) {
            console.log(err);
            throw Error('There was an error creating the contact message');
        }
    }

    // READ

    async getMessages() {
        try {
            const res = await Contact.findAndCountAll({});
            return res;
        } catch (err) {
            console.log('Get Contact Messages Error: ', err);
            throw Error('There was an error getting the contact messages');
        }
    }
}

export default ContactRepository;