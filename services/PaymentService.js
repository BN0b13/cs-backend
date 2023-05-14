import { Client } from 'square';
import { v4 as uuidv4 } from 'uuid';

export default class PaymentService {
    processPayment = async ({ token, total }) => {
        const sourceId = token.token;

        const { paymentsApi } = new Client({
            accessToken: process.env.SQUARE_ACCESS_TOKEN,
            environment: process.env.SQUARE_ENVIRONMENT
        });

        const idempotencyKey = uuidv4();

        const { result } = await paymentsApi.createPayment({
            idempotencyKey,
            sourceId,
            amountMoney: {
                currency: 'USD',
                amount: total
            }
        });

        return result;
    }
}