import { Company } from '../models/Associations.js';

class CompanyRepository {

    // READ

    async getCompanies({ sortKey = 'createdAt', sortDirection = 'ASC', size = 10, page = 0 }) {
        try {
            const res = await Company.findAndCountAll({
                order: [
                    [sortKey, sortDirection],
                ],
                limit: size,
                offset: (page * size),
            });
            return res;
        } catch (err) {
            console.log('Get Companies Error: ', err);
            throw Error('There was an error getting all companies');
        }
    }

    async getCompanyByUserId(id) {
        try {
            const res = await Company.findAndCountAll({
                where: {
                    userId: id
                }
            });
            return res;
        } catch (err) {
            console.log('Get Company by User ID Error: ', err);
            throw Error('There was an error getting all Company by User ID');
        }
    }
}

export default CompanyRepository;