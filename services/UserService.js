import * as bcrypt from 'bcrypt';

export default class UserService {
    async hashPassword(password) {
        const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPTSALT));
        return await bcrypt.hash(password, salt);
    }

    async verifyPassword(data, encrypted) {
        return await bcrypt.compare(data, encrypted);
    }
}