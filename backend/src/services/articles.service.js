import { v2 as cloudinary } from 'cloudinary';

import db from '../models/init-models.js';
const sequelize = db.sequelize;
const Merchants = db.merchants;
const Accompagnements = db.accompagnements;
const Client = db.client;
const Category = db.category;
const Article = db.article;
const Media = db.media;
const ArticleAccompagnement = db.article_accompagnement;
const ArticleSupplement = db.article_supplement;

import { config } from 'dotenv';
import moment from 'moment';
config();

const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_SECRET_KEY = process.env.CLOUDINARY_SECRET_KEY;

// cloudinary configuration
cloudinary.config({
	cloud_name: CLOUDINARY_CLOUD_NAME,
	api_key: CLOUDINARY_API_KEY,
	api_secret: CLOUDINARY_SECRET_KEY,
});

const articleServices = {
	getFullArticleById: async (id) => {
		try {
			const whereClause = { id };

			const queryOptions = {
				include: [
					{
						model: Merchants,
						as: 'merchant',
						include: [{ model: Client, as: 'client' }],
					},
					{ model: ArticleAccompagnement, as: 'article_accompagnements' },
					{ model: ArticleSupplement, as: 'article_supplements' },
					{ model: Media, as: 'media', attributes: ['id', 'name', 'url'] },
					{ model: Category, as: 'category' },
				],

				where: whereClause,
			};

			return await Article.findOne(queryOptions);
		} catch (error) {
			console.log(error.message);
			throw new Error('Failed to fetch articles');
		}
	},

	findArticles: async ({ status_query, skip_query, limit_query, search_pattern_query, sort_query = 'DESC' }) => {
		try {
			const whereClause = {};
			const skipInt = parseInt(skip_query) || 0;

			if (status_query === 'NOTHING') {
				return { count: 0, articles: [] };
			}

			// if (status_query === 'ALL') {
			// 	whereClause[Op.or] = [{ is_deleted: false }, { is_deleted: true }];
			// } else if (status_query === 'ACTIVE') {
			// 	whereClause.is_deleted = false;
			// } else if (status_query === 'DELETED') {
			// 	whereClause.is_deleted = true;
			// }

			if (search_pattern_query !== '') {
				whereClause[Op.or] = [
					{ id: { [Op.like]: `%${search_pattern_query}%` } },
					{ title: { [Op.like]: `%${search_pattern_query}%` } },
					{ price: { [Op.like]: `%${search_pattern_query}%` } },
					{ available: { [Op.like]: `%${search_pattern_query}%` } },
					{ status: { [Op.like]: `%${search_pattern_query}%` } },
					// {
					// 	'$client.phone_number$': { [Op.like]: `%${search_pattern_query}%` },
					// },
				];
			}

			const queryOptions = {
				include: [
					{
						model: Merchants,
						as: 'merchant',
						include: [{ model: Client, as: 'client' }],
					},
					{
						model: ArticleAccompagnement,
						as: 'article_accompagnements',
					},
					{
						model: ArticleSupplement,
						as: 'article_supplements',
					},
					{ model: Media, as: 'media', attributes: ['id', 'name', 'url'] },
					{ model: Category, as: 'category' },
				],

				where: whereClause,
				order: [['id', sort_query]],
				limit: parseInt(limit_query),
				offset: skipInt,
			};

			const { count, rows: articles } = await Article.findAndCountAll(queryOptions);
			console.log('count, articles: ', count, articles.length);
			return { articles: articles, count };
		} catch (error) {
			console.log(error.message);
			throw new Error('Failed to fetch articles');
		}
	},

	saveArticle: async ({ title, description, price, image, merchantId, accompagnements, supplements, userId }) => {
		// console.log(title, description, price, image, merchantId, userId);
		// console.log(accompagnements);
		// console.log(supplements);
		try {
			let cloudinarySecureImageUrl;
			try {
				const cloudinaryResponse = await cloudinary.uploader.upload(image);
				cloudinarySecureImageUrl = cloudinaryResponse.secure_url;
			} catch (error) {
				console.log(error.message);
				throw new Error('Failed to save the picture');
			}

			try {
				const transactionObj = await sequelize.transaction(async (t) => {
					const newArticle = await Article.create(
						{
							title,
							description,
							price,
							category_id: 84,
							created_by: userId,
							is_deleted: false,
							ondiscount: false,
							dynamic_link: cloudinarySecureImageUrl,
							status: 'PUBLISHED',
							stock_control: 'UNVERIFIED',
							merchant_id: merchantId,
							article_type: 'FOOD',
							article_status_id: 1,
							available: true,
						},
						{ transaction: t }
					);

					console.log(`article_${newArticle.id}_${moment().format('DD_MM_YYYY')}`);
					await Media.create(
						{
							name: `article_${newArticle.id}_${moment().format('DD_MM_YYYY')}`,
							url: cloudinarySecureImageUrl,
							article_id: newArticle.id,
							is_deleted: false,
						},
						{ transaction: t }
					);

					const accompagnementsToBeSaved = JSON.parse(accompagnements)
						.filter((supp) => supp !== null)
						.map((acc) => {
							return {
								article_id: newArticle?.id,
								accompagnement_id: acc,
								created_at: new Date(),
								updated_at: new Date(),
								is_deleted: false,
							};
						});

					await ArticleAccompagnement.bulkCreate(accompagnementsToBeSaved, { validate: true, transaction: t });

					const supplementsToBeSaved = JSON.parse(supplements)
						.filter((supp) => supp !== null)
						.map((supp) => {
							return {
								article_id: newArticle?.id,
								accompagnement_id: supp.accompagnement_id,
								price: parseInt(supp.accompagnement_price),
								created_at: new Date(),
								updated_at: new Date(),
								is_deleted: false,
							};
						});

					await ArticleSupplement.bulkCreate(supplementsToBeSaved, { validate: true, transaction: t });

					return newArticle;
				});

				if (transactionObj.id) {
					return await articleServices.getFullArticleById(transactionObj.id);
				} else {
					throw new Error('Failed to fetch article');
				}
			} catch (error) {
				console.log(error);
				throw new Error('Failed to save the article');
			}
		} catch (err) {
			throw new Error(err.message);
		}
	},
};

export default articleServices;
