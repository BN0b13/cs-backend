import express from 'express';
const router = express.Router();

import { TokenVerifier } from '../middleware/tokenVerifier.js';
import { HandleErrors } from '../middleware/errorHandler.js';

import UserController from '../controllers/UserController.js';
import ContactController from '../controllers/ContactController.js';
import OrderController from '../controllers/OrderController.js';
import ProductController from '../controllers/ProductController.js';
import VisitController from '../controllers/VisitController.js';

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

// Contact

router.post('/contact', TokenVerifier, HandleErrors(contactController.create));

// Orders

router.post('/orders', TokenVerifier, HandleErrors(orderController.create));

// Products

router.get('/products', (productController.getProducts));

router.get('/products/:id', (productController.getByPK));

// Users
router.post('/users', HandleErrors(userController.create));

router.get('/user', TokenVerifier, HandleErrors(userController.getUser));

router.patch('/user', TokenVerifier, HandleErrors(userController.updateUser));

// Visits

router.patch('/visits', HandleErrors(visitController.updateVisitCount));

export default router;