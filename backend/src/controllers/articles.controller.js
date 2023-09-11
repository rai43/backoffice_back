import { matchedData, validationResult } from 'express-validator';
import clientServices from '../services/client.service.js';
import userServices from '../services/user.service.js';
import livreurServices from '../services/livreur.service.js';
import merchantsServices from '../services/merchants.service.js';
import articleServices from '../services/articles.service.js';

// import userTypeService from "../services/userType.service.js";

const articlesController = {
	getArticles: async (req, res, next) => {
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

		let articles, count;
		try {
			({ articles, count } = await articleServices.findArticles({
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

		if (!articles) {
			res.statusMessage = 'Could not fetch the merchants';
			return res.sendStatus(500);
		}

		return res.json({
			message: 'Successfully fetch the merchants',
			articles: articles || [],
			skip: parseInt(SKIP) + (articles?.length || 0),
			totalCount: count,
		});
	},

	saveArticle: async (req, res, next) => {
		const valResult = validationResult(req);
		if (!valResult.isEmpty()) {
			console.log(valResult);
			res.statusMessage = 'Invalid params passed';
			return res.sendStatus(400);
		}
		const requestData = matchedData(req);
		console.log(req.body);
		const TITRE = req.body['title'];
		const DESC = req.body['description'];
		const PRICE = req.body['price'];
		const MERCHANT_ID = req.body['merchant_id'];
		const ACCOMPAGNEMENTS = req.body['accompagnements'];
		const SUPPLEMENTS = req.body['supplements'];
		const IMAGE = req.file.path;
		const ACTION_USER = req.userData.userId;
		let article;
		try {
			article = await articleServices.saveArticle({
				title: JSON.parse(TITRE),
				description: JSON.parse(DESC),
				price: parseInt(PRICE),
				image: IMAGE,
				merchantId: MERCHANT_ID,
				accompagnements: ACCOMPAGNEMENTS,
				supplements: SUPPLEMENTS,
				userId: ACTION_USER,
			});
			console.log('Returned values: ', article);
		} catch (e) {
			console.log(e);
			res.statusMessage = 'Error while saving the article';
			return res.sendStatus(500);
		}

		if (!article) {
			res.statusMessage = `Could not save the article`;
			return res.sendStatus(403);
		}

		return res.json({
			message: 'Successfully edited the new accompagnement',
			article,
		});
	},
};

export default articlesController;
