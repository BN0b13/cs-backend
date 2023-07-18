import fs from 'fs';
import { Op } from 'sequelize';
import WelcomeImage from '../models/WelcomeImage.js';

import { companyName } from '../config.js';

export default class WelcomeService {

    async saveWelcomeImage(image) {
        try {
            const filename = Date.now();
            const urlPath = `/img/welcome/${filename}.jpeg`;
            
            fs.writeFile(`./public${urlPath}`, image, (error) => {
                if (error) {
                 throw error;
               }
                console.log("Welcome Image saved.");
               });

            const data = {
                name: `Welcome to ${companyName}`,
                filename,
                path: urlPath,
                link: '/shop',
                position: 1
            };

            const res = await WelcomeImage.create(data);

            return res;
        } catch(err) {
            console.log('Save Welcome Image To Server Error: ', err);
            throw Error('There was an error getting saving welcome image to server');
        }
    }

    // DELETE

    async deleteImagesAndFilesById(ids) {
        try {
            const getImages = await WelcomeImage.findAndCountAll({
                where: {
                    id: {
                        [Op.in]: ids
                    }
                }
            });
            
            if(getImages.rows.length !== ids.length) {
                return {
                    status: 404,
                    message: 'Images(s) not found'
                }
            }
            
            const imagesPath = getImages.rows.map(image => image.path);

            for(let imagePath of imagesPath) {
                fs.stat(`./public${imagePath}`, function (err) {
                    if (err) {
                        return console.error(err);
                    }
                 
                    fs.unlink(`./public${imagePath}`,function(err){
                         if(err) return console.log(err);
                         console.log('file deleted successfully');
                    });
                 });
            }

            const res = await WelcomeImage.destroy(
                {
                    where: {
                        id: {
                            [Op.in]: ids
                        }
                    }
                }
            );

            return {
                status: 200,
                message: `Deleted ${res} Picture`
            };
        } catch (err) {
            console.log('GET Images Error: ', err);
            throw Error('There was an error getting the images');
        }
    }
}