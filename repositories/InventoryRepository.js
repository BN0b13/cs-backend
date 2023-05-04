import { Inventory } from '../models/Associations.js';

class InventoryRepository {

    // READ

    async getInventory() {
        try {
            const res = await Inventory.findAndCountAll({});
            return res;
        } catch (err) {
            console.log('Get Inventory Error: ', err);
            throw Error('There was an error getting inventory');
        }
    }

    async getByPK(id) {
        return await Inventory.findByPk(id);
    }
}

export default InventoryRepository;