import CompanyRepository from "../repositories/CompanyRepository.js";
import CompanyService from "../services/CompanyService.js";

const companyRepository = new CompanyRepository();
const companyService = new CompanyService();

class CompanyController {

    // Read

    async getCompanies(req, res) {
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

        if(search === null) {
            const data = await companyRepository.getCompanies(params);
            return res.send(data);
        }

        params.search = search;

        const data = await companyService.searchCompanies(params);
        res.send(data);
    }

    async getCompany(req, res) {
        const { id } = req.userData;

        const data = await companyRepository.getCompanyByUserId(id);
        res.send(data);
    }

    async getCompanyById(req, res) {
        const { id } = req.params;
        const data = await companyService.getCompanyById(id);
        res.send(data);
    }

    // Create

    async createCompany(req, res) {
        const { id } = req.userData;
        try {
            const {
                name = null,
                bio = null,
                category = null,
                url = null,
                socials = null,
                vendor = null
            } = req.body;

            const requiredParams = {
                userId: id,
                name,
                bio
            };

            Object.values(requiredParams).forEach(param => {
                if(param === null) {
                    throw Error(`Company Creation Missing ${param} Param`);
                }
            });

            const optionalParams = {
                category,
                url,
                socials,
                vendor
            }

            Object.keys(optionalParams).forEach(param => optionalParams[param] == null && delete optionalParams[param]);

            const params = {
                ...requiredParams,
                ...optionalParams
            }

            const data = await companyService.createCompany(params);

            res.send(data);
        } catch (err) {
            res.send({
                err,
                message: 'There was an error creating Company'
            });
        }
    }

    async createCompanyLogo(req, res) {
        const {
            id
        } = req.body;

        const params = {
            id,
            image: req.files[0]
        };

        const data = await companyService.createCompanyLogo(params);

        res.send(data);
    }

    // Update

    async updateCompany(req, res) {
        const {
            id,
            name = null,
            bio = null,
            category = null,
            url = null,
            socials = null,
            vendor = null,
            active = null
        } = req.body;

        const params = {
            name,
            bio,
            category,
            url,
            socials,
            vendor,
            active
        };

        Object.keys(params).forEach(param => params[param] == null && delete params[param]);

        const data = await companyService.updateCompany(id, params);
        res.send(data);
    }

    // DELETE

    async deleteCompany(req, res) {
        const {
            id
        } = req.body;

        const data = await companyService.deleteCompany(id);
        res.send(data);
    }

    async deleteCompanyLogo(req, res) {
        const {
            id
        } = req.body;

        const data = await companyService.deleteCompanyLogo(id);
        res.send(data);
    }
}

export default CompanyController;