import { matchedData, validationResult } from 'express-validator';

import retraitServices from '../services/retrait.service.js';

const retraitController = {
	getUserRetraits: async (req, res, next) => {
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
		const SKIP = requestData.skip;

		let fetchedRetraits, count;

		try {
			({ fetchedRetraits, count } = await retraitServices.findUserRequests(WALLET_ID, FROM, TO, SKIP));
		} catch (e) {
			console.log(e.message);
			res.statusMessage = 'Could not fetch the client requests';
			return res.sendStatus(500);
		}

		if (!fetchedRetraits) {
			res.statusMessage = 'Could not fetch the client requests';
			return res.sendStatus(500);
		}

		return res.json({
			message: 'Successfully fetch the client requests',
			retraits: fetchedRetraits,
			skip: parseInt(SKIP) + (fetchedRetraits.length || 0),
			totalCount: count,
		});
	},
};

export default retraitController;
