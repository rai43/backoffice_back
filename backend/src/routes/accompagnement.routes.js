import express from 'express';
import { check, param, query } from 'express-validator';

import checkAuthentication from '../middlewares/check.authentication.js';
import accompagnementsController from '../controllers/accompagnements.controller.js';
const router = express.Router();

router.use(checkAuthentication);

router.post('/save-accompagnement', [check('name').isString().notEmpty().escape(), check('merchant_id').isInt().notEmpty().escape()], accompagnementsController.saveAccompagnement);
router.post(
	'/edit-accompagnement/:id',
	[param('id').isString().escape(), check('name').isString().notEmpty().escape(), check('action').isString().notEmpty().escape()],
	accompagnementsController.editAccompagnement
);

export default router;
