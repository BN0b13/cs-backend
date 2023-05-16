import jwt from 'jsonwebtoken';

export default class AuthManagement {

    async createToken(data) {
        return jwt.sign(data, process.env.JWT_SECRET);
    }

    async verifyToken(token) {
        return jwt.verify(token, process.env.JWT_SECRET);
    }
}