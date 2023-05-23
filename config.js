const companyName = 'Cosmic Strains';
const companyEmail = 'CosmicStrainsOfficial@gmail.com';

export const deliveryInsuranceAmount = 800;

export const shippingAndHandling = 1000;

export const orderReceivedEmailTemplate = ({ refId }) => {
    return {
        sellerEmail: companyEmail,
        emailSubject: `Order Received at  ${companyName}`,
        emailBody: `Hello! Your order at ${companyName} has been received. Reference: ${refId}. Once it has been shipped out, you will receive another email with the tracking information. Thank you for your purchase and we hope to see you again soon!`
    }
}

export const passwordResetEmailTemplate = ({ token }) => {
    return {
        sellerEmail: companyEmail,
        emailSubject: `${companyName} Password Reset`,
        emailBody: `Hello! The password reset process has been initiated on your account. Please click the link below to reset your password. If you did not initiate this process, please disregard this email and continue on using your normal password. 
        https://www.cosmicstrains.com/password-reset/${token}`
    }
}

export const verifyEmailTemplate = ({ token }) => {
    return {
        sellerEmail: companyEmail,
        emailSubject: `${companyName} Email Verification`,
        emailBody: `Hello! Please click on the link below to verify your ${companyName} account. Thank you for signing up with us and we hope to see you soon!  
        https://www.cosmicstrains.com/account/verify-email/${token}`
    }
}