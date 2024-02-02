import SaleRepository from '../repositories/SaleRepository.js';

const saleRepository = new SaleRepository();

class SaleController {

    // CREATE

    async create(req, res) {
        try {
            console.log('CREATE Sale body: ', req.body);
            const {
                categoryId = null,
                productId = null,
                inventoryId = null,
                name = null,
                description = null,
                type = null,
                value = null,
                expirationDate = null,
                expirationType = null
            } = req.body;

            if(name === null || type === null) {
                throw new Error('Create Sale missing required field');
            }

            const params = {
                categoryId,
                productId,
                inventoryId,
                name,
                description,
                type,
                value,
                expirationDate,
                expirationType
            };

            Object.keys(params).forEach(param => params[param] == null && delete params[param]);

            const data = await saleRepository.create(params);

            res.send(data);
        } catch (err) {
            res.send({
                err,
                message: 'There was an error creating sale'
            });
        }
    }

    // READ
    
    async getSales(req, res) {
        const data = await saleRepository.getSales();
        res.send(data);
    }
    
    async getActiveSales(req, res) {
        const data = await saleRepository.getActiveSales();
        res.send(data);
    }
    
    async getSaleById(req, res) {
        const { id } = req.params;
        const data = await saleRepository.getSaleById(id);
        res.send(data);
    }

    // UPDATE

    async updateSale(req, res) {
        const {
            id,
            categoryId = null,
            productId = null,
            inventoryId = null,
            name = null,
            description = null,
            type = null,
            value = null,
            expirationDate = null,
            expirationType = null,
            count = null,
            active = null
        } = req.body;

        const params = {
            categoryId,
            productId,
            inventoryId,
            name,
            description,
            type,
            value,
            expirationDate,
            expirationType,
            count,
            active
        };

        Object.keys(params).forEach(param => params[param] == null && delete params[param]);

        const data = await saleRepository.updateSale(id, params);
        res.send(data);
    }

    async changeActivationStatus(req, res) {
        const {
            id
        } = req.body;

        const data = await saleRepository.changeActivationStatus(id);
        res.send(data);
    }
}

export default SaleController;