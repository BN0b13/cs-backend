import express from 'express';
const router = express.Router();

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

router.post('/login', (req, res) => userController.login(req, res));

// Users
router.post('/users', (req, res) => userController.create(req, res));

router.get('/users', (req, res) => userController.getUsers(req, res));

router.get('/user/:id', (req, res) => userController.getByPK(req, res));

router.patch('/users', (req, res) => userController.updateUser(req, res));

router.delete('/users', (req, res) => userController.deleteUser(req, res));

// Contact

router.post('/contact', (req, res) => contactController.create(req, res));

router.get('/contact', (req, res) => contactController.getMessages(req, res));

// Roles

router.post('/roles', (req, res) => roleController.create(req, res));

router.get('/roles', (req, res) => roleController.getRoles(req, res));

// Products

router.post('/products', (req, res) => productController.create(req, res));

router.get('/products', (req, res) => productController.getProducts(req, res));

router.get('/products/:id', (req, res) => productController.getByPK(req, res));

// Inventory

router.post('/inventory', (req, res) => inventoryController.create(req, res));

router.get('/inventory', (req, res) => inventoryController.getInventory(req, res));

router.get('/inventory/:id', (req, res) => inventoryController.getByPK(req, res));

export default router;