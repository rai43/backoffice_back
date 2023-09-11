import { matchedData, validationResult } from 'express-validator';
import clientServices from '../services/client.service.js';
import userServices from '../services/user.service.js';

// import userTypeService from "../services/userType.service.js";

const clientController = {
	getClients: async (req, res, next) => {
		const valResult = validationResult(req);
		if (!valResult.isEmpty()) {
			res.statusMessage = 'Invalid params passed';
			return res.sendStatus(400);
		}
		const requestData = matchedData(req);

		const ACCOUNT_TYPE = requestData['accountType'];
		const STATUS = requestData['status'];
		const SKIP = requestData['skip'];
		const LIMIT = requestData['limit'];
		const SEARCH_PATTERN = requestData['searchPattern'];
		const DIRECTION = requestData['direction'];

		let clients, count;
		try {
			({ clients, count } = await clientServices.findClients({
				account_type_query: ACCOUNT_TYPE,
				status_query: STATUS,
				skip_query: SKIP,
				limit_query: LIMIT,
				search_pattern_query: SEARCH_PATTERN,
				sort_query: DIRECTION || 'DESC',
			}));
		} catch (e) {
			console.log(e.message);
			res.statusMessage = 'Could not fetch the clients';
			return res.sendStatus(500);
		}

		if (!clients) {
			res.statusMessage = 'Could not fetch the clients';
			return res.sendStatus(500);
		}

		return res.json({
			message: 'Successfully fetch the clients',
			clients,
			skip: parseInt(SKIP) + (clients.length || 0),
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

	createClientAccount: async (req, res, next) => {
		const valResult = validationResult(req);
		if (!valResult.isEmpty()) {
			console.log(valResult);
			res.statusMessage = 'Invalid params passed';
			return res.sendStatus(400);
		}

		const requestData = matchedData(req);
		const ACCOUNT_TYPE = requestData['accountType'];
		console.log(requestData);

		let client;
		if (ACCOUNT_TYPE === 'personal') {
			const { registration } = req.body;
			try {
				client = await clientServices.createPersonalClient({
					phone_number: registration.phone_number,
				});
				console.log(client);
			} catch (e) {
				console.log(e.message);
				res.statusMessage = 'Error while saving the client';
				return res.sendStatus(500);
			}

			if (!client) {
				res.statusMessage = `Could not save the client`;
				return res.sendStatus(403);
			}
		} else if (ACCOUNT_TYPE === 'merchant') {
			const { registration, locations, workDays } = req.body;
			console.log(req.file.path);
			try {
				client = await clientServices.createMerchantClient({ registration, locations, workDays, profile_picture: req.file.path });
				console.log('Returned values: ', client);
			} catch (e) {
				res.statusMessage = 'Error while saving the client';
				return res.sendStatus(500);
			}

			if (!client) {
				res.statusMessage = `Could not save the client`;
				return res.sendStatus(403);
			}
		}

		return res.json({
			message: 'Successfully created the client account',
			client,
		});
	},
};

export default clientController;
