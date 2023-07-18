import Configuration from '../models/Configuration.js';

class ConfigurationRepository {

    // READ

    async getAdminConfiguration() {
        try {
            const res = await Configuration.findAndCountAll();

            return res;
        } catch (err) {
            console.log('Get Categories Messages Error: ', err);
            throw Error('There was an error getting categories');
        }
    }

    async getPublicConfiguration() {
        try {
            const res = await Configuration.findAndCountAll();

            const data = {
                url: res.rows[0].url,
                companyName: res.rows[0].companyName,
                companyPhoneOn: res.rows[0].companyPhoneOn,
                companyEmailOn: res.rows[0].companyEmailOn,
                companyShippingAddressOn: res.rows[0].companyShippingAddressOn,
                customerServiceOn: res.rows[0].customerServiceOn,
                deliveryInsuranceOn: res.rows[0].deliveryInsuranceOn,
                ageVerifyOn: res.rows[0].ageVerifyOn
            }

            if(res.rows[0].companyPhoneOn) {
                data.companyPhone = res.rows[0].companyPhone;
                data.companyPhoneExt = res.rows[0].companyPhoneExt;
            }

            if(res.rows[0].companyEmailOn) {
                data.companyEmail = res.rows[0].companyEmail;
            }

            if(res.rows[0].companyShippingAddressOn) {
                data.companyShippingAddress = res.rows[0].companyShippingAddress;
            }

            if(res.rows[0].customerServiceOn) {
                data.customerServicePhone = res.rows[0].customerServicePhone;
                data.customerServicePhoneExt = res.rows[0].customerServicePhoneExt;
                data.customerServiceEmail = res.rows[0].customerServiceEmail;
            }

            if(res.rows[0].deliveryInsuranceOn) {
                data.deliveryInsuranceAmount = res.rows[0].deliveryInsuranceAmount;
                data.deliveryInsuranceDescription = res.rows[0].deliveryInsuranceDescription;
            }

            if(res.rows[0].ageVerifyOn) {
                data.ageVerifyAgeLimit = res.rows[0].ageVerifyAgeLimit;
            }

            return data;
        } catch (err) {
            console.log('Get Categories Messages Error: ', err);
            throw Error('There was an error getting categories');
        }
    }

    // UPDATE

    async updateCategory(id, data) {
        try {
            const res = await Configuration.update(
                data,
                {
                    where: {
                                id: id
                            }
                }
            );
            return res;
        } catch (err) {
            console.log('Update Category Error: ', err);
            throw Error('There was an error updating the category');
        }
    }
}

export default ConfigurationRepository;