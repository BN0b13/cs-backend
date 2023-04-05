import express from 'express';
const router = express.Router();

import UserController from '../controllers/UserController.js';

const userController = new UserController();

router.get('/health', (req, res) => {
  res.send({
    status: 200,
    message: 'API is healthy and responding'
  });
});

// Users
router.get('/users', (req, res) => userController.getUsers(req, res));

router.post('/users', (req, res) => userController.create(req, res));

router.get('/user:id', (req, res) => userController.getByPK(req, res));

export default router;