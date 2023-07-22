import Page from '../models/Page.js';
import WelcomeImage from '../models/WelcomeImage.js';

class WelcomeRepository {

    // READ

    async getWelcomeImages() {
        try {
            const res = await WelcomeImage.findAndCountAll();
            return res;
        } catch (err) {
            console.log('GET Welcome Images Error: ', err);
            throw Error('There was an error getting Welcome Images');
        }
    }

    async getWelcomeContent() {
        try {
            const res = await Page.findAndCountAll(
                {
                    where: {
                        type: "welcome"
                    }
                }
            );
            return res;
        } catch (err) {
            console.log('GET Welcome Images Error: ', err);
            throw Error('There was an error getting Welcome Images');
        }
    }

    // UPDATE

    async updateWelcomeImageById(id, data) {
        try {
            console.log('Updating id: ', id);
            console.log('Data: ', data);
            const res = await WelcomeImage.update(
                data,
                {
                    where: {
                                id: id
                            }
                }
            );
            return res;
        } catch (err) {
            console.log('UPDATE Welcome Images Error: ', err);
            throw Error('There was an error updating Welcome Images');
        }
    }

    // DELETE

    async deleteWelcomeImageById(id) {
        try {
            const res = await WelcomeImage.destroy(
                {
                    where: {
                                id: id
                            }
                }
            );

            return {
                status: 200,
                message: `Deleted ${res} Welcome Picture`
            };
        } catch (err) {
            console.log('DELETE Welcome Image Error: ', err);
            throw Error('There was an error deleting the welcome image');
        }
    }
}

export default WelcomeRepository;