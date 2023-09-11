import express from 'express';
import { check, param, query } from 'express-validator';
import routes from '../../routes.js';

import checkAuthentication from '../middlewares/check.authentication.js';
import { fileUpload } from '../middlewares/file-upload.js';
import moment from 'moment';
import orderController from '../controllers/order.controller.js';

const router = express.Router();

router.use(checkAuthentication);
router.get(
	'/get-orders',
	[
		query('orderStatus').isString().escape(),
		query('paymentMethod').isString().escape(),
		query('searchPattern').isString().default('null').escape(),
		query('searchPatternId').isString().default('null').escape(),
		// query('searchPatternMerchantNumber').isString().default('null').escape(),
		query('skip').isInt().notEmpty().escape(),
		query('from').isDate().default(moment().subtract(1, 'days').format('YYYY-MM-DD')).escape(),
		query('to').isDate().default(moment().add(1, 'days').format('YYYY-MM-DD')).escape(),
		query('minAmount').isNumeric().default(0).escape(),
		query('maxAmount').isNumeric().default(0).escape(),
	],
	orderController.getOrders
);

router.patch(
	'/set-order-status/:commandId/:livreurId',
	[param('commandId').isString().notEmpty().escape(), param('livreurId').isString().default('UNDEFINED').escape()],
	orderController.setOrderStatus
);

router.patch('/assign-livreur/:commandId/:livreurId', [param('commandId').isString().notEmpty().escape(), param('livreurId').isString().notEmpty().escape()], orderController.assignLivreur);

router.patch('/cancel-order/:commandId', param('commandId').isString().notEmpty().escape(), orderController.cancelOrder);

export default router;
