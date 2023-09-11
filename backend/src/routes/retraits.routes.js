import express from 'express';
import { check, param, query } from 'express-validator';

import checkAuthentication from '../middlewares/check.authentication.js';
import retraitController from '../controllers/retrait.controller.js';
import moment from 'moment/moment.js';
const router = express.Router();

router.use(checkAuthentication);
router.get(
	'/get-retraits/:wid',
	[
		param('wid').isString().notEmpty().escape(),
		query('skip').isInt().notEmpty().escape(),
		query('to').isDate().default().escape(moment().add(1, 'days').format('YYYY-MM-DD')),
		query('from').isDate().default(moment().subtract(7, 'd').format('YYYY-MM-DD')).escape(),
	],
	retraitController.getUserRetraits
);

export default router;
