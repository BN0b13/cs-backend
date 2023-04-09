import VisitRepository from '../repositories/VisitRepository.js';

const visitRepository = new VisitRepository();

class VisitController {

    // READ
    
    async getVisits(req, res) {
        const data = await visitRepository.getVisits();
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