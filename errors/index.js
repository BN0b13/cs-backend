export class HttpError extends Error {
    code;
    data;
    constructor(message, code, data) {
      super(message);
      this.code = code;
      this.data = data;
    }
  }
  
  export class MissingRequestBodyError extends HttpError {
    constructor() {
      super('Missing Request Body', 400, undefined);
    }
  }
  export class InvalidJsonError extends HttpError {
    constructor() {
      super('Invalid Json', 400, undefined);
    }
  }
  export class UnauthorizedError extends HttpError {
    constructor() {
      super('Unauthorized', 401, undefined);
    }
  }
  
  export class TokenExpiredError extends HttpError {
    constructor() {
      super('Token Expired/Wrong, please re log in', 401, undefined);
    }
  }
  
  export class ModelNotFoundError extends HttpError {
    constructor(model, identifier, value) {
      super(`${model} not found with ${identifier}:${value}`, 404, undefined);
    }
  }
  export class InvalidRequestError extends HttpError {
    constructor(errors) {
      super('Invalid Request', 422, errors);
    }
  }
  
  
  
  
  
  