import express from 'express';
const router = express.Router();

import { TokenVerifier } from '../middleware/tokenVerifier.js';
import { HandleErrors } from '../middleware/errorHandler.js';

import UserController from '../controllers/UserController.js';
import ContactController from '../controllers/ContactController.js';
import InventoryController from '../controllers/InventoryController.js';
import RoleController from '../controllers/RoleController.js';
import ProductController from '../controllers/ProductController.js';

const userController = new UserController();
const contactController = new ContactController();
const inventoryController = new InventoryController();
const roleController = new RoleController();
const productController = new ProductController();

router.get('/health', (req, res) => {
  res.send({
    status: 200,
    message: 'API is healthy and responding'
  });
});

// Login

router.post('/login', HandleErrors(userController.login));

// Users
router.post('/users', HandleErrors(userController.create));

router.patch('/users', TokenVerifier, HandleErrors(userController.updateUser));

// Contact

router.post('/contact', TokenVerifier, HandleErrors(contactController.create));

// Products

router.get('/products', (productController.getProducts));

router.get('/products/:id', (productController.getByPK));

export default router;