import Theme from '../models/Theme.js';

class ThemeRepository {

    // READ

    async getThemes() {
        try {
            const res = await Theme.findAndCountAll();
            return res;
        } catch (err) {
            console.log('GET Welcome Images Error: ', err);
            throw Error('There was an error getting Welcome Images');
        }
    }

    async getTheme() {
        try {
            const res = await Theme.findOne({
                where: {
                    name: 'default'
                }
            });
            
            if(!res) {
                return {};
            }
            return res;
        } catch (err) {
            console.log('GET Welcome Images Error: ', err);
            throw Error('There was an error getting Welcome Images');
        }
    }

    // UPDATE

    // async updateWelcomeImageById(id, data) {
    //     try {
    //         console.log('Updating id: ', id);
    //         console.log('Data: ', data);
    //         const res = await WelcomeImage.update(
    //             data,
    //             {
    //                 where: {
    //                             id: id
    //                         }
    //             }
    //         );
    //         return res;
    //     } catch (err) {
    //         console.log('UPDATE Welcome Images Error: ', err);
    //         throw Error('There was an error updating Welcome Images');
    //     }
    // }

    // DELETE

    // async deleteWelcomeImageById(id) {
    //     try {
    //         const res = await WelcomeImage.destroy(
    //             {
    //                 where: {
    //                             id: id
    //                         }
    //             }
    //         );

    //         return {
    //             status: 200,
    //             message: `Deleted ${res} Welcome Picture`
    //         };
    //     } catch (err) {
    //         console.log('DELETE Welcome Image Error: ', err);
    //         throw Error('There was an error deleting the welcome image');
    //     }
    // }
}

export default ThemeRepository;