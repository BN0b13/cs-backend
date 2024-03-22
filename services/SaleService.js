

import { Op } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

import { sequelize } from "../db.js";

import { Order } from '../models/Associations.js';

import InventoryRepository from '../repositories/InventoryRepository.js';
import SaleRepository from '../repositories/SaleRepository.js';

const inventoryRepository = new InventoryRepository();
const saleRepository = new SaleRepository();

export default class SaleService {

    updateOrderTotalWithActiveSales = async (products) => {
        console.log('Update Order Total with active sales: PRODUCTS: ', products);
        let total = 0;
        const orderProductsArray = [];

        for(let product in products) {
            const getInventory = await inventoryRepository.getInventoryById(products[product].inventoryId);
            console.log('GET Inventory res: ', res);
            total = total + getInventory.price;
            orderProductsArray.push({...products[product], price: getInventory.price});
        }
        const activeSales = await saleRepository.getActiveSales();

        if(activeSales.rows.length > 0) {
            if(activeSales.rows[0].type === 'bogo') {
            
                let productCount = 0;
                let discountAmountRemoved = 0;
    
                orderProductsArray.map(product => {
                    total = total + (product.quantity * product.price);
                    productCount = productCount + product.quantity;
                });
    
                const price = orderProductsArray[0].price;
                total = price * Math.floor(productCount/2);
                discountAmountRemoved = (price * productCount) - total;
                
                if(productCount%2 !== 0) {
                    total = total + price;
                    discountAmountRemoved = discountAmountRemoved - price;
                }
            }
        }
        
        return {
            total,
            saleId: activeSales.rows.length > 0 ? activeSales.rows[0].id : null
        };
    }

}