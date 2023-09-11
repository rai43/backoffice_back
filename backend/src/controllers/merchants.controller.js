import { matchedData, validationResult } from 'express-validator';
import clientServices from '../services/client.service.js';
import userServices from '../services/user.service.js';
import livreurServices from '../services/livreur.service.js';
import merchantsServices from '../services/merchants.service.js';

// import userTypeService from "../services/userType.service.js";

const merchantController = {
	getMerchantsBySearch: async (req, res, next) => {
		const valResult = validationResult(req);
		if (!valResult.isEmpty()) {
			res.statusMessage = 'Invalid params passed';
			return res.sendStatus(400);
		}
		const requestData = matchedData(req);

		const SEARCH_PATTERN = requestData['searchPattern'];
		console.log('requestData', requestData);

		let merchants, count;
		try {
			({ merchants, count } = await merchantsServices.findMerchantsBySearch({
				search_pattern_query: SEARCH_PATTERN,
			}));
		} catch (e) {
			console.log(e.message);
			res.statusMessage = 'Could not fetch the merchants';
			return res.sendStatus(500);
		}

		if (!merchants) {
			res.statusMessage = 'Could not fetch the merchants';
			return res.sendStatus(500);
		}

		return res.json({
			message: 'Successfully fetch the merchants',
			merchants: merchants || [],
			totalCount: count,
		});
	},

	getMerchants: async (req, res, next) => {
		const valResult = validationResult(req);
		if (!valResult.isEmpty()) {
			res.statusMessage = 'Invalid params passed';
			return res.sendStatus(400);
		}
		const requestData = matchedData(req);

		const STATUS = requestData['status'];
		const SKIP = requestData['skip'];
		const LIMIT = requestData['limit'];
		const SEARCH_PATTERN = requestData['searchPattern'];
		const DIRECTION = requestData['direction'];
		console.log('requestData', requestData);

		let merchants, count;
		try {
			({ merchants, count } = await merchantsServices.findMerchants({
				status_query: STATUS,
				skip_query: SKIP,
				limit_query: LIMIT,
				search_pattern_query: SEARCH_PATTERN,
				sort_query: DIRECTION || 'DESC',
			}));
		} catch (e) {
			console.log(e.message);
			res.statusMessage = 'Could not fetch the merchants';
			return res.sendStatus(500);
		}

		if (!merchants) {
			res.statusMessage = 'Could not fetch the merchants';
			return res.sendStatus(500);
		}

		return res.json({
			message: 'Successfully fetch the merchants',
			merchants: merchants || [],
			skip: parseInt(SKIP) + (merchants?.length || 0),
			totalCount: count,
		});
	},
};

export default merchantController;
