import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
const router = express.Router();
const uploadIcon = multer({ dest: "public/img/icons/" });
const uploadLogo = multer({ dest: "public/img/logos/" });
const uploadProducts = multer({ dest: "public/img/products/" });
const uploadWelcome = multer({ dest: "public/img/welcome/" });

import { AdminTokenVerifier } from '../middleware/adminTokenVerifier.js';
import { HandleErrors } from '../middleware/errorHandler.js';

import CategoryController from '../controllers/CategoryController.js';
import ConfigurationController from '../controllers/ConfigurationController.js';
import ContactController from '../controllers/ContactController.js';
import InventoryController from '../controllers/InventoryController.js';
import OrderController from '../controllers/OrderController.js';
import ProductController from '../controllers/ProductController.js';
import RoleController from '../controllers/RoleController.js';
import UserController from '../controllers/UserController.js';
import VisitController from '../controllers/VisitController.js';
import WelcomeController from '../controllers/WelcomeController.js';

const categoryController = new CategoryController();
const configurationController = new ConfigurationController();
const contactController = new ContactController();
const inventoryController = new InventoryController();
const orderController = new OrderController();
const productController = new ProductController();
const roleController = new RoleController();
const visitController = new VisitController();
const userController = new UserController();
const welcomeController = new WelcomeController();


// Categories

router.get('/categories', AdminTokenVerifier, HandleErrors(categoryController.getCategoriesWithoutAssociations));

router.post('/categories', AdminTokenVerifier, HandleErrors(categoryController.create));

router.patch('/categories', AdminTokenVerifier, HandleErrors(categoryController.updateCategoryById));

router.delete('/categories', AdminTokenVerifier, HandleErrors(categoryController.deleteCategoryById));

// Configuration

router.get('/configuration', AdminTokenVerifier, HandleErrors(configurationController.getAdminConfiguration));

// Contact

router.get('/contact', AdminTokenVerifier, HandleErrors(contactController.getMessages));

// Inventory

router.get('/inventory', AdminTokenVerifier, HandleErrors(inventoryController.getInventory));

router.get('/inventory/:id', AdminTokenVerifier, HandleErrors(inventoryController.getByPK));

// Orders

router.get('/orders', AdminTokenVerifier, HandleErrors(orderController.getOrders));

// Products

router.get('/products', AdminTokenVerifier, (productController.getInventory));
router.get('/products/product-types', AdminTokenVerifier, (productController.getProductTypes));

router.post('/products', AdminTokenVerifier, uploadProducts.array("files"), (productController.create));
router.post('/products/flavor-profiles', AdminTokenVerifier, uploadIcon.array("files"), HandleErrors(productController.createFlavorProfile));

// Roles

router.post('/roles', AdminTokenVerifier, HandleErrors(roleController.create));

router.get('/roles', AdminTokenVerifier, HandleErrors(roleController.getRoles));

// Users

router.post('/admin', AdminTokenVerifier, HandleErrors(userController.createAdmin));
router.get('/admin', AdminTokenVerifier, HandleErrors(userController.getAdmin));

router.post('/employees', AdminTokenVerifier, HandleErrors(userController.createEmployee));
router.get('/employees', AdminTokenVerifier, HandleErrors(userController.getEmployees));

router.get('/customers', AdminTokenVerifier, HandleErrors(userController.getCustomers));

router.get('/users', AdminTokenVerifier, HandleErrors(userController.getUsers));
router.get('/user/:id', AdminTokenVerifier, HandleErrors(userController.getByPK));

// TODO make admin patch function
router.patch('/users', AdminTokenVerifier, HandleErrors(userController.updateUser));

router.delete('/users', AdminTokenVerifier, HandleErrors(userController.deleteUser));

// Visits

router.get('/visits', AdminTokenVerifier, HandleErrors(visitController.getVisits));

// Welcome

router.post('/welcome/images', AdminTokenVerifier, bodyParser.raw({ 'type': ['image/jpeg', 'image/png'], 'limit': '5mb'}), HandleErrors(welcomeController.postWelcomeImage));

router.patch('/welcome/images', AdminTokenVerifier, HandleErrors(welcomeController.updateWelcomeImageById));

router.delete('/welcome/images/:id', AdminTokenVerifier, HandleErrors(welcomeController.deleteWelcomeImageById));
router.delete('/welcome/images', AdminTokenVerifier, HandleErrors(welcomeController.deleteImagesAndFilesById));

export default router;