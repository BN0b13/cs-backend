import CheckoutRepository from "../repositories/CheckoutRepository.js";

const checkoutRepository = new CheckoutRepository();

class CheckoutController {
    async checkoutSetup(req, res) {
        const data = checkoutRepository.checkoutSetUp();
        res.send(data);
    }
}

export default CheckoutController;