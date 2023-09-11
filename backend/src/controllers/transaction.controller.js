import { matchedData, validationResult } from 'express-validator';

import userTypeService from '../services/userType.service.js';
import transactionServices from '../services/transaction.service.js';
import { response } from 'express';

const transactionController = {
	getAllTransactions: async (req, res, next) => {
		const valResult = validationResult(req);
		if (!valResult.isEmpty()) {
			res.statusMessage = 'Invalid params passed';
			return res.sendStatus(400);
		}
		const requestData = matchedData(req);
		console.log('requestData', requestData);

		const MIN_AMOUNT = parseInt(requestData.minAmount);
		const MAX_AMOUNT = parseInt(requestData.maxAmount);
		const FROM = requestData.from;
		const TO = requestData.to;
		const TRANSACTION_TYPE = requestData.transactionType;
		const SEARCH_PATTERN = requestData.searchPattern || 'null';
		const SKIP = requestData.skip;

		let fetchedTransactions, count;

		try {
			({ fetchedTransactions, count } = await transactionServices.findAllTransactions(MIN_AMOUNT, MAX_AMOUNT, FROM, TO, TRANSACTION_TYPE, SKIP, SEARCH_PATTERN));
		} catch (e) {
			console.log(e.message);
			res.statusMessage = 'Could not fetch the transactions list';
			return res.sendStatus(500);
		}

		if (!fetchedTransactions) {
			res.statusMessage = 'Could not fetch the transactions list';
			return res.sendStatus(500);
		}

		return res.json({
			message: 'Successfully fetch the transactions list',
			transactions: fetchedTransactions,
			skip: parseInt(SKIP) + (fetchedTransactions.length || 0),
			totalCount: count,
		});
	},

	getUserTransactions: async (req, res, next) => {
		const valResult = validationResult(req);
		if (!valResult.isEmpty()) {
			console.log(valResult);
			res.statusMessage = 'Invalid params passed';
			return res.sendStatus(400);
		}
		const requestData = matchedData(req);
		console.log('requestData', requestData);

		const WALLET_ID = requestData.wid;
		const FROM = requestData.from;
		const TO = requestData.to;
		const TRANSACTION_TYPE = requestData.transactionType;
		const SKIP = requestData.skip;

		let fetchedTransactions, count;

		try {
			({ fetchedTransactions, count } = await transactionServices.findUserTransactionsAndGroupByDay(WALLET_ID, FROM, TO, TRANSACTION_TYPE, SKIP));
		} catch (e) {
			console.log(e.message);
			res.statusMessage = 'Could not fetch the client transactions';
			return res.sendStatus(500);
		}

		if (!fetchedTransactions) {
			res.statusMessage = 'Could not fetch the client transactions';
			return res.sendStatus(500);
		}

		return res.json({
			message: 'Successfully fetch the client transactions',
			transactions: fetchedTransactions,
			skip: parseInt(SKIP) + (fetchedTransactions.length || 0),
			totalCount: count,
		});
	},
};

export default transactionController;
