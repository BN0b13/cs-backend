import { deliveryInsurance, shippingAndHandling } from '../config.js';

import SaleRepository from '../repositories/SaleRepository.js';

const saleRepository = new SaleRepository();

export default class CheckoutService {
    
    checkoutSetUp = async () => {
        const getSales = await saleRepository.getActiveSales();

        let data = {
            deliveryInsurance,
            shippingAndHandling
        }

        if (getSales.rows.length > 0) {
            data.sales = getSales.rows;
        }
        
        return data;
    }
}