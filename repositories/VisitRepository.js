import { Sequelize } from 'sequelize';

import Visit from '../models/Visit.js';

class VisitRepository {


    // CREATE

    async create() {
        const params = {
            count: 1
        };

        try {
            const res = await Visit.create(params);
            return res;
        } catch (err) {
            console.log(err);
            throw Error('There was an error creating the new visit count');
        }
    }

    // READ

    async getTotalVisitCount() {
        try {
            const res = await Visit.findAndCountAll({});

            let totalCount = 0;
            res.rows.map(row => {
              return totalCount = totalCount + row.count;
            });

            return {
                totalCount
            };
        } catch (err) {
            console.log('Get Visit Messages Error: ', err);
            throw Error('There was an error getting all roles');
        }
    }

    async getVisits() {
        try {
            const res = await Visit.findAndCountAll({});
            return res;
        } catch (err) {
            console.log('Get Visit Messages Error: ', err);
            throw Error('There was an error getting all roles');
        }
    }

    async getVisitsByPage(page, size) {
        try {
            const currentPage = page * size;
            const res = await Visit.findAndCountAll({
                limit: size,
                offset: currentPage
            });

            return res;
        } catch (err) {
            console.log('GET Views By Page Error: ', err);
            throw Error('There was an error getting views by page');
        }
    }

    // Update

    async updateVisitCount() {
        const Op = Sequelize.Op;
        const TODAY_START = new Date().setHours(0, 0, 0, 0);
        const NOW = new Date();

        try {
            const visitCount = await Visit.findAndCountAll({
                where: {
                    createdAt: { 
                    [Op.gt]: TODAY_START,
                    [Op.lt]: NOW
                },
                },
            });
    
            if(visitCount.count === 0) {
                return this.create();
            } else {
                const newCount = visitCount.rows[0].dataValues.count + 1;
                const res = await Visit.update(
                    {
                        count: newCount
                    },
                    {
                        where: {
                            createdAt: { 
                            [Op.gt]: TODAY_START,
                            [Op.lt]: NOW
                        },
                        },
                    }
                );
                return res;
            }
        } catch (err) {
            throw Error('There was a problem creating or updating the visit count')
        }
    }
}

export default VisitRepository;