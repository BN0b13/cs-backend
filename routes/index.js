import express from 'express';
import publicRoutes from './public.js';
import adminRoutes from './admin.js';

const router = express.Router();

router.use('/', publicRoutes);

router.use('/admin', adminRoutes);

export default router;