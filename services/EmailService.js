import sgMail from '@sendgrid/mail';

import { orderReceivedEmailTemplate } from '../config.js';

export default class EmailService {
    orderReceivedEmail = async ({ buyerEmail, refId}) => {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);

        const data = orderReceivedEmailTemplate({ refId });

        const msg = {
            to: buyerEmail,
            from: data.sellerEmail,
            subject: data.emailSubject,
            text: data.emailBody,
        }
        try {
            return await sgMail.send(msg);
        } catch (err) {
            console.log('Unable to send order received email. Error: ', err);
            throw new Error(`Order Received Email error: ${err}`);
        }
    }
}