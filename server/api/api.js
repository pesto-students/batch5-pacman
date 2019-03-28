import express from 'express';

const router = express.Router();

router.use('/users', require('./user/routes'));

export default router;
