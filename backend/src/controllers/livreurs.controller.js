import { matchedData, validationResult } from 'express-validator';
import clientServices from '../services/client.service.js';
import userServices from '../services/user.service.js';
import livreurServices from '../services/livreur.service.js';

// import userTypeService from "../services/userType.service.js";

const livreurController = {
	getLivreursBySearch: async (req, res, next) => {
		const valResult = validationResult(req);
		if (!valResult.isEmpty()) {
			res.statusMessage = 'Invalid params passed';
			return res.sendStatus(400);
		}
		const requestData = matchedData(req);

		const SEARCH_PATTERN = requestData['searchPattern'];
		console.log('requestData', requestData);

		let livreurs, count;
		try {
			({ livreurs, count } = await livreurServices.findLivreursBySearch({
				search_pattern_query: SEARCH_PATTERN,
			}));
		} catch (e) {
			console.log('here');
			console.log(e.message);
			res.statusMessage = 'Could not fetch the livreurs';
			return res.sendStatus(500);
		}

		if (!livreurs) {
			res.statusMessage = 'Could not fetch the livreurs';
			return res.sendStatus(500);
		}

		return res.json({
			message: 'Successfully fetch the livreurs',
			livreurs: livreurs || [],
			totalCount: count,
		});
	},

	getLivreurs: async (req, res, next) => {
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

		let livreurs, count;
		try {
			({ livreurs, count } = await livreurServices.findLivreurs({
				status_query: STATUS,
				skip_query: SKIP,
				limit_query: LIMIT,
				search_pattern_query: SEARCH_PATTERN,
				sort_query: DIRECTION || 'DESC',
			}));
		} catch (e) {
			console.log(e.message);
			res.statusMessage = 'Could not fetch the livreurs';
			return res.sendStatus(500);
		}

		if (!livreurs) {
			res.statusMessage = 'Could not fetch the livreurs';
			return res.sendStatus(500);
		}

		return res.json({
			message: 'Successfully fetch the livreurs',
			livreurs,
			skip: parseInt(SKIP) + (livreurs.length || 0),
			totalCount: count,
		});
	},

	switchClientAccountStatus: async (req, res, next) => {
		const valResult = validationResult(req);
		if (!valResult.isEmpty()) {
			res.statusMessage = 'Invalid params passed';
			return res.sendStatus(400);
		}
		const requestData = matchedData(req);
		const CLIENT_ACCOUNT_ID = requestData['cid'];
		let client;
		try {
			client = await clientServices.switchClientAccountStatus({
				clientId: CLIENT_ACCOUNT_ID,
				requestUser: req.userData.userId,
			});
		} catch (e) {
			res.statusMessage = 'Could not save the client';
			return res.sendStatus(500);
		}

		if (!client) {
			res.statusMessage = 'Could not update the client information';
			return res.sendStatus(403);
		}

		return res.json({
			message: client.is_deleted ? 'Successfully deleted the client account' : 'Successfully activated the client account',
			client,
		});
	},
};

export default livreurController;
