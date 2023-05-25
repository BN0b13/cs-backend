import CheckoutRepository from "../repositories/CheckoutRepository.js";

const checkoutRepository = new CheckoutRepository();

class CheckoutController {
    checkoutSetup = (req, res) => {
        const data = checkoutRepository.checkoutSetUp();
        res.send(data);
    }
}

export default CheckoutController;