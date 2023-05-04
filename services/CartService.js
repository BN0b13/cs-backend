import { Cart } from '../models/Associations.js';

export const cartCreate = async ({ userId }) => {
    await Cart.create({ userId });
}