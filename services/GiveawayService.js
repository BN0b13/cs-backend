import { Op } from 'sequelize';

import { User } from '../models/Associations.js';

export default class GiveawayService {

    async getRandomSignUpsFromToday(amount) {
        const TODAY_START = new Date().setHours(0, 0, 0, 0);
        const NOW = new Date();

        const getUsers = await User.findAll({
            where: {
                createdAt: { 
                    [Op.gt]: TODAY_START,
                    [Op.lt]: NOW
                }
            }
        });

        const shuffled = getUsers.sort(() => 0.5 - Math.random());
        let randomSignUps = shuffled.slice(0, amount);

        return {
            message: 'Get Random Sign Ups Result',
            amount,
            users: randomSignUps
        }
    }
}