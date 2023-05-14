const companyName = 'Cosmic Strains';
const companyEmail = 'CosmicStrainsOfficial@gmail.com';

export const deliveryInsuranceAmount = 1000;

export const orderReceivedEmailTemplate = ({ refId }) => {
    return {
        sellerEmail: companyEmail,
        emailSubject: `Order Received at  ${companyName}`,
        emailBody: `Hello! Your order at ${companyName} has been received. Reference: ${refId}. Once it has been shipped out, you will receive another email with the tracking information. Thank you for your purchase and we hope to see you again soon!`
    }
}