import { matchedData, validationResult } from 'express-validator';
import clientServices from '../services/client.service.js';
import userServices from '../services/user.service.js';
import livreurServices from '../services/livreur.service.js';
import merchantsServices from '../services/merchants.service.js';
import articleServices from '../services/articles.service.js';
import accompagnementServices from '../services/accompagnements.service.js';

// import userTypeService from "../services/userType.service.js";

const accompagnementsController = {
	saveAccompagnement: async (req, res, next) => {
		const valResult = validationResult(req);
		if (!valResult.isEmpty()) {
			res.statusMessage = 'Invalid params passed';
			return res.sendStatus(400);
		}
		const requestData = matchedData(req);

		const NAME = requestData['name'];
		const MERCHANT_ID = requestData['merchant_id'];
		console.log('requestData', requestData);

		let accompagnement;
		try {
			accompagnement = await accompagnementServices.saveAccompagnement({
				name: NAME,
				merchant_id: MERCHANT_ID,
			});
		} catch (e) {
			console.log(e.message);
			res.statusMessage = 'Could not save the new accompagnement';
			return res.sendStatus(500);
		}

		if (!accompagnement) {
			res.statusMessage = 'Could not save the new accompagnement';
			return res.sendStatus(500);
		}

		return res.json({
			message: 'Successfully saved the new accompagnement',
			accompagnement,
		});
	},

	editAccompagnement: async (req, res, next) => {
		const valResult = validationResult(req);
		if (!valResult.isEmpty()) {
			console.log(valResult);
			res.statusMessage = 'Invalid params passed';
			return res.sendStatus(400);
		}
		const requestData = matchedData(req);

		const NAME = requestData['name'];
		const ID = requestData['id'];
		const ACTION = requestData['action']; // edit, edit_and_available, available, delete
		console.log('requestData', requestData);

		let accompagnement;
		try {
			accompagnement = await accompagnementServices.editAccompagnement({
				name: NAME,
				id: ID,
				action: ACTION,
			});
		} catch (e) {
			console.log(e.message);
			res.statusMessage = 'Could not edit the new accompagnement';
			return res.sendStatus(500);
		}

		if (!accompagnement) {
			res.statusMessage = 'Could not edit the new accompagnement';
			return res.sendStatus(500);
		}

		return res.json({
			message: 'Successfully edited the new accompagnement',
			accompagnement,
		});
	},
};

export default accompagnementsController;
