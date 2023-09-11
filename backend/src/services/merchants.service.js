import db from '../models/init-models.js';

const Article = db.article;
const Media = db.media;
const ArticleAccompagnement = db.article_accompagnement;
const ArticleSupplement = db.article_supplement;
const Client = db.client;
const Accompagnements = db.accompagnements;
const Merchants = db.merchants;
const Wallet = db.wallet;
const WalletType = db.wallet_type;
const WalletStatus = db.wallet_status;
const LimitOperation = db.limit_operation;
const sequelize = db.sequelize;
const Sequelize = db.Sequelize;
const Op = db.Sequelize.Op;

const GLOBAL_ATTRIBUTES = ['id', 'whatsapp', 'name', 'logo', 'location', 'created_at', 'updated_at', 'is_deleted', 'radius', 'latitude', 'longitude'];

const GLOBAL_INCLUDE = [
	{
		model: Article,
		as: 'articles',
		include: [
			{
				model: ArticleAccompagnement,
				as: 'article_accompagnements',
				include: [
					{
						model: Accompagnements,
						attributes: ['id', 'name', 'price', 'article_id'],
						as: 'accompagnement',
					},
				],
			},
			{
				model: ArticleSupplement,
				as: 'article_supplements',
				include: [
					{
						model: Accompagnements,
						attributes: ['id', 'name', 'price', 'article_id'],
						as: 'accompagnement',
					},
				],
			},
			{ model: Media, as: 'media', attributes: ['id', 'name', 'url'] },
		],
	},
	{
		model: Accompagnements,
		as: 'accompagnements',
		// where: {
		// is_deleted: {
		// 	[Op.ne]: true,
		// },
		// },
	},
	{
		model: Client,
		required: true,
		as: 'client',
		include: [
			{
				model: Wallet,
				attributes: ['id', 'balance', 'bonus', 'client_id', 'commissionTotal', 'commission_total', 'created_at', 'is_deleted', 'deleted_by', 'is_seller'],
				required: true,
				as: 'wallets',
				where: {
					is_deleted: {
						[Op.ne]: true,
					},
					// TODO: get the wallet_type_id by fetching
					// wallet_type_id: 6,
				},
				include: [
					{
						model: WalletType,
						attributes: ['id', 'code', 'libelle', 'is_deleted', 'deleted_by'],
						as: 'wallet_type',
					},
					{
						model: WalletStatus,
						attributes: ['id', 'code', 'libelle', 'is_deleted', 'deleted_by'],
						as: 'wallet_status',
					},
					{
						model: LimitOperation,
						attributes: ['id', 'amount', 'code', 'created_at', 'is_deleted', 'deleted_by'],
						as: 'receive_limit',
					},
					{
						model: LimitOperation,
						attributes: ['id', 'amount', 'code', 'created_at', 'is_deleted', 'deleted_by'],
						as: 'send_limit',
					},
				],
			},
		],
	},
];

const merchantsServices = {
	getFullMerchantById: async (id) => {
		try {
			const whereClause = {
				id,
			};

			const queryOptions = {
				attributes: GLOBAL_ATTRIBUTES,
				include: GLOBAL_INCLUDE,
				where: whereClause,
			};

			return await Merchants.findOne(queryOptions);
		} catch (error) {
			throw new Error('Failed to fetch client');
		}
	},

	findMerchantsBySearch: async ({ search_pattern_query, sort_query = 'DESC' }) => {
		try {
			const whereClause = {};

			whereClause[Op.or] = [{ is_deleted: false }, { is_deleted: true }];

			if (search_pattern_query !== '') {
				whereClause[Op.or] = [
					{ whatsapp: { [Op.like]: `%${search_pattern_query}%` } },
					{ name: { [Op.like]: `%${search_pattern_query}%` } },
					// {
					// 	'$client.phone_number$': { [Op.like]: `%${search_pattern_query}%` },
					// },
				];
			}

			const queryOptions = {
				attributes: GLOBAL_ATTRIBUTES,
				include: GLOBAL_INCLUDE,
				where: whereClause,
				order: [
					['id', sort_query],
					['whatsapp', 'ASC'],
				],
			};

			const { count, rows: merchants } = await Merchants.findAndCountAll(queryOptions);
			return { merchants, count };
		} catch (error) {
			console.log(error.message);
			throw new Error('Failed to fetch merchants');
		}
	},

	findMerchants: async ({ status_query, skip_query, limit_query, search_pattern_query, sort_query = 'DESC' }) => {
		try {
			const whereClause = {};
			const intFromQuery = parseInt(skip_query) || 0;

			if (status_query === 'NOTHING') {
				return { count: 0, merchants: [] };
			}

			if (status_query === 'ALL') {
				whereClause[Op.or] = [{ is_deleted: false }, { is_deleted: true }];
			} else if (status_query === 'ACTIVE') {
				whereClause.is_deleted = false;
			} else if (status_query === 'DELETED') {
				whereClause.is_deleted = true;
			}

			if (search_pattern_query !== '') {
				whereClause[Op.or] = [
					{ whatsapp: { [Op.like]: `%${search_pattern_query}%` } },
					{ name: { [Op.like]: `%${search_pattern_query}%` } },
					{ location: { [Op.like]: `%${search_pattern_query}%` } },
					{
						'$client.phone_number$': { [Op.like]: `%${search_pattern_query}%` },
					},
				];
			}

			const queryOptions = {
				attributes: GLOBAL_ATTRIBUTES,
				include: GLOBAL_INCLUDE,

				where: whereClause,
				order: [
					['id', sort_query],
					['whatsapp', 'ASC'],
					// ["is_deleted", sort_query],
				],
				limit: parseInt(limit_query),
				offset: intFromQuery,
			};

			console.log('\n\n\nquery: ', queryOptions);

			const { count, rows: merchants } = await Merchants.findAndCountAll(queryOptions);
			console.log('count, merchants: ', count, merchants.length);
			return { merchants, count };
		} catch (error) {
			console.log(error.message);
			throw new Error('Failed to fetch merchants');
		}
	},
};

export default merchantsServices;
