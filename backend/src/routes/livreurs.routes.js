import express from 'express';
import { check, param, query } from 'express-validator';
import routes from '../../routes.js';


import checkAuthentication from '../middlewares/check.authentication.js';
import livreurController from '../controllers/livreurs.controller.js';
const router = express.Router();

router.use(checkAuthentication);
router.get('/get-livreurs-by-search', query('searchPattern').isString().default('').escape(), livreurController.getLivreursBySearch);
router.get(
	'/get-livreurs',
	[
		query('status').isString().escape(),
		query('searchPattern').isString().default('').escape(),
		query('direction').isString().default('DESC').escape(),
		query('skip').isInt().notEmpty().escape(),
		query('limit').isInt().default(10).notEmpty().escape(),
	],
	livreurController.getLivreurs
);

// router.patch('/switch-client-account-status/:cid', param('cid').isString().notEmpty().escape(), clientController.switchClientAccountStatus);

export default router;
