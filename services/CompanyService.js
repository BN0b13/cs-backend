import fs from 'fs';
import { Op } from 'sequelize';

import { compressImage } from '../tools/images.js';

import { Giveaway, Company, User } from '../models/Associations.js';

export default class CompanyService {

    // READ

    async getCompanies(id) {
        const user = await User.findOne({
            where: {
                id
            }
        });
        if(user.roleId < 3) {
            return await Company.findAndCountAll();
        } else {
            return await Company.findAndCountAll({
                where: {
                    userId: id
                }
            });
        }
    }

    async getCompanyById(id) {
        return await Company.findOne({
            where: {
                id
            }
        })
    }

    // CREATE

    async createCompany(data) {
        const params = {
            ...data,
            active: true
        }

        return await Company.create(params);
    }

    async createCompanyLogo(params) {
        const {
            id,
            image
        } = params;

        console.log('Params: ', params);

        const { 
            path, 
            filename 
        } = image;
        
        const data = {
            logoFilename: image.filename,
            logoPath: `/img/companies/${image.filename}`,
        }

        await compressImage(path, `companies/${filename}`);

        return  await Company.update(
            data,
            {
                where: {
                    id
                }
            }
        );
    }

    // UPDATE

    async updateCompany(id, data) {
        return await Company.update(
            data,
            {
                where: {
                    id
                }
            }
        );
    }

    // DELETE

    async deleteCompany(id) {
        const getGiveaways = await Giveaway.findAndCountAll({
            where: {
                companyId: id
            }
        });

        if(getGiveaways.count !== 0) {
            return {
                error: 'Unable to delete Company, giveaway(s) are associated with company.'
            }
        }

        const company = await Company.findOne({
            where: {
                id
            }
        });

        if(company.logoPath) {
            // Delete local image
            fs.stat(`./public${company.logoPath}`, function (err) {
                if (err) {
                    return console.error(err);
                }
            
                fs.unlink(`./public${company.logoPath}`,function(err){
                    if(err) return console.log(err);
                    console.log('file deleted successfully');
                });
            });

            fs.stat(`./public${company.logoPath}-mobile.webp`, function (err) {
                if (err) {
                    return console.error(err);
                }
            
                fs.unlink(`./public${company.logoPath}-mobile.webp`,function(err){
                    if(err) return console.log(err);
                    console.log('file deleted successfully');
                });
            });

            fs.stat(`./public${company.logoPath}-desktop.webp`, function (err) {
                if (err) {
                    return console.error(err);
                }
            
                fs.unlink(`./public${company.logoPath}-desktop.webp`,function(err){
                    if(err) return console.log(err);
                    console.log('file deleted successfully');
                });
            });
        }

        await Company.destroy({
            where: {
                id
            }
        });

        return {
            status: 200,
            message: `Company was successfully deleted.`
        }
    }

    async deleteCompanyLogo(id) {
        const company = await Company.findOne({
            where: {
                id
            }
        });

        if(company.logoPath) {
            // Delete local image
            fs.stat(`./public${company.logoPath}`, function (err) {
                if (err) {
                    return console.error(err);
                }
            
                fs.unlink(`./public${company.logoPath}`,function(err){
                    if(err) return console.log(err);
                    console.log('file deleted successfully');
                });
            });

            fs.stat(`./public${company.logoPath}-mobile.webp`, function (err) {
                if (err) {
                    return console.error(err);
                }
            
                fs.unlink(`./public${company.logoPath}-mobile.webp`,function(err){
                    if(err) return console.log(err);
                    console.log('file deleted successfully');
                });
            });

            fs.stat(`./public${company.logoPath}-desktop.webp`, function (err) {
                if (err) {
                    return console.error(err);
                }
            
                fs.unlink(`./public${company.logoPath}-desktop.webp`,function(err){
                    if(err) return console.log(err);
                    console.log('file deleted successfully');
                });
            });
        }

        await Company.update(
            {
                logoFilename: null,
                logoPath: null
            },
            {
                where: {
                    id
                }
            }
        );

        return {
            status: 200,
            message: `Company was successfully deleted.`
        }
    }
}