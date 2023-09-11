import express from 'express';
import { check, param, query } from 'express-validator';
import routes from '../../routes.js';

import checkAuthentication from '../middlewares/check.authentication.js';
import clientController from '../controllers/client.controller.js';
import { fileUpload } from '../middlewares/file-upload.js';

const router = express.Router();

router.use(checkAuthentication);
router.get(
	'/get-clients',
	[
		query('accountType').isString().escape(),
		query('status').isString().escape(),
		query('searchPattern').isString().default('').escape(),
		query('direction').isString().default('DESC').escape(),
		query('skip').isInt().notEmpty().escape(),
		query('limit').isInt().default(10).notEmpty().escape(),
	],
	clientController.getClients
);

router.patch('/switch-client-account-status/:cid', param('cid').isString().notEmpty().escape(), clientController.switchClientAccountStatus);
router.post('/create-client-account/:accountType', [param('accountType').isString().notEmpty().escape(), fileUpload.single('profile_picture')], clientController.createClientAccount);

export default router;
