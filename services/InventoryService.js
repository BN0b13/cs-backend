import { Op } from 'sequelize';

import { Inventory } from '../models/Associations.js';

export default class InventoryService {
    modifyInventory = async (ids) => {
        try {
            return await Inventory.update(
                {
                    available: false
                },
                {
                    where: {
                        id: {
                            [Op.in]: ids
                        }
                    }
                });
        } catch (err) {
            console.log('GET Product Error: ', err);
            throw Error('There was an error updating Inventory');
        }
    }
}