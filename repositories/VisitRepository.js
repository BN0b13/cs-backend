import { Sequelize } from 'sequelize';

import Visit from '../models/Visit.js';

class VisitRepository {


    // CREATE

    async create() {
        const params = {
            count: 1
        };

        try {
            const createVisit = await Visit.create(params);
            console.log('Visit Create res: ', createVisit);
            return createVisit;
        } catch (err) {
            console.log(err);
            throw Error('There was an error creating the new visit count');
        }
    }

    // READ

    async getVisits() {
        try {
            const getVisitsRes = await Visit.findAndCountAll({});
            console.log('Get Visit Messages Success: ', getVisitsRes);
            return getVisitsRes;
        } catch (err) {
            console.log('Get Visit Messages Error: ', err);
            throw Error('There was an error getting all roles');
        }
    }

    // Update

    async updateVisitCount() {
        const Op = Sequelize.Op;
        const TODAY_START = new Date().setHours(0, 0, 0, 0);
        const NOW = new Date();

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
            const updateTodaysCount = await Visit.update(
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
            return updateTodaysCount;
        }
    }
}

export default VisitRepository;