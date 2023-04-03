import bcrypt from 'bcrypt';

export default class UserService {
    async hashPassword(password) {
        const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPTSALT));
        return await bcrypt.hash(password, salt);
    }
}