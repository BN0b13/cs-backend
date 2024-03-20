import InventoryRepository from '../repositories/InventoryRepository.js';

const inventoryRepository = new InventoryRepository();

class InventoryController {

    // CREATE

    async createInventory(req, res) {
        const {
            productId = null,
            type = null,
            size = null,
            sizeDescription = null,
            price = null,
            quantity = null,
            sku = null,
            address = null,
            bay = null
        } = req.body;

        const requiredParams = {
            productId,
            type,
            size,
            sizeDescription,
            price,
            quantity,
            sku
        };

        Object.values(requiredParams).forEach(param => {
            if(param === null) {
                throw Error(`Missing ${requiredParams[param]} Param`);
            }
        });

        const params = {
            ...requiredParams,
            address,
            bay

        };

        const data = await inventoryRepository.createInventory(params);
        res.send(data);
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

    // UPDATE

    async updateInventory(req, res) {
        const {
            id,
            type = null,
            quantity = null,
            price= null,
            size = null,
            sizeDescription = null,
            sku = null,
            address = null,
            bay = null
        } = req.body;

        const params = {
            type,
            quantity,
            price,
            size,
            sizeDescription,
            sku,
            address,
            bay
        };

        Object.keys(params).forEach(param => params[param] == null && delete params[param]);

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