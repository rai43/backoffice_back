import { matchedData, validationResult } from 'express-validator';

import rechargementServices from '../services/rechargements.service.js';

const transactionController = {
	getUserRechargements: async (req, res, next) => {
		const valResult = validationResult(req);
		if (!valResult.isEmpty()) {
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

		let fetchedRechargements, count;

		try {
			({ fetchedRechargements, count } = await rechargementServices.findUserRechargements(WALLET_ID, FROM, TO, TRANSACTION_TYPE, SKIP));
		} catch (e) {
			console.log(e.message);
			res.statusMessage = 'Could not fetch the client rechargements';
			return res.sendStatus(500);
		}

		if (!fetchedRechargements) {
			res.statusMessage = 'Could not fetch the client rechargements';
			return res.sendStatus(500);
		}

		return res.json({
			message: 'Successfully fetch the client rechargements',
			rechargements: fetchedRechargements,
			skip: parseInt(SKIP) + (fetchedRechargements.length || 0),
			totalCount: count,
		});
	},
};

export default transactionController;
