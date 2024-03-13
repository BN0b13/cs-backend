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
        if(!id) {
            return {
                error: 'Invalid Giveaway ID'
            }
        }
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

        res.rows.map(giveaway => {
            giveaway.entries = giveaway.entries.length;
            giveaway.userId = null;
            giveaway.Company.userId = null;
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

        res.entries = res.entries.length;
        res.userId = null;
        res.Company.userId = null;

        if(res.status === 'completed') {
            const winnersNoUserData = res.winners.map(winner => ({
                    username: winner.username,
                    prize: winner.prize
                }));

            res.winners = winnersNoUserData;
            return res;
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

        if(userEntryStatus.length > 0) {
            return {
                error: 'User has already entered contest',
                entry: userEntryStatus
            }
        }

        return {
            success: 'User is able to enter contest'
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
        if(data.hasOwnProperty('status') && data.status === 'completed') {
            return await this.completeGiveawayAndDrawWinners(id);
        }

        let modifiedData = data;
        const getGiveaway = await Giveaway.findOne({
            where: {
                id
            }
        });

        if(getGiveaway.type !== 'manual' && getGiveaway.status !== 'created') {
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
        const nowUnix = new Date().getTime() + 5000;
        const pendingGiveaways = giveaways.filter(giveaway => giveaway.status === ('created'));
        const activeGiveaways = giveaways.filter(giveaway => giveaway.status === ('active'));

        if(pendingGiveaways.length > 0) {
            for(const giveaway of pendingGiveaways) {
                if(nowUnix >= giveaway.startDate) {
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
                if(nowUnix >= giveaway.expirationDate) {
                    console.log(`${giveaway.name} is ready to update status to completed.`);
                    await this.completeGiveawayAndDrawWinners(giveaway.id);
                }
            }
        }
    }

    async completeGiveawayAndDrawWinners(id) {
        const getGiveaway = await Giveaway.findOne({
            where: {
                id
            }
        });

        let winners = [];
        let winnerCount = 0;

        const shuffled = getGiveaway.entries.sort(() => 0.5 - Math.random());
        
        // getGiveaway.prizes.map(prize => {
        //     const res = shuffled.slice(winnerCount, prize.prizeWinnerLimit + winnerCount);
        //     res.forEach(winner => {
        //         winnerCount++;
        //         winners.push({
        //             ...winner,
        //             prize
        //         });
        //     });
        // });

        for(let prize of getGiveaway.prizes) {
            const res = shuffled.slice(winnerCount, prize.prizeWinnerLimit + winnerCount);
            for(let winner of res) {
                if(prize.prizeType === 'credit') {
                    const user = await User.findOne({
                        where: {
                            email: winner.email
                        }
                    });

                    const data = {
                        credit: user.credit + parseInt(prize.prize)
                    };

                    const updateRes = await User.update(
                        data,
                        {
                            where: {
                                id: user.id
                            }
                        }
                    );

                    console.log(`Adding $${prize.prize/100} credit to user id: ${user.id}, email: ${user.email}. Update result: `, updateRes);
                }

                winnerCount++;
                winners.push({
                    ...winner,
                    prize
                });
            }
        }

        const completedDate = new Date().getTime();

        const data = {
            winners,
            status: 'completed',
            completedDate
        }

        return await Giveaway.update(
            data,
            {
                where: {
                    id
                }
            }
        )
    }

    async enterUserIntoGiveaway(id, userId) {
        const getGiveaway = await Giveaway.findOne({
            where: {
                id
            }
        });

        if(getGiveaway.status === 'completed') {
            return {
                error: 'Giveaway is completed and can no longer be entered'
            }
        }

        if(getGiveaway.entries && getGiveaway.entries.filter(entry => entry.id === userId).length > 0) {
            return {
                error: `You have already entered giveaway ${getGiveaway.name}`
            }
        }

        if(getGiveaway.type === 'entryLimit' && getGiveaway.entries && getGiveaway.entries > getGiveaway.entryLimit) {
            return {
                error: `Giveaway ${getGiveaway.name} has reached entry limit`
            }
        }

        const getUser = await User.findOne({
            where: {
                id: userId
            }
        });

        const entries = [...getGiveaway.entries, {
            id: userId,
            username: getUser.username,
            email: getUser.email,
            enteredAt: new Date().getTime()
        }];

        if(getGiveaway.type === 'entryLimit' && getGiveaway.entries && entries.length === getGiveaway.entryLimit) {
            await Giveaway.update(
                {
                    entries
                },
                {
                    where: {
                        id
                    }
                }
            );

            return await this.completeGiveawayAndDrawWinners(id);
        }

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