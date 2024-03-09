import GiveawayService from "../services/GiveawayService.js";

const giveawayService = new GiveawayService();

class GiveawayController {

    // Read

    async getRandomSignUpsFromToday(req, res) {
        const { amount } = req.params;
        const data = await giveawayService.getRandomSignUpsFromToday(amount);
        res.send(data);
    }

    async getGiveaways(req, res) {
        const { id } = req.userData;
        const data = await giveawayService.getGiveaways(id);
        res.send(data);
    }

    async getGiveawayById(req, res) {
        const { id } = req.userData;
        const { giveawayId } = req.params;
        const data = await giveawayService.getGiveawayById(id, giveawayId);
        res.send(data);
    }

    async getPublicGiveaways(req, res) {
        const data = await giveawayService.getPublicGiveaways();
        res.send(data);
    }

    async getPublicGiveawayById(req, res) {
        const { id } = req.params;
        const data = await giveawayService.getPublicGiveawayById(id);
        res.send(data);
    }

    async checkIfUserEnteredContest(req, res) {
        const { id } = req.userData;
        const { giveawayId } = req.body;
        const data = await giveawayService.checkIfUserEnteredContest(giveawayId, id);
        res.send(data);
    }

    // Create

    async createGiveaway(req, res) {
        const { id } = req.userData;
        try {
            const {
                companyId = null,
                name = null,
                description = null,
                rules = null,
                prizes = null,
                type = null,
                startDate = null,
                expirationDate = null,
                userLimit = null
            } = req.body;

            const requiredParams = {
                userId: id,
                companyId,
                name,
                description,
                prizes
            };

            Object.values(requiredParams).forEach(param => {
                if(param === null) {
                    throw Error(`Giveaway Creation Missing ${param} Param`);
                }
            });

            if(prizes.length < 1) {
                res.send({
                    error: 'Giveaway needs at least 1 prize.'
                });
                return;
            }

            const optionalParams = {
                rules,
                type,
                startDate,
                expirationDate,
                userLimit,
            }

            Object.keys(optionalParams).forEach(param => optionalParams[param] == null && delete optionalParams[param]);

            const params = {
                ...requiredParams,
                ...optionalParams,
                entries: []
            }

            const data = await giveawayService.createGiveaway(params);

            res.send(data);
        } catch (err) {
            res.send({
                err,
                message: 'There was an error creating giveaway'
            });
        }
    }

    // Update

    async updateGiveaway(req, res) {
        const {
            id,
            name = null,
            description = null,
            rules = null,
            prizes = null,
            type = null,
            startDate = null,
            expirationDate = null,
            userLimit = null,
            status = null
        } = req.body;

        const params = {
            name,
            description,
            rules,
            prizes,
            type,
            startDate,
            expirationDate,
            userLimit,
            status
        };

        Object.keys(params).forEach(param => params[param] == null && delete params[param]);

        const data = await giveawayService.updateGiveaway(id, params);
        res.send(data);
    }

    async enterUserIntoGiveaway(req, res) {
        const { id } = req.userData;
        const { giveawayId } = req.body;
        console.log('REQ Body: ', req.body);
        const data = await giveawayService.enterUserIntoGiveaway(giveawayId, id);
        res.send(data);
    }

    async deleteGiveaway(req, res) {
        const {
            id
        } = req.body;

        const data = await giveawayService.deleteGiveaway(id);
        res.send(data);
    }
}

export default GiveawayController;