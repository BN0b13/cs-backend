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

    async outletStatus(req, res) {
        const data = await gRServerService.outletStatus(time);
        res.send(data);
    }

    async cycleOutletOnOff(req, res) {
        const { time } = req.query;
        const data = await gRServerService.cycleOutletOnOff(time);
        res.send(data);
    }
}

export default CartController;