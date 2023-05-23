import express from 'express';
const router = express.Router();

import { TokenVerifier } from '../middleware/tokenVerifier.js';
import { HandleErrors } from '../middleware/errorHandler.js';

import CartController from '../controllers/CartController.js';
import CategoryController from '../controllers/CategoryController.js';
import UserController from '../controllers/UserController.js';
import ContactController from '../controllers/ContactController.js';
import OrderController from '../controllers/OrderController.js';
import ProductController from '../controllers/ProductController.js';
import VisitController from '../controllers/VisitController.js';

const cartController = new CartController();
const categoryController = new CategoryController();
const userController = new UserController();
const contactController = new ContactController();
const orderController = new OrderController();
const productController = new ProductController();
const visitController = new VisitController();

router.get('/health', (req, res) => {
  res.send({
    status: 200,
    message: 'API is healthy and responding'
  });
});

// Login

router.post('/login', HandleErrors(userController.login));

router.post('/login-admin', HandleErrors(userController.adminLogin));

// Cart

router.get('/cart', TokenVerifier, HandleErrors(cartController.getCart));

router.get('/cart/contents', TokenVerifier, HandleErrors(cartController.getCartContents));

router.patch('/cart', TokenVerifier, HandleErrors(cartController.patchCart));

// Categories

router.get('/categories', HandleErrors(categoryController.getCategories));

// Contact

router.post('/contact', TokenVerifier, HandleErrors(contactController.create));

// Orders

router.post('/orders', TokenVerifier, HandleErrors(orderController.create));

router.get('/orders', TokenVerifier, HandleErrors(orderController.getOrdersById));

router.get('/orders/:refId', TokenVerifier, HandleErrors(orderController.getOrderByRef));

router.get('/orders/shipping/delivery-insurance', TokenVerifier, HandleErrors(orderController.getDeliveryInsuranceAmount));

// Products

router.get('/products', HandleErrors(productController.getProducts));

router.get('/products/:id', HandleErrors(productController.getById));

// Users
router.post('/user', HandleErrors(userController.createCustomer));

router.post('/user/reset-password', HandleErrors(userController.initiatePasswordReset));

router.post('/user/reset-password/token', HandleErrors(userController.completePasswordReset));

router.post('/user/verify-email', HandleErrors(userController.verifyEmail));

router.get('/user/verify-email/:token', HandleErrors(userController.completeEmailVerification));

router.get('/user', TokenVerifier, HandleErrors(userController.getUser));

router.patch('/user', TokenVerifier, HandleErrors(userController.updateUser));

// Visits

router.patch('/visits', HandleErrors(visitController.updateVisitCount));

export default router;