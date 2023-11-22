import sgMail from '@sendgrid/mail';

import EmailTemplates from '../templates/EmailTemplates.js';

const emailTemplates = new EmailTemplates();

export default class EmailService {
    orderReceivedEmail = async ({ buyerEmail, refId }) => {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);

        const data = emailTemplates.orderReceivedEmailTemplate({ refId });

        const msg = {
            to: buyerEmail,
            from: data.sellerEmail,
            subject: data.emailSubject,
            text: data.emailBody,
            html: data.html
        }

        const adminMsg = {
            to: data.sellerEmail,
            from: data.sellerEmail,
            subject: data.emailSubject,
            text: data.emailBody,
            html: data.html
        }

        try {
            await sgMail.send(adminMsg);

            return await sgMail.send(msg);
        } catch (err) {
            console.log('Unable to send order received email. Error: ', err);
            throw new Error(`Order Received Email error: ${err}`);
        }
    }

    sendPaymentLink = async ({ buyerEmail, refId, paymentLink }) => {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);

        const data = emailTemplates.paymentLinkEmailTemplate({ refId, paymentLink });

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

    orderShippedEmail = async ({ buyerEmail, refId, tracking }) => {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);

        const data = emailTemplates.orderShippedEmailTemplate({ refId, tracking });

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

        const data = emailTemplates.passwordResetEmailTemplate({ token });

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

        const data = emailTemplates.verifyEmailTemplate({ token });

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