import express from 'express';
import { check, param } from 'express-validator';

import checkAuthentication from '../middlewares/check.authentication.js';
import walletController from '../controllers/wallet.controller.js';
import moment from 'moment/moment.js';

const router = express.Router();

router.use(checkAuthentication);
router.patch('/actions/block/:wid', [param('wid').isInt().notEmpty().escape()], walletController.switchWallet);
router.post('/actions/credit/:wid', [param('wid').isInt().notEmpty().escape(), check('amount').isInt().notEmpty().escape()], walletController.creditWallet);
router.post('/actions/debit/:wid', [param('wid').isInt().notEmpty().escape(), check('amount').isInt().notEmpty().escape()], walletController.debitWallet);

export default router;
