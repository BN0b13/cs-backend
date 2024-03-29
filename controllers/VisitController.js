import VisitRepository from '../repositories/VisitRepository.js';

const visitRepository = new VisitRepository();

class VisitController {

    // READ
    
    async getTotalVisitCount(req, res) {
        const data = await visitRepository.getTotalVisitCount();
        res.send(data);
    }
    
    async getVisits(req, res) {
        const data = await visitRepository.getVisits();
        res.send(data);
    }
    
    async getVisitsByDateRange(req, res) {
        const {
            start,
            end
        } = req.body;
        const data = await visitRepository.getVisitsByDateRange({ start, end });
        res.send(data);
    }

    async getVisitsByPage(req, res) {
        const { page, size } = req.query;
        const data = await visitRepository.getVisitsByPage(page, size);
        res.send(data);
    }

    // Update

    async updateVisitCount(req, res) {
        try {
            const data = await visitRepository.updateVisitCount();
            res.send(data);
        } catch (err) {
            res.send({
                status: 500,
                err,
                message: 'There was an error updating the visit count'
            });
        }
    }
}

export default VisitController;