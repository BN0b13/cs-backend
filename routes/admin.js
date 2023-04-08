import express from 'express';
const router = express.Router();

import { AdminTokenVerifier } from '../middleware/adminTokenVerifier.js';
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

// Users

router.get('/users', AdminTokenVerifier, HandleErrors(userController.getUsers));

router.get('/user/:id', AdminTokenVerifier, HandleErrors(userController.getByPK));

// TODO make admin patch function
router.patch('/users', AdminTokenVerifier, HandleErrors(userController.updateUser));

router.delete('/users', AdminTokenVerifier, HandleErrors(userController.deleteUser));

// Contact

router.get('/contact', AdminTokenVerifier, HandleErrors(contactController.getMessages));

// Roles

router.post('/roles', AdminTokenVerifier, HandleErrors(roleController.create));

router.get('/roles', AdminTokenVerifier, HandleErrors(roleController.getRoles));

// Products

router.post('/products', AdminTokenVerifier, (productController.create));

// Inventory

router.post('/inventory', AdminTokenVerifier, HandleErrors(inventoryController.create));

router.get('/inventory', AdminTokenVerifier, HandleErrors(inventoryController.getInventory));

router.get('/inventory/:id', AdminTokenVerifier, HandleErrors(inventoryController.getByPK));

export default router;