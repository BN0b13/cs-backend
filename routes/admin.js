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
const uploadProducts = multer({ dest: path.join(__dirname, '..', 'public', 'img', 'products')});
const uploadThemes = multer({ dest: path.join(__dirname, '..', 'public', 'img', 'themes')});
const uploadWelcome = multer({ dest: path.join(__dirname, '..', 'public', 'img', 'welcome')});

import { AdminTokenVerifier } from '../middleware/adminTokenVerifier.js';
import { HandleErrors } from '../middleware/errorHandler.js';

import CartController from '../controllers/CartController.js';
import CategoryController from '../controllers/CategoryController.js';
import ConfigurationController from '../controllers/ConfigurationController.js';
import CouponController from '../controllers/CouponController.js';
import MessageController from '../controllers/MessageController.js';
import InventoryController from '../controllers/InventoryController.js';
import OrderController from '../controllers/OrderController.js';
import ProductController from '../controllers/ProductController.js';
import RoleController from '../controllers/RoleController.js';
import ThemeController from '../controllers/ThemeController.js';
import UserController from '../controllers/UserController.js';
import VisitController from '../controllers/VisitController.js';
import WelcomeController from '../controllers/WelcomeController.js';

const cartController = new CartController();
const categoryController = new CategoryController();
const configurationController = new ConfigurationController();
const messageController = new MessageController();
const couponController = new CouponController();
const inventoryController = new InventoryController();
const orderController = new OrderController();
const productController = new ProductController();
const roleController = new RoleController();
const themeController = new ThemeController();
const visitController = new VisitController();
const userController = new UserController();
const welcomeController = new WelcomeController();

// Carts

router.get('/carts', AdminTokenVerifier, HandleErrors(cartController.getCartsWithContents));

// Categories

router.get('/categories', AdminTokenVerifier, HandleErrors(categoryController.getCategoriesWithoutAssociations));

router.post('/categories', AdminTokenVerifier, uploadCategory.array('files'), HandleErrors(categoryController.create));

router.patch('/categories', AdminTokenVerifier, HandleErrors(categoryController.updateCategoryById));
router.patch('/categories/images/thumbnail', AdminTokenVerifier, uploadCategory.array('files'), HandleErrors(categoryController.addThumbnail));

router.delete('/categories', AdminTokenVerifier, HandleErrors(categoryController.deleteCategoryById));

// Configuration

router.get('/configuration', AdminTokenVerifier, HandleErrors(configurationController.getAdminConfiguration));

// Coupons

router.get('/coupons', AdminTokenVerifier, HandleErrors(couponController.getCoupons));
router.get('/coupons/:id', AdminTokenVerifier, HandleErrors(couponController.getCouponById));

router.post('/coupons', AdminTokenVerifier, HandleErrors(couponController.create));

router.patch('/coupons', AdminTokenVerifier, HandleErrors(couponController.updateCoupon));

// Inventory

router.get('/inventory', AdminTokenVerifier, HandleErrors(inventoryController.getInventory));

router.get('/inventory/:id', AdminTokenVerifier, HandleErrors(inventoryController.getByPK));

router.patch('/inventory', AdminTokenVerifier, HandleErrors(inventoryController.updateInventory));

router.delete('/inventory', AdminTokenVerifier, HandleErrors(inventoryController.deleteInventory));

// Login

router.post('/login', HandleErrors(userController.adminLogin));

// Messages

router.get('/messages', AdminTokenVerifier, HandleErrors(messageController.getMessages));
router.get('/messages/:id', AdminTokenVerifier, HandleErrors(messageController.getMessageById));

router.patch('/messages', AdminTokenVerifier, HandleErrors(messageController.updateMessage));

// Orders

router.get('/orders', AdminTokenVerifier, HandleErrors(orderController.getOrders));
router.get('/orders/search/id/:id', AdminTokenVerifier, HandleErrors(orderController.getOrderId));
router.get('/orders/search/product-id/:productId', AdminTokenVerifier, HandleErrors(orderController.getOrdersByProductId));
router.get('/orders/search/ref-id/:refId', AdminTokenVerifier, HandleErrors(orderController.getOrdersByRefId));

router.patch('/orders', AdminTokenVerifier, HandleErrors(orderController.updateOrder));
router.patch('/orders/payment-link', AdminTokenVerifier, HandleErrors(orderController.paymentLink));
router.patch('/orders/ship', AdminTokenVerifier, HandleErrors(orderController.shipOrder));

// Products

router.get('/products', AdminTokenVerifier, HandleErrors(productController.getInventory));
router.get('/products/product-types', AdminTokenVerifier, HandleErrors(productController.getProductTypes));
router.get('/products/category/:id', AdminTokenVerifier, HandleErrors(productController.getProductsByCategoryId));

router.post('/products', AdminTokenVerifier, uploadProducts.array("files"), HandleErrors(productController.create));
router.post('/products/profiles', AdminTokenVerifier, uploadIcon.array("files"), HandleErrors(productController.createProductProfile));
router.patch('/products/images', AdminTokenVerifier, uploadProducts.array("files"), HandleErrors(productController.addProductImage));

router.patch('/products', AdminTokenVerifier, HandleErrors(productController.updateProduct));

router.delete('/products', AdminTokenVerifier, HandleErrors(productController.deleteProduct));
router.delete('/products/product-image', AdminTokenVerifier, HandleErrors(productController.deleteProductImageById));

// Roles

router.post('/roles', AdminTokenVerifier, HandleErrors(roleController.create));

router.get('/roles', AdminTokenVerifier, HandleErrors(roleController.getRoles));

// Themes

router.post('/themes', AdminTokenVerifier, uploadThemes.array("files"), HandleErrors(themeController.create));

router.get('/themes', AdminTokenVerifier, HandleErrors(themeController.getThemes));

router.patch('/themes/colors', AdminTokenVerifier, HandleErrors(themeController.updateThemeColorScheme));

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
router.get('/visits/views', AdminTokenVerifier, HandleErrors(visitController.getTotalVisitCount));
router.get('/visits/pagination', AdminTokenVerifier, HandleErrors(visitController.getVisitsByPage));

// Welcome

router.post('/welcome/images', AdminTokenVerifier, uploadWelcome.array('files'), HandleErrors(welcomeController.postWelcomeImage));

router.patch('/welcome/images', AdminTokenVerifier, HandleErrors(welcomeController.updateWelcomeImageById));

router.delete('/welcome/images/:id', AdminTokenVerifier, HandleErrors(welcomeController.deleteWelcomeImageById));
router.delete('/welcome/images', AdminTokenVerifier, HandleErrors(welcomeController.deleteImagesAndFilesById));

export default router;