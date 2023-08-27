import fs from 'fs';
import { Op } from 'sequelize';
import Theme from '../models/Theme.js';

export default class ThemeService {

    async create(params) {
        try {
            const {
                name,
                description,
                mainPrimary,
                DarkPrimary,
                LightPrimary,
                accentPrimary,
                svgPrimary,
                backgroundPrimary,
                backgroundOpacityDarkPrimary,
                backgroundOpacityLightPrimary,
                mainSecondary,
                DarkSecondary,
                LightSecondary,
                accentSecondary,
                svgSecondary,
                backgroundSecondary,
                backgroundOpacityDarkSecondary,
                backgroundOpacityLightSecondary,
                textPrimary,
                textPrimaryAccent,
                textSecondary,
                textSecondaryAccent,
                font,
                backgroundImageOn,
                image = null
            } = params;
            
            const data = {
                name,
                description,
                colors: {
                    primary: {
                        main: mainPrimary,
                        dark: DarkPrimary,
                        light: LightPrimary,
                        accent: accentPrimary,
                        svg: svgPrimary,
                        background: backgroundPrimary,
                        backgroundOpacityDark: backgroundOpacityDarkPrimary,
                        backgroundOpacityLight: backgroundOpacityLightPrimary,
                        text: textPrimary,
                        textSecondary: textPrimaryAccent
                    },
                    secondary: {
                        main: mainSecondary,
                        dark: DarkSecondary,
                        light: LightSecondary,
                        accent: accentSecondary,
                        svg: svgSecondary,
                        background: backgroundSecondary,
                        backgroundOpacityDark: backgroundOpacityDarkSecondary,
                        backgroundOpacityLight: backgroundOpacityLightSecondary,
                        text: textSecondary,
                        textSecondary: textSecondaryAccent
                    }
                },
                text: {
                    font
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
            throw Error('There was an error creating theme');
        }
    }

    // UPDATE

    async updateThemeColorScheme(id, params) {
        try {
            const {
                mainPrimary,
                DarkPrimary,
                LightPrimary,
                accentPrimary,
                svgPrimary,
                backgroundPrimary,
                backgroundOpacityDarkPrimary,
                backgroundOpacityLightPrimary,
                mainSecondary,
                DarkSecondary,
                LightSecondary,
                accentSecondary,
                svgSecondary,
                backgroundSecondary,
                backgroundOpacityDarkSecondary,
                backgroundOpacityLightSecondary,
                textPrimary,
                textPrimaryAccent,
                textSecondary,
                textSecondaryAccent
            } = params;

            const data = {
                colors: {
                    primary: {
                        main: mainPrimary,
                        dark: DarkPrimary,
                        light: LightPrimary,
                        accent: accentPrimary,
                        svg: svgPrimary,
                        background: backgroundPrimary,
                        backgroundOpacityDark: backgroundOpacityDarkPrimary,
                        backgroundOpacityLight: backgroundOpacityLightPrimary,
                        text: textPrimary,
                        textSecondary: textPrimaryAccent
                    },
                    secondary: {
                        main: mainSecondary,
                        dark: DarkSecondary,
                        light: LightSecondary,
                        accent: accentSecondary,
                        svg: svgSecondary,
                        background: backgroundSecondary,
                        backgroundOpacityDark: backgroundOpacityDarkSecondary,
                        backgroundOpacityLight: backgroundOpacityLightSecondary,
                        text: textSecondary,
                        textSecondary: textSecondaryAccent
                    }
                }
            };
            
            const res = await Theme.update(
                data,
                {
                    where: {
                        id
                    }
                }
            );

            return res;
        } catch (err) {
            console.log('Update Theme error: ', err);
            throw Error('There was an error updating the theme');
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