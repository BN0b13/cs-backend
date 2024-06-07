import express from 'express';
import Bull from 'bull';

const router = express.Router();

import { TokenVerifier } from '../middleware/tokenVerifier.js';
import { HandleErrors } from '../middleware/errorHandler.js';

import CartController from '../controllers/CartController.js';
import CategoryController from '../controllers/CategoryController.js';
import CheckoutController from '../controllers/CheckoutController.js';
import ConfigurationController from '../controllers/ConfigurationController.js';
import GiveawayController from '../controllers/GiveawayController.js';
import MessageController from '../controllers/MessageController.js';
import OrderController from '../controllers/OrderController.js';
import ProductController from '../controllers/ProductController.js';
import SaleController from '../controllers/SaleController.js';
import ThemeController from '../controllers/ThemeController.js';
import UserController from '../controllers/UserController.js';
import VisitController from '../controllers/VisitController.js';
import WelcomeController from '../controllers/WelcomeController.js';

const cartController = new CartController();
const categoryController = new CategoryController();
const checkoutController = new CheckoutController();
const configurationController = new ConfigurationController();
const giveawayController = new GiveawayController();
const messageController = new MessageController();
const orderController = new OrderController();
const productController = new ProductController();
const saleController = new SaleController();
const themeController = new ThemeController();
const userController = new UserController();
const visitController = new VisitController();
const welcomeController = new WelcomeController();

const orderQueue = new Bull("order", {
  redis: "localhost:6379",
});

const giveawayQueue = new Bull("giveaway", {
  redis: "localhost:6379",
});

const createOrder = async (req, res) => {
  const {
    userId = req.userData.id,
    email,
    products,
    total,
    billingAddress,
    shippingAddress,
    shippingId,
    shippingTotal,
    deliveryInsurance,
    deliveryInsuranceTotal,
    couponId = null,
    saleId = null,
    paymentType,
    credit = null
  } = req.body;

  const params = {
    userId,
    email,
    products,
    total,
    billingAddress,
    shippingAddress,
    shippingId,
    shippingTotal,
    deliveryInsurance,
    deliveryInsuranceTotal,
    couponId,
    saleId,
    paymentType,
    credit
  };

  const data = await orderController.create(params);

  orderQueue.add({
    userId,
    email,
    orderRefId: data.refId
  });

  res.send(data);
}

router.get('/health', (req, res) => {
  res.send({
    status: 200,
    message: 'API is healthy and responding'
  });
});

// Account

router.get('/account/activate/:passwordToken', HandleErrors(userController.getUserByPasswordToken));

router.patch('/account/activate', HandleErrors(userController.activateAdminCreatedAccount));

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

// Giveaways

router.get('/giveaways', HandleErrors(giveawayController.getPublicGiveaways));
router.get('/giveaways/:id', HandleErrors(giveawayController.getPublicGiveawayById));

router.post('/giveaways/active/user-status', TokenVerifier, HandleErrors(giveawayController.checkIfUserEnteredContest));

router.patch('/giveaways/active/enter', TokenVerifier, HandleErrors(giveawayController.enterUserIntoGiveaway));

// Login

router.post('/login', HandleErrors(userController.login));

// Orders

router.post('/orders', TokenVerifier, HandleErrors(createOrder));

router.get('/orders', TokenVerifier, HandleErrors(orderController.getOrdersByUserId));

router.get('/orders/:refId', TokenVerifier, HandleErrors(orderController.getOrderByRef));

// Products

router.get('/products', HandleErrors(productController.getProducts));
router.get('/products/pagination', HandleErrors(productController.getProductsByPage));
router.get('/products/search', HandleErrors(productController.searchProducts));
router.get('/products/:id', HandleErrors(productController.getProductById));
router.get('/products/type/:type', HandleErrors(productController.getProductsByType));
router.get('/products/profiles/all', HandleErrors(productController.getProductProfiles));
router.get('/products/profiles/search', HandleErrors(productController.getProductProfilesByIds));

// Sales

router.get('/sales', HandleErrors(saleController.getActiveSales))

// Themes

router.get('/theme', HandleErrors(themeController.getTheme));

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

router.patch('/user', TokenVerifier, HandleErrors(userController.updateCustomer));

router.patch('/user/delete-account', TokenVerifier, HandleErrors(userController.deleteCustomer));

// Visits

router.patch('/visits', HandleErrors(visitController.updateVisitCount));

// Welcome

router.get('/welcome/images', HandleErrors(welcomeController.getWelcomeImages));
router.get('/welcome/content', HandleErrors(welcomeController.getWelcomeContent));

orderQueue.process(orderController.processOrder);
giveawayQueue.process(giveawayController.enterUserIntoGiveaway);

export default router;