import { Sale } from '../models/Associations.js';

class SaleRepository {


    // CREATE

    async create(params) {

        const data = {
            ...params,
            count: 0,
            active: false
        };

        try {
            const res = await Sale.create(data);
            return {
                status: 201,
                message: 'Sale created.',
                response: res
            };
        } catch (err) {
            console.log(err);
            throw Error('There was an error creating the Sale');
        }
    }

    // READ

    async getSales() {
        try {
            const res = await Sale.findAndCountAll({});
            return res;
        } catch (err) {
            console.log('Get Sales Error: ', err);
            throw Error('There was an error getting the Sales');
        }
    }

    async getSaleById(id) {
        try {
            const res = await Sale.findOne({
                where: {
                    id
                }
            });
            return res;
        } catch (err) {
            console.log('Get Sales Error: ', err);
            throw Error('There was an error getting the Sales');
        }
    }

    async getActiveSales() {
        try {
            const res = await Sale.findAndCountAll({
                where: {
                    active: true
                }
            });
            
            return res;
        } catch (err) {
            console.log('Get Sales Error: ', err);
            throw Error('There was an error getting the Sales');
        }
    }

    async getSaleById(id) {
        try {
            const res = await Sale.findAll(
                {
                    where: {
                        id: id
                    }
                }
            );
            return res;
        } catch (err) {
            console.log('Get Sale by id Error: ', err);
            throw Error('There was an error getting the Sale by id');
        }
    }

    // UPDATE 

    async updateSale(id, data) {
        try {
            const res = await Sale.update(
                data,
                {
                    where: {
                                id: id
                            }
                }
            );
            return res;
        } catch (err) {
            console.log('Update Sale Error: ', err);
            throw Error('There was an error updating the Sale');
        }
    }

    async changeActivationStatus(id) {
        try {
            const sale = await this.getSaleById(id);

            const res = await Sale.update(
                {
                    active: !sale[0].active
                },
                {
                    where: {
                                id: id
                            }
                }
            );
            return res;
        } catch (err) {
            console.log('Update Sale Error: ', err);
            throw Error('There was an error updating the Sale');
        }
    }
}

export default SaleRepository;