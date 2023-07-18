import ConfigurationRepository from '../repositories/ConfigurationRepository.js';

const configurationRepository = new ConfigurationRepository();

class ConfigurationController {

    // READ
    
    async getAdminConfiguration(req, res) {
        const data = await configurationRepository.getAdminConfiguration();
        res.send(data);
    }
    
    async getPublicConfiguration(req, res) {
        const data = await configurationRepository.getPublicConfiguration();
        res.send(data);
    }

    // UPDATE

    // async updateCategoryById(req, res) {
    //     const {
    //         id,
    //         name = null,
    //         description = null,
    //         image = null,
    //         status = null,
    //     } = req.body;

    //     const params = {
    //         name,
    //         description,
    //         image,
    //         status
    //     };

    //     Object.keys(params).forEach(param => params[param] == null && delete params[param]);

    //     const data = await configurationRepository.updateCategory(id, params);
    //     res.send(data);
    // }
}

export default ConfigurationController;