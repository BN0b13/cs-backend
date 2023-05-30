export const passwordValidation = (password) => {
    const minNumChars = 8;
    const maxNumChars = 30;
    const regularExpression  = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,30}$/;
    if(password.length < minNumChars || 
      password.length > maxNumChars ||
      !regularExpression.test(password)){
      return false;
    }
    return true;
  }