import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const router = express.Router();
const uploadCategory = multer({ dest: path.join(__dirname, '..', 'public', 'img', 'categories')});
const uploadIcon = multer({ dest: path.join(__dirname, '..', 'public', 'img', 'icons')});
const uploadLogo = multer({ dest: path.join(__dirname, '..', 'public', 'img', 'logos')});
const uploadProducts = multer({ dest: path.join(__dirname, '..', 'public', 'img', 'products')});
const uploadWelcome = multer({ dest: path.join(__dirname, '..', 'public', 'img', 'welcome')});

import { AdminTokenVerifier } from '../middleware/adminTokenVerifier.js';
import { HandleErrors } from '../middleware/errorHandler.js';

import CategoryController from '../controllers/CategoryController.js';
import ConfigurationController from '../controllers/ConfigurationController.js';
import MessageController from '../controllers/MessageController.js';
import InventoryController from '../controllers/InventoryController.js';
import OrderController from '../controllers/OrderController.js';
import ProductController from '../controllers/ProductController.js';
import RoleController from '../controllers/RoleController.js';
import UserController from '../controllers/UserController.js';
import VisitController from '../controllers/VisitController.js';
import WelcomeController from '../controllers/WelcomeController.js';

const categoryController = new CategoryController();
const configurationController = new ConfigurationController();
const messageController = new MessageController();
const inventoryController = new InventoryController();
const orderController = new OrderController();
const productController = new ProductController();
const roleController = new RoleController();
const visitController = new VisitController();
const userController = new UserController();
const welcomeController = new WelcomeController();


// Categories

router.get('/categories', AdminTokenVerifier, HandleErrors(categoryController.getCategoriesWithoutAssociations));

router.post('/categories', AdminTokenVerifier, uploadCategory.array('files'), HandleErrors(categoryController.create));

router.patch('/categories', AdminTokenVerifier, HandleErrors(categoryController.updateCategoryById));

router.delete('/categories', AdminTokenVerifier, HandleErrors(categoryController.deleteCategoryById));

// Configuration

router.get('/configuration', AdminTokenVerifier, HandleErrors(configurationController.getAdminConfiguration));

// Contact

router.get('/contact', AdminTokenVerifier, HandleErrors(messageController.getMessages));

// Inventory

router.get('/inventory', AdminTokenVerifier, HandleErrors(inventoryController.getInventory));

router.get('/inventory/:id', AdminTokenVerifier, HandleErrors(inventoryController.getByPK));

router.patch('/inventory', AdminTokenVerifier, HandleErrors(inventoryController.updateInventory));

router.delete('/inventory', AdminTokenVerifier, HandleErrors(inventoryController.deleteInventory));

// Orders

router.get('/orders', AdminTokenVerifier, HandleErrors(orderController.getOrders));
router.get('/orders/search/id/:id', AdminTokenVerifier, HandleErrors(orderController.getOrderId));
router.get('/orders/search/product-id/:productId', AdminTokenVerifier, HandleErrors(orderController.getOrdersByProductId));
router.get('/orders/search/ref-id/:refId', AdminTokenVerifier, HandleErrors(orderController.getOrdersByRefId));

router.patch('/orders', AdminTokenVerifier, HandleErrors(orderController.updateOrder));
router.patch('/orders/payment-link', AdminTokenVerifier, HandleErrors(orderController.paymentLink));
router.patch('/orders/ship', AdminTokenVerifier, HandleErrors(orderController.shipOrder));

// Products

router.get('/products', AdminTokenVerifier, (productController.getInventory));
router.get('/products/product-types', AdminTokenVerifier, (productController.getProductTypes));
router.get('/products/category/:id', AdminTokenVerifier, (productController.getProductsByCategoryId));

router.post('/products', AdminTokenVerifier, uploadProducts.array("files"), (productController.create));
router.post('/products/profiles', AdminTokenVerifier, uploadIcon.array("files"), HandleErrors(productController.createProductProfile));
router.patch('/products/images', AdminTokenVerifier, uploadProducts.array("files"), (productController.addProductImage));

router.patch('/products', AdminTokenVerifier, (productController.updateProduct));

router.delete('/products', AdminTokenVerifier, (productController.deleteProduct));

// Roles

router.post('/roles', AdminTokenVerifier, HandleErrors(roleController.create));

router.get('/roles', AdminTokenVerifier, HandleErrors(roleController.getRoles));

// Users

router.post('/admin', AdminTokenVerifier, HandleErrors(userController.createAdmin));
router.get('/admin', AdminTokenVerifier, HandleErrors(userController.getAdmin));

router.post('/employees', AdminTokenVerifier, HandleErrors(userController.createEmployee));
router.get('/employees', AdminTokenVerifier, HandleErrors(userController.getEmployees));

router.post('/customers', AdminTokenVerifier, HandleErrors(userController.adminCreateCustomer));
router.get('/customers', AdminTokenVerifier, HandleErrors(userController.getCustomers));

router.get('/users', AdminTokenVerifier, HandleErrors(userController.getUsers));
router.get('/user/:id', AdminTokenVerifier, HandleErrors(userController.getUserById));

// TODO make admin patch function
router.patch('/users', AdminTokenVerifier, HandleErrors(userController.updateUser));

router.delete('/users', AdminTokenVerifier, HandleErrors(userController.deleteUser));

// Visits

router.get('/visits', AdminTokenVerifier, HandleErrors(visitController.getVisits));

// Welcome

router.post('/welcome/images', AdminTokenVerifier, uploadWelcome.array('files'), HandleErrors(welcomeController.postWelcomeImage));

router.patch('/welcome/images', AdminTokenVerifier, HandleErrors(welcomeController.updateWelcomeImageById));

router.delete('/welcome/images/:id', AdminTokenVerifier, HandleErrors(welcomeController.deleteWelcomeImageById));
router.delete('/welcome/images', AdminTokenVerifier, HandleErrors(welcomeController.deleteImagesAndFilesById));

export default router;