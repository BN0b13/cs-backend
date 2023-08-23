import express from 'express';
const router = express.Router();

import { TokenVerifier } from '../middleware/tokenVerifier.js';
import { HandleErrors } from '../middleware/errorHandler.js';

import CartController from '../controllers/CartController.js';
import CategoryController from '../controllers/CategoryController.js';
import CheckoutController from '../controllers/CheckoutController.js';
import ConfigurationController from '../controllers/ConfigurationController.js';
import MessageController from '../controllers/MessageController.js';
import OrderController from '../controllers/OrderController.js';
import ProductController from '../controllers/ProductController.js';
import UserController from '../controllers/UserController.js';
import VisitController from '../controllers/VisitController.js';
import WelcomeController from '../controllers/WelcomeController.js';

const cartController = new CartController();
const categoryController = new CategoryController();
const checkoutController = new CheckoutController();
const configurationController = new ConfigurationController();
const messageController = new MessageController();
const orderController = new OrderController();
const productController = new ProductController();
const userController = new UserController();
const visitController = new VisitController();
const welcomeController = new WelcomeController();

router.get('/health', (req, res) => {
  res.send({
    status: 200,
    message: 'API is healthy and responding'
  });
});

// Cart

router.get('/cart', TokenVerifier, HandleErrors(cartController.getCart));

router.get('/cart/contents', TokenVerifier, HandleErrors(cartController.getCartContents));

router.patch('/cart', TokenVerifier, HandleErrors(cartController.patchCart));

// Categories

router.get('/categories', HandleErrors(categoryController.getCategories));
router.get('/categories/:id', HandleErrors(categoryController.getCategoryById));
router.get('/categories/name/:name', HandleErrors(categoryController.getCategoryByName));
router.get('/categories/type/:type', HandleErrors(categoryController.getCategoriesByType));

// Checkout

router.get('/checkout/set-up', TokenVerifier, HandleErrors(checkoutController.checkoutSetup));

// Configuration

router.get('/configuration', HandleErrors(configurationController.getPublicConfiguration));

// Contact

router.post('/contact', TokenVerifier, HandleErrors(messageController.create));

// Login

router.post('/login', HandleErrors(userController.login));

router.post('/login-admin', HandleErrors(userController.adminLogin));

// Orders

router.post('/orders', TokenVerifier, HandleErrors(orderController.create));

router.get('/orders', TokenVerifier, HandleErrors(orderController.getOrdersByUserId));

router.get('/orders/:refId', TokenVerifier, HandleErrors(orderController.getOrderByRef));

// Products

router.get('/products', HandleErrors(productController.getProducts));
router.get('/products/search/:keyword', HandleErrors(productController.searchProducts));
router.get('/products/:id', HandleErrors(productController.getById));
router.get('/products/type/:type', HandleErrors(productController.getProductsByType));
router.get('/products/profiles/all', HandleErrors(productController.getProductProfiles));
router.get('/products/profiles/search', HandleErrors(productController.getProductProfilesByIds));

// Users
router.post('/user', HandleErrors(userController.createCustomer));

router.post('/user/reset-password', HandleErrors(userController.initiatePasswordReset));

router.post('/user/reset-password/token', HandleErrors(userController.completePasswordReset));

router.get('/user/reset-password-token/verify/:token', HandleErrors(userController.verifyUserResetPasswordToken));

router.get('/user/email-token', TokenVerifier, HandleErrors(userController.sendEmailVerificationEmail));

router.get('/user/email-token/verify', TokenVerifier, HandleErrors(userController.verifyUserEmailToken));

router.patch('/user/update-password', TokenVerifier, HandleErrors(userController.updateAccountPassword));

router.post('/user/verify-email', HandleErrors(userController.verifyEmail));

router.get('/user/verify-email/:token', HandleErrors(userController.completeEmailVerification));

router.get('/user', TokenVerifier, HandleErrors(userController.getUser));

router.patch('/user', TokenVerifier, HandleErrors(userController.updateUser));

router.patch('/user/delete-account', TokenVerifier, HandleErrors(userController.deleteCustomer));

// Visits

router.patch('/visits', HandleErrors(visitController.updateVisitCount));

export default router;

// Welcome

router.get('/welcome/images', HandleErrors(welcomeController.getWelcomeImages));
router.get('/welcome/content', HandleErrors(welcomeController.getWelcomeContent));