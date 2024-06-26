import fs from 'fs';
import { sequelize } from "../db.js";

import { compressImage } from '../tools/images.js';

import { Giveaway, Company, User } from '../models/Associations.js';

export default class CompanyService {

    // READ

    searchCompanies = async ({ search = '', page, size, sortKey, sortDirection }) => {
        try {
            const getCount = await sequelize.query(`
            select *
            from  ${process.env.PG_SCHEMA_NAME}."Companies" as "Company"
            where ("Company".name ilike '%${search}%' or "Company".bio ilike '%${search}%')
            `);

            const currentPage = page * size;
            const res = await sequelize.query(`
            SELECT *
            FROM  ${process.env.PG_SCHEMA_NAME}."Companies" AS "Company"
            WHERE ("Company".name ilike '%${search}%' OR "Company".bio ilike '%${search}%')
            ORDER BY "Company"."${sortKey}" ${sortDirection}
            LIMIT ${size}
            OFFSET ${currentPage}
            `);

            return {
                count: getCount[1].rowCount,
                rows: res[0]
            };
        } catch (err) {
            console.log('Search Companies Error: ', err);
            throw Error('There was an error searching Companies');
        }
    }

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
                });
            });

            fs.stat(`./public${company.logoPath}-mobile.webp`, function (err) {
                if (err) {
                    return console.error(err);
                }
            
                fs.unlink(`./public${company.logoPath}-mobile.webp`,function(err){
                    if(err) return console.log(err);
                });
            });

            fs.stat(`./public${company.logoPath}-desktop.webp`, function (err) {
                if (err) {
                    return console.error(err);
                }
            
                fs.unlink(`./public${company.logoPath}-desktop.webp`,function(err){
                    if(err) return console.log(err);
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
                });
            });

            fs.stat(`./public${company.logoPath}-mobile.webp`, function (err) {
                if (err) {
                    return console.error(err);
                }
            
                fs.unlink(`./public${company.logoPath}-mobile.webp`,function(err){
                    if(err) return console.log(err);
                });
            });

            fs.stat(`./public${company.logoPath}-desktop.webp`, function (err) {
                if (err) {
                    return console.error(err);
                }
            
                fs.unlink(`./public${company.logoPath}-desktop.webp`,function(err){
                    if(err) return console.log(err);
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