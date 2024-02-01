import fs from 'fs';
import { Op } from 'sequelize';
import { compressImage } from '../tools/images.js';
import WelcomeImage from '../models/WelcomeImage.js';

export default class WelcomeService {

    async saveWelcomeImage(params) {
        try {
            const {
                caption,
                link,
                position,
                image
            } = params;
            
            const data = {
                caption,
                filename: image.filename,
                path: `/img/welcome/${image.filename}`,
                link,
                position
            };

            const res = await WelcomeImage.create(data);

            const { path, filename } = image;
            // await compressImage(path, `welcome/${filename}`);

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


                 fs.stat(`./public${imagePath}-mobile.webp`, function (err) {
                    if (err) {
                        return console.error(err);
                    }
                
                    fs.unlink(`./public${imagePath}-mobile.webp`,function(err){
                        if(err) return console.log(err);
                        console.log('file deleted successfully');
                    });
                });

                fs.stat(`./public${imagePath}-desktop.webp`, function (err) {
                    if (err) {
                        return console.error(err);
                    }
                
                    fs.unlink(`./public${imagePath}-desktop.webp`,function(err){
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