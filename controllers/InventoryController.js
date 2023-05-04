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

}

export default InventoryController;