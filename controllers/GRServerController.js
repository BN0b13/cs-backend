import GRServerRepository from '../repositories/GRServerRepository.js';
import GRServerService from '../services/GRServerService.js';

const gRServerRepository = new GRServerRepository();
const gRServerService = new GRServerService();

class CartController {

    // READ
    
    async health(req, res) {
        const data = await gRServerRepository.health();
        res.send(data);
    }

    async getLogs(req, res) {
        const { 
            search = null, 
            page = 0, 
            size = 10,
            sortKey = 'createdAt',
            sortDirection = 'ASC'
        } = req.query;

        const params = {
            sortKey,
            sortDirection,
            page,
            size
        };

        const data = await gRServerRepository.getLogs(params);
        res.send(data);
    }

    async outletStatus(req, res) {
        const data = await gRServerService.outletStatus();
        res.send(data);
    }

    async cycleOutletOnOff(req, res) {
        const { 
            time 
        } = req.query;
        const data = await gRServerService.cycleOutletOnOff(time);
        res.send(data);
    }

    // DELETE

    async deleteLogById(req, res) {
        const {
            id
        } = req.params;
        const data = await gRServerRepository.deleteLogById(id);
        res.send(data);
    }
}

export default CartController;