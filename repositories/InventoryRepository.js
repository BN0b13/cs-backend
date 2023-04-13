import { Inventory } from '../models/Associations.js';

class InventoryRepository {


    // CREATE

    async create(quantity) {
        const params = {
            quantity
        };

        console.log('Inventory quantity: ', quantity);

        try {
            const res = await Inventory.create(params);
            console.log('Inventory res: ', res);
            return res;
        } catch (err) {
            console.log('Create Inventory Error: '. err);
            throw Error('There was an error creating the new inventory');
        }
    }

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