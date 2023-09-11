import express from 'express';
import { check, param, query } from 'express-validator';

import checkAuthentication from '../middlewares/check.authentication.js';
import rechargementsController from '../controllers/rechargements.controller.js';
import moment from 'moment/moment.js';
const router = express.Router();

router.use(checkAuthentication);
router.get(
	'/get-rechargements/:wid',
	[
		param('wid').isString().notEmpty().escape(),
		query('transactionType').isString().notEmpty().escape(),
		query('skip').isInt().notEmpty().escape(),
		query('to').isDate().default().escape(moment().add(1,'days').format('YYYY-MM-DD')),
		query('from').isDate().default(moment().subtract(7, 'd').format('YYYY-MM-DD')).escape(),
	],
	rechargementsController.getUserRechargements
);

export default router;
