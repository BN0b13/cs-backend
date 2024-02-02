import CheckoutService from "../services/CheckoutService.js";

const checkoutService = new CheckoutService();

class CheckoutController {
    async checkoutSetup(req, res) {
        const data = await checkoutService.checkoutSetUp();
        res.send(data);
    }
}

export default CheckoutController;