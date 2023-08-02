import InventoryRepository from '../repositories/InventoryRepository.js';

const inventoryRepository = new InventoryRepository();

class InventoryController {

    // READ
    
    async getInventory(req, res) {
        const data = await inventoryRepository.getInventory();
        res.send(data);
    }

    async getByPK(req, res) {
        const { id } = req.params;
        const data = await inventoryRepository.getByPK(id);
        res.send(data);
    }

    // UPDATE

    async updateInventory(req, res) {
        const {
            id,
            quantity = null,
            price= null,
            size = null,
            sizeDescription = null,
            sku = null,
            address = null,
            bay = null,
            available = null
        } = req.body;

        const params = {
            quantity,
            price,
            size,
            sizeDescription,
            sku,
            address,
            bay,
            available
        };

        Object.values(params).forEach(param => {
            if(param === null) {
                throw Error(`Missing ${params[param]} Param`);
            }
        });

        const data = await inventoryRepository.updateInventory(id, params);
        res.send(data);
    }

    // DELETE

    async deleteInventory(req, res) {
        const {
            id
        } = req.body;
        const data = await inventoryRepository.deleteInventoryById(id);
        res.send(data);
    }

}

export default InventoryController;