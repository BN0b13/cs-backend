import ThemeRepository from '../repositories/ThemeRepository.js';
import ThemeService from '../services/ThemeService.js';

const themeRepository = new ThemeRepository();
const themeService = new ThemeService();

class ThemeController {

    // CREATE

    async create(req, res) {
        try {
            const {
                name,
                description,
                mainPrimary,
                DarkPrimary,
                LightPrimary,
                accentPrimary,
                svgPrimary,
                backgroundPrimary,
                backgroundOpacityDarkPrimary,
                backgroundOpacityLightPrimary,
                mainSecondary,
                DarkSecondary,
                LightSecondary,
                accentSecondary,
                svgSecondary,
                backgroundSecondary,
                backgroundOpacityDarkSecondary,
                backgroundOpacityLightSecondary,
                textPrimary,
                textPrimaryAccent,
                textSecondary,
                textSecondaryAccent,
                font,
                backgroundImageOn,
            } = req.body;
    
            const params = {
                name,
                description,
                mainPrimary,
                DarkPrimary,
                LightPrimary,
                accentPrimary,
                svgPrimary,
                backgroundPrimary,
                backgroundOpacityDarkPrimary,
                backgroundOpacityLightPrimary,
                mainSecondary,
                DarkSecondary,
                LightSecondary,
                accentSecondary,
                svgSecondary,
                backgroundSecondary,
                backgroundOpacityDarkSecondary,
                backgroundOpacityLightSecondary,
                textPrimary,
                textPrimaryAccent,
                textSecondary,
                textSecondaryAccent,
                font,
                backgroundImageOn,
                image: null
            }
    
            if(req.files ){ 
                params.image = req.files[0]
            }
    
            const data = await themeService.create(params);
            res.send(data);
        } catch (err) {
            console.log('There was and error posting Theme: ', err);
        }
    }

    // READ
    
    async getThemes(req, res) {
        const data = await themeRepository.getThemes();
        res.send(data);
    }
    
    async getTheme(req, res) {
        const data = await themeRepository.getTheme();
        res.send(data);
    }

    // // UPDATE

    async updateThemeColorScheme(req, res) {
        const {
            id,
            name,
            description,
            mainPrimary,
            DarkPrimary,
            LightPrimary,
            accentPrimary,
            svgPrimary,
            backgroundPrimary,
            backgroundOpacityDarkPrimary,
            backgroundOpacityLightPrimary,
            mainSecondary,
            DarkSecondary,
            LightSecondary,
            accentSecondary,
            svgSecondary,
            backgroundSecondary,
            backgroundOpacityDarkSecondary,
            backgroundOpacityLightSecondary,
            textPrimary,
            textPrimaryAccent,
            textSecondary,
            textSecondaryAccent
        } = req.body;

        const params = {
            name,
            description,
            mainPrimary,
            DarkPrimary,
            LightPrimary,
            accentPrimary,
            svgPrimary,
            backgroundPrimary,
            backgroundOpacityDarkPrimary,
            backgroundOpacityLightPrimary,
            mainSecondary,
            DarkSecondary,
            LightSecondary,
            accentSecondary,
            svgSecondary,
            backgroundSecondary,
            backgroundOpacityDarkSecondary,
            backgroundOpacityLightSecondary,
            textPrimary,
            textPrimaryAccent,
            textSecondary,
            textSecondaryAccent
        };

        const data = await themeService.updateThemeColorScheme(id, params);
        res.send(data);
    }

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