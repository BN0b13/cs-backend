import InventoryRepository from '../repositories/InventoryRepository.js';

const inventoryRepository = new InventoryRepository();

class InventoryController {

    // CREATE

    async create(req, res) {
        try {
        const {
            quantity
        } = req.body;

        const params = {
            quantity
        };

        const data = await inventoryRepository.create(params);

        console.log('Data res: ', data);

        res.send(data);
        } catch (err) {
            res.send({
                err,
                message: 'There was an error creating inventory'
            });
        }
    }

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