import jwt from 'jsonwebtoken';

import {
    UnauthorizedError,
    TokenExpiredError,
    ModelNotFoundError
} from '../errors/index.js';

import UserRepository from '../repositories/UserRepository.js';

const userRepository = new UserRepository();

export const TokenVerifier = async (req, res, next) => {
    const token = req.headers.authorization ? req.headers.authorization.replace('Bearer ', '') : false;

    if(!token) {
        const error = new UnauthorizedError();
        return res.status(error.code).json({ error });
    }

    let decoded;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        const error = new TokenExpiredError();
        return res.status(error.code).json({ error });
    }

    if(!decoded) {
        const error = new TokenExpiredError();
        return res.status(error.code).json({ error });
    }

    let checkUserExists;

    try {
        checkUserExists = await userRepository.getByPK(decoded.id);
    } catch (err) {
        const error = new ModelNotFoundError();
        return res.status(error.code).json({ error });
    }

    if(!checkUserExists) {
        const error = new ModelNotFoundError();
        return res.status(error.code).json({ error });
    }

    req['userData'] = decoded;

    return next();
}