import express from 'express';
import { check, param, query } from 'express-validator';

import checkAuthentication from '../middlewares/check.authentication.js';
import transactionController from '../controllers/transaction.controller.js';
import moment from 'moment/moment.js';
const router = express.Router();

router.use(checkAuthentication);
router.get(
	'/get-transactions',
	[
		query('transactionType').isString().notEmpty().escape(),
		query('searchPattern').isString().default('null').escape(),
		query('skip').isInt().notEmpty().escape(),
		query('to').isDate().default().escape(moment().add(1, 'days').format('YYYY-MM-DD')),
		query('from').isDate().default(moment().subtract(7, 'd').format('YYYY-MM-DD')).escape(),
		query('minAmount').isNumeric().default(0).escape(),
		query('maxAmount').isNumeric().default(0).escape(),
	],
	transactionController.getAllTransactions
);
router.get(
	'/get-transactions/:wid',
	[
		param('wid').isString().notEmpty().escape(),
		query('transactionType').isString().notEmpty().escape(),
		query('skip').isInt().notEmpty().escape(),
		query('to').isDate().default().escape(moment().add(1, 'days').format('YYYY-MM-DD')),
		query('from').isDate().default(moment().subtract(7, 'd').format('YYYY-MM-DD')).escape(),
	],
	transactionController.getUserTransactions
);

export default router;
