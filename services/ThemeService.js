import fs from 'fs';
import { Op } from 'sequelize';
import Theme from '../models/Theme.js';

export default class ThemeService {

    async create(params) {
        try {
            const {
                name,
                description,
                colorPrimary,
                colorSecondary,
                textPrimary,
                textSecondary,
                backgroundColor,
                backgroundImageOn,
                image = null
            } = params;
            
            const data = {
                name,
                description,
                colors: {
                colorPrimary,
                colorSecondary,
                textPrimary,
                textSecondary,
                backgroundColor
                },
                images: {

                },
                options: {
                    backgroundImageOn
                }
            };

            if(image) {
                data.images.backgroundFilename = image.filename;
                data.images.backgroundPath = `/img/welcome/${image.filename}`;
            }

            const res = await Theme.create(data);

            return res;
        } catch(err) {
            console.log('Save Welcome Image To Server Error: ', err);
            throw Error('There was an error getting saving welcome image to server');
        }
    }

    // DELETE

    async deleteImagesAndFilesById(ids) {
        try {
            const getImages = await Theme.findAndCountAll({
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

            const res = await Theme.destroy(
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
            console.log('DELETE Images Error: ', err);
            throw Error('There was an error deleting the images');
        }
    }
}