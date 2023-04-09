import express from 'express';
const router = express.Router();

import { AdminTokenVerifier } from '../middleware/adminTokenVerifier.js';
import { HandleErrors } from '../middleware/errorHandler.js';

import UserController from '../controllers/UserController.js';
import ContactController from '../controllers/ContactController.js';
import InventoryController from '../controllers/InventoryController.js';
import OrderController from '../controllers/OrderController.js';
import ProductController from '../controllers/ProductController.js';
import RoleController from '../controllers/RoleController.js';
import VisitController from '../controllers/VisitController.js';

const userController = new UserController();
const contactController = new ContactController();
const inventoryController = new InventoryController();
const orderController = new OrderController();
const productController = new ProductController();
const roleController = new RoleController();
const visitController = new VisitController();

// Users

router.get('/users', AdminTokenVerifier, HandleErrors(userController.getUsers));

router.get('/user/:id', AdminTokenVerifier, HandleErrors(userController.getByPK));

// TODO make admin patch function
router.patch('/users', AdminTokenVerifier, HandleErrors(userController.updateUser));

router.delete('/users', AdminTokenVerifier, HandleErrors(userController.deleteUser));

// Contact

router.get('/contact', AdminTokenVerifier, HandleErrors(contactController.getMessages));

// Inventory

router.post('/inventory', AdminTokenVerifier, HandleErrors(inventoryController.create));

router.get('/inventory', AdminTokenVerifier, HandleErrors(inventoryController.getInventory));

router.get('/inventory/:id', AdminTokenVerifier, HandleErrors(inventoryController.getByPK));

// Orders

router.get('/orders', AdminTokenVerifier, HandleErrors(orderController.getOrders));

// Products

router.post('/products', AdminTokenVerifier, (productController.create));

// Roles

router.post('/roles', AdminTokenVerifier, HandleErrors(roleController.create));

router.get('/roles', AdminTokenVerifier, HandleErrors(roleController.getRoles));

// Visits

router.get('/visits', AdminTokenVerifier, HandleErrors(visitController.getVisits));

export default router;