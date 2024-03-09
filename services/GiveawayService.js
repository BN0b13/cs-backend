import { Op } from 'sequelize';

import { Giveaway, Company, User } from '../models/Associations.js';

export default class GiveawayService {

    // READ

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

    async getGiveaways(id) {
        const user = await User.findOne({
            where: {
                id
            }
        });
        if(user.roleId <= 2) {
            return await Giveaway.findAndCountAll();
        } else {
            return await Giveaway.findAndCountAll({
                where: {
                    userId: id
                }
            });
        }
    }

    async getGiveawayById(userId, id) {
        const user = await User.findOne({
            where: {
                id: userId
            }
        });


        const res = await Giveaway.findOne({
            where: {
                id
            }
        });

        if(!res) {
            return {
                error: 'Giveaway does not exist'
            };
        }

        if(user.roleId > 3 && user.id !== res.userId) {
            return {
                error: 'Giveaway does not belong to user'
            }
        }

        return res;
    }

    async getPublicGiveaways() {
        const res = await Giveaway.findAndCountAll({
            include: [
                {
                    model: Company
                }
            ]
        });
        const filteredResults = res.rows.filter(giveaway => giveaway.status !== 'created' || !giveaway.Company.active);
        return filteredResults;
    }

    async getPublicGiveawayById(id) {
        const res = await Giveaway.findOne({
            where: {
                id
            },
            include: [
                {
                    model: Company
                }
            ]
        });

        if(!res || res.status === 'created' || !res.Company.active) {
            return {
                error: 'Giveaway does not exist or is not active'
            }
        }

        return res;
    }

    async checkIfUserEnteredContest(id, userId) {
        const res = await Giveaway.findOne({
            where: {
                id
            }
        });

        if(!res.entries) {
            return {
                userEntryStatus: []
            }
        }

        const userEntryStatus = res.entries.filter(entry => entry.id === userId);

        return {
            userEntryStatus
        }
    }

    // CREATE

    async createGiveaway(data) {
        const getCompany = await Company.findOne({
            where: {
                id: data.companyId
            }
        });

        if(!getCompany) {
            return {
                error: 'Company does not exist. Unable to create Giveaway.'
            }
        }

        if(getCompany.userId !== data.userId) {
            return {
                error: 'Company does not belong to User. Unable to create Giveaway.'
            }
        }

        const params = {
            ...data,
            status: 'created'
        }

        return await Giveaway.create(params);
    }

    // UPDATE

    async updateGiveaway(id, data) {
        let modifiedData = data;
        const getGiveaway = await Giveaway.findOne({
            where: {
                id
            }
        });

        if(getGiveaway.type !== 'manual' && getGiveaway.status !== ('created')) {
            return {
                error: `Giveaway is ${getGiveaway.status} and unable to be updated.`
            }
        }

        if(getGiveaway.type === 'manual' && getGiveaway.status === 'active') {
            modifiedData = {
                status: data.status
            }
        }

        return await Giveaway.update(
            modifiedData,
            {
                where: {
                    id
                }
            }
        );
    }

    async handleScheduledGiveaways(giveaways) {
        const nowUnix = new Date().getTime();
        const pendingGiveaways = giveaways.filter(giveaway => giveaway.status === ('created'));
        const activeGiveaways = giveaways.filter(giveaway => giveaway.status === ('active'));

        if(pendingGiveaways.length > 0) {
            for(const giveaway of pendingGiveaways) {
                if(nowUnix > giveaway.startDate) {
                    console.log(`${giveaway.name} is ready to update status to active.`);
                    await Giveaway.update(
                        {
                            status: 'active'
                        },
                        {
                            where: {
                                id: giveaway.id
                            }
                        }
                    );
                }
            }
        }

        if(activeGiveaways.length > 0) {
            for(const giveaway of activeGiveaways) {
                if(nowUnix > giveaway.expirationDate) {
                    console.log(`${giveaway.name} is ready to update status to completed.`);
                    await Giveaway.update(
                        {
                            status: 'completed'
                        },
                        {
                            where: {
                                id: giveaway.id
                            }
                        }
                    );
                }
            }
        }
    }

    async enterUserIntoGiveaway(id, userId) {
        const getGiveaway = await Giveaway.findOne({
            where: {
                id
            }
        });

        // if(getGiveaway.entries && getGiveaway.entries.map(entry => entry.id === userId)) {
        //     return {
        //         error: `User has already entered giveaway ${getGiveaway.name}`
        //     }
        // }

        const getUser = await User.findOne({
            where: {
                id: userId
            }
        });

        const entries = [...getGiveaway.entries, {
            id: userId,
            username: getUser.username,
            email: getUser.email
        }];

        return await Giveaway.update(
            {
                entries
            },
            {
                where: {
                    id
                }
            }
        )
    }

    // DELETE

    async deleteGiveaway(id) {
        const getGiveaway = await Giveaway.findOne({
            where: {
                id
            }
        });

        if(!getGiveaway) {
            return {
                error: 'Giveaway does not exist, cannot delete.'
            }
        }

        if(getGiveaway.status !== 'created') {
            return {
                error: `Giveaway is ${getGiveaway.status} and unable to be deleted.`
            }
        }

        await Giveaway.destroy({
            where: {
                id
            }
        });

        return {
            status: 200,
            message: `${getGiveaway.name} was successfully deleted.`
        }
    }
}