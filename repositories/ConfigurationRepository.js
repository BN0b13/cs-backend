import { Configuration, Theme } from '../models/Associations.js';

class ConfigurationRepository {

    // READ

    async getConfigurations() {
        try {
            const res = await Configuration.findAndCountAll({
                include: [
                    { 
                        model: Theme,
                        required: true
                    }
                ]
            });

            return res;
        } catch (err) {
            console.log('Get Configurations Error: ', err);
            throw Error('There was an error getting configurations');
        }
    }

    async getAdminConfiguration() {
        try {
            const res = await Configuration.findAndCountAll({
                where: {
                    name: 'admin'
                },
                include: [
                    { 
                        model: Theme,
                        required: true
                    }
                ]
            });

            return res;
        } catch (err) {
            console.log('Get Admin Configuration Error: ', err);
            throw Error('There was an error getting the admin configuration');
        }
    }

    async getPublicConfiguration() {
        try {
            const res = await Configuration.findAndCountAll({
                where: {
                    name: 'public'
                },
                include: [
                    { 
                        model: Theme,
                        required: true
                    }
                ]
            });

            const data = res;

            return data;
        } catch (err) {
            console.log('Get Public Configuration Error: ', err);
            throw Error('There was an error getting categories');
        }
    }

    // UPDATE

    async updateCategory(id, data) {
        try {
            const res = await Configuration.update(
                data,
                {
                    where: {
                                id: id
                            }
                }
            );
            return res;
        } catch (err) {
            console.log('Update Category Error: ', err);
            throw Error('There was an error updating the category');
        }
    }
}

export default ConfigurationRepository;