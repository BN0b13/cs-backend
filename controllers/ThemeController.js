import ThemeRepository from '../repositories/ThemeRepository.js';
import ThemeService from '../services/ThemeService.js';

const themeRepository = new ThemeRepository();
const themeService = new ThemeService();

class ThemeController {

    // CREATE

    async create(req, res) {
        const {
            name,
            description,
            colorPrimary,
            colorSecondary,
            textPrimary,
            textSecondary,
            backgroundColor,
            backgroundImageOn,
        } = req.body;

        const params = {
            name,
            description,
            colorPrimary,
            colorSecondary,
            textPrimary,
            textSecondary,
            backgroundColor,
            backgroundImageOn,
            image: req.files[0]
        }

        const data = await themeService.create(params);
        res.send(data);
    }

    async postBackgroundImage(req, res) {
        const {
            caption = '',
            link = '',
            position
        } = req.body;

        const params = {
            caption,
            link,
            position,
            image: req.files[0]
        }

        const data = await themeService.saveBackgroundImage(params);
        res.send(data);
    }

    // READ
    
    async getThemes(req, res) {
        const data = await themeRepository.getThemes();
        res.send(data);
    }

    // // UPDATE

    // async updateWelcomeImageById(req, res) {
    //     const {
    //         id,
    //         caption = null,
    //         link = null,
    //         position = null
    //     } = req.body;

    //     const params = {
    //         caption,
    //         link,
    //         position
    //     };

    //     Object.keys(params).forEach(param => params[param] == null && delete params[param]);

    //     const data = await welcomeRepository.updateWelcomeImageById(id, params);
    //     res.send(data);
    // }

    // // DELETE

    // async deleteWelcomeImageById(req, res) {
    //     const { id } = req.params;
    //     const data = await welcomeRepository.deleteWelcomeImageById(id);
    //     res.send(data);
    // }

    // async deleteImagesAndFilesById(req, res) {
    //     const { ids } = req.body;
    //     const data = await welcomeService.deleteImagesAndFilesById(ids);
    //     res.send(data);
    // }

}

export default ThemeController;