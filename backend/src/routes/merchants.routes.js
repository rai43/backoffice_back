import express from 'express';
import { check, param, query } from 'express-validator';

import checkAuthentication from '../middlewares/check.authentication.js';
import merchantsController from '../controllers/merchants.controller.js';
const router = express.Router();

router.use(checkAuthentication);
router.get('/get-merchants-by-search', query('searchPattern').isString().default('').escape(), merchantsController.getMerchantsBySearch);
router.get(
	'/get-merchants',
	[
		query('status').isString().escape(),
		query('searchPattern').isString().default('').escape(),
		query('direction').isString().default('DESC').escape(),
		query('skip').isInt().notEmpty().escape(),
		query('limit').isInt().default(10).notEmpty().escape(),
	],
	merchantsController.getMerchants
);

// router.patch('/switch-client-account-status/:cid', param('cid').isString().notEmpty().escape(), clientController.switchClientAccountStatus);

export default router;
