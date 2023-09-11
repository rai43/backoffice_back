import express from 'express';
import { check, param, query } from 'express-validator';

import checkAuthentication from '../middlewares/check.authentication.js';
import livreurController from '../controllers/livreurs.controller.js';
import articlesController from '../controllers/articles.controller.js';
import { fileUpload } from '../middlewares/file-upload.js';

const router = express.Router();

router.use(checkAuthentication);
router.get(
	'/get-articles',
	[
		query('status').isString().escape(),
		query('searchPattern').isString().default('').escape(),
		query('direction').isString().default('DESC').escape(),
		query('skip').isInt().notEmpty().escape(),
		query('limit').isInt().default(10).notEmpty().escape(),
	],
	articlesController.getArticles
);

router.post('/save-article', [fileUpload.single('image')], articlesController.saveArticle);

export default router;
