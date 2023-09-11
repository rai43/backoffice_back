import { matchedData, validationResult } from 'express-validator';

import db from '../models/init-models.js';

const Transaction = db.transaction;
const Operation = db.operation;
const Wallet = db.wallet;
const sequelize = db.sequelize;

import walletService from '../services/wallet.service.js';
import operationTypeServices from '../services/operationType.service.js';
import moment from 'moment';
import generateUniqueReference from '../utils/generateReference.js';
import transactionTypeServices from '../services/transactionType.service.js';
import transactionServices from '../services/transaction.service.js';

const walletController = {
	switchWallet: async (req, res, next) => {
		const valResult = validationResult(req);
		if (!valResult.isEmpty()) {
			res.statusMessage = 'Invalid params passed';
			return res.sendStatus(400);
		}
		const requestData = matchedData(req);
		console.log(requestData);

		const wallet = requestData.wid;
		if (!wallet) {
			res.statusMessage = 'Wallet id not provided';
			return res.sendStatus(403);
		}

		let existingWallet;
		try {
			existingWallet = await walletService.findWallet({ id: wallet });
		} catch (error) {
			console.log(error.message);
			res.statusMessage = 'An error occured while crediting the account';
			return res.sendStatus(500);
		}

		if (!existingWallet) {
			res.statusMessage = 'Could not credit the account';
			return res.sendStatus(403);
		}

		try {
			const blockUpdateObj = {
				updated_at: new Date(),
				update_by: req.userData.userId,
				is_deleted: !existingWallet.is_deleted,
				deleted_by: req.userData.userId,
			};

			await existingWallet.update(blockUpdateObj);
			// saving the instance
			await existingWallet.save();
		} catch (error) {
			res.statusMessage = `Could not switch the wallet status`;
			return res.sendStatus(500);
		}

		return res.json({
			message: 'Successfully switched the wallet status',
			wallet: existingWallet,
		});
	},

	creditWallet: async (req, res, next) => {
		const valResult = validationResult(req);
		if (!valResult.isEmpty()) {
			res.statusMessage = 'Invalid params passed';
			return res.sendStatus(400);
		}
		const requestData = matchedData(req);
		console.log(requestData);

		const wallet = requestData.wid;
		const amount = parseInt(requestData.amount);

		if (!wallet) {
			res.statusMessage = 'Wallet id not provided';
			return res.sendStatus(403);
		}
		if (!amount || amount <= 0) {
			res.statusMessage = 'The provided amount should be greater than 0';
			return res.sendStatus(403);
		}

		let existingWallet;
		try {
			existingWallet = await walletService.findWallet({ id: wallet });
		} catch (error) {
			console.log(error.message);
			res.statusMessage = 'An error occured while crediting the account';
			return res.sendStatus(500);
		}

		if (!existingWallet) {
			res.statusMessage = 'Could not credit the account';
			return res.sendStatus(403);
		}

		let senderWallet;
		try {
			senderWallet = await walletService.findWallet({ id: 13058 });
		} catch (error) {
			console.log(error.message);
			res.statusMessage = 'An error occured while crediting the account';
			return res.sendStatus(500);
		}

		if (!senderWallet) {
			res.statusMessage = 'Could not credit the account';
			return res.sendStatus(403);
		}

		let creditOperationType;
		try {
			creditOperationType = await operationTypeServices.findOperationType({ code: 'CREDIT' });
		} catch (error) {
			console.log(error.message);
			res.statusMessage = 'An error occured while crediting the account';
			return res.sendStatus(500);
		}

		if (!creditOperationType) {
			res.statusMessage = 'Could not get the operation type';
			return res.sendStatus(403);
		}

		let debitOperationType;
		try {
			debitOperationType = await operationTypeServices.findOperationType({ code: 'DEBIT' });
		} catch (error) {
			console.log(error.message);
			res.statusMessage = 'An error occured while crediting the account';
			return res.sendStatus(500);
		}

		if (!debitOperationType) {
			res.statusMessage = 'Could not get the operation type';
			return res.sendStatus(403);
		}

		// TODO: fetch the rechargement type obj
		let rechargementType = 2;
		// try {
		// 	rechargementType = operationTypeServices.findOperationType({ code: 'RECHARGEMENT' });
		// } catch (error) {
		// 	console.log(error.message);
		// 	res.statusMessage = 'An error occured while crediting the account';
		// 	return res.sendStatus(500);
		// }

		// if (!rechargementType) {
		// 	res.statusMessage = 'Could not get the operation type';
		// 	return res.sendStatus(403);
		// }

		let transactionStatus = 1;

		let transactionType;
		try {
			transactionType = await transactionTypeServices.findTransactionType('RECHARGEMENT');
		} catch (error) {
			res.statusMessage = 'An error occured while crediting the account';
			return res.sendStatus(500);
		}

		if (!transactionType) {
			res.statusMessage = 'Could not get the operation type';
			return res.sendStatus(403);
		}

		try {
			const transactionObj = await sequelize.transaction(async (t) => {
				const transaction = await Transaction.create(
					{
						amount: amount,
						reference: generateUniqueReference(),
						sender_wallet_id: senderWallet.id,
						receiver_wallet_id: existingWallet.id,
						transaction_type_id: transactionType.id,
						transaction_status_id: transactionStatus,
						is_deleted: false,
					},
					{ transaction: t }
				);

				await Operation.create(
					{
						operation_type_id: creditOperationType.id,
						wallet_id: existingWallet.id,
						transaction_id: transaction.id,
						is_deleted: false,
					},
					{ transaction: t }
				);

				await Operation.create(
					{
						operation_type_id: debitOperationType.id,
						wallet_id: senderWallet.id,
						transaction_id: transaction.id,
						is_deleted: false,
					},
					{ transaction: t }
				);

				return transaction;
			});

			if (transactionObj?.id) {
				const creditUpdateObj = {
					balance: existingWallet.balance + amount,
					updated_at: new Date(),
					update_by: req.userData.userId,
				};

				const debitUpdateObj = {
					balance: senderWallet.balance - amount,
					updated_at: new Date(),
					update_by: req.userData.userId,
				};

				await existingWallet.update(creditUpdateObj);
				// saving the instance
				await existingWallet.save();

				await senderWallet.update(debitUpdateObj);
				// saving the instance
				await senderWallet.save();
			}

			return res.json({
				message: 'Successfully credited the account',
				transaction: await transactionServices.findUserTransactionForDisplay({ id: transactionObj.id }),
			});
		} catch (error) {
			// If the execution reaches this line, an error occurred.
			// The transaction has already been rolled back automatically by Sequelize!
			console.log(error.message);
			res.statusMessage = 'An error occured while crediting the account';
			return res.sendStatus(500);
		}
	},

	debitWallet: async (req, res, next) => {
		const valResult = validationResult(req);
		if (!valResult.isEmpty()) {
			res.statusMessage = 'Invalid params passed';
			return res.sendStatus(400);
		}
		const requestData = matchedData(req);

		const debitedWalletId = requestData.wid;
		const amount = parseInt(requestData.amount);

		if (!debitedWalletId) {
			res.statusMessage = 'Debit wallet id not provided';
			return res.sendStatus(403);
		}
		if (!amount || amount <= 0) {
			res.statusMessage = 'The provided amount should be greater than 0';
			return res.sendStatus(403);
		}

		let debitWallet;
		try {
			debitWallet = await walletService.findWallet({ id: debitedWalletId });
		} catch (error) {
			console.log(error.message);
			res.statusMessage = 'An error occured while crediting the account';
			return res.sendStatus(500);
		}

		if (!debitWallet) {
			res.statusMessage = 'Could not credit the account';
			return res.sendStatus(403);
		}

		let creditWallet;
		try {
			creditWallet = await walletService.findWallet({ id: 13058 });
		} catch (error) {
			console.log(error.message);
			res.statusMessage = 'An error occured while crediting the account';
			return res.sendStatus(500);
		}

		if (!creditWallet) {
			res.statusMessage = 'Could not credit the account';
			return res.sendStatus(403);
		}

		let creditOperationType;
		try {
			creditOperationType = await operationTypeServices.findOperationType({ code: 'DEBIT' });
		} catch (error) {
			console.log(error.message);
			res.statusMessage = 'An error occured while debiting the account';
			return res.sendStatus(500);
		}

		if (!creditOperationType) {
			res.statusMessage = 'Could not get the operation type';
			return res.sendStatus(403);
		}

		let debitOperationType;
		try {
			debitOperationType = await operationTypeServices.findOperationType({ code: 'DEBIT' });
		} catch (error) {
			console.log(error.message);
			res.statusMessage = 'An error occured while crediting the account';
			return res.sendStatus(500);
		}

		if (!debitOperationType) {
			res.statusMessage = 'Could not get the operation type';
			return res.sendStatus(403);
		}

		let transactionStatus = 1;

		let transactionType;
		try {
			transactionType = await transactionTypeServices.findTransactionType('TRANSFERT');
		} catch (error) {
			res.statusMessage = 'An error occured while debiting the account';
			return res.sendStatus(500);
		}

		if (!transactionType) {
			res.statusMessage = 'Could not get the operation type';
			return res.sendStatus(403);
		}

		try {
			const transactionObj = await sequelize.transaction(async (t) => {
				const transaction = await Transaction.create(
					{
						amount: amount,
						reference: generateUniqueReference(),
						sender_wallet_id: debitWallet.id,
						receiver_wallet_id: creditWallet.id,
						transaction_type_id: transactionType.id,
						transaction_status_id: transactionStatus,
						is_deleted: false,
					},
					{ transaction: t }
				);

				await Operation.create(
					{
						operation_type_id: debitOperationType.id,
						wallet_id: debitWallet.id,
						transaction_id: transaction.id,
						is_deleted: false,
					},
					{ transaction: t }
				);

				await Operation.create(
					{
						operation_type_id: creditOperationType.id,
						wallet_id: creditWallet.id,
						transaction_id: transaction.id,
						is_deleted: false,
					},
					{ transaction: t }
				);

				return transaction;
			});

			if (transactionObj?.id) {
				const debitUpdateObj = {
					balance: debitWallet.balance - amount,
					updated_at: new Date(),
					update_by: req.userData.userId,
				};

				const creditUpdateObj = {
					balance: creditWallet.balance + amount,
					updated_at: new Date(),
					update_by: req.userData.userId,
				};

				await debitWallet.update(debitUpdateObj);
				// saving the instance
				await debitWallet.save();

				// await creditWallet.update(creditWallet);
				await creditWallet.update(creditUpdateObj);
				// saving the instance
				await creditWallet.save();
			}

			return res.json({
				message: 'Successfully debited the account',
				transaction: await transactionServices.findUserTransactionForDisplay({ id: transactionObj.id }),
			});
		} catch (error) {
			// If the execution reaches this line, an error occurred.
			// The transaction has already been rolled back automatically by Sequelize!
			console.log(error.message);
			res.statusMessage = 'An error occured while crediting the account';
			return res.sendStatus(500);
		}
	},
};

export default walletController;
