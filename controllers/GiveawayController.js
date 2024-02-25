import GiveawayService from "../services/GiveawayService.js";

const giveawayService = new GiveawayService();

class GiveawayController {

    async getRandomSignUpsFromToday(req, res) {
        const { amount } = req.params;
        const data = await giveawayService.getRandomSignUpsFromToday(amount);
        res.send(data);
    }
}

export default GiveawayController;