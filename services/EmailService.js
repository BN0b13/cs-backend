import sgMail from '@sendgrid/mail';

import {
    orderReceivedEmailTemplate,
    passwordResetEmailTemplate,
    verifyEmailTemplate
} from '../config.js';

export default class EmailService {
    orderReceivedEmail = async ({ buyerEmail, refId }) => {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);

        const data = orderReceivedEmailTemplate({ refId });

        const msg = {
            to: buyerEmail,
            from: data.sellerEmail,
            subject: data.emailSubject,
            text: data.emailBody,
            html: data.html
        }
        try {
            return await sgMail.send(msg);
        } catch (err) {
            console.log('Unable to send order received email. Error: ', err);
            throw new Error(`Order Received Email error: ${err}`);
        }
    }

    passwordReset = async ({ email, token }) => {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);

        const data = passwordResetEmailTemplate({ token });

        const msg = {
            to: email,
            from: data.sellerEmail,
            subject: data.emailSubject,
            text: data.emailBody,
            html: data.html
        }
        try {
            return await sgMail.send(msg);
        } catch (err) {
            console.log('Unable to send order received email. Error: ', err);
            throw new Error(`Order Received Email error: ${err}`);
        }
    }

    verifyEmail = async ({ email, token }) => {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);

        const data = verifyEmailTemplate({ token });

        const msg = {
            to: email,
            from: data.sellerEmail,
            subject: data.emailSubject,
            text: data.emailBody,
            html: data.html
        }
        try {
            return await sgMail.send(msg);
        } catch (err) {
            console.log('Unable to send order received email. Error: ', err);
            throw new Error(`Order Received Email error: ${err}`);
        }
    }
}