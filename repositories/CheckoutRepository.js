import { deliveryInsurance, shippingAndHandling } from '../config.js';

class CheckoutRepository {
    checkoutSetUp = () => {
        return {
            deliveryInsurance,
            shippingAndHandling
        }
    }
}

export default CheckoutRepository;