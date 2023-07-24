import InventoryRepository from '../repositories/InventoryRepository.js';

const inventoryRepository = new InventoryRepository();

class InventoryController {

    // READ
    
    async getInventory(req, res) {
        console.log('Req: ', req);
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
            size = null,
            sku = null,
            address = null,
            bay = null,
            available = null
        } = req.body;

        const params = {
            quantity,
            size,
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