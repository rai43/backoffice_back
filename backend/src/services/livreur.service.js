import db from '../models/init-models.js';
import clientTypeService from './clientType.service.js';

const Client = db.client;
const Livreurs = db.livreurs;
const Country = db.country;
const ClientType = db.client_type;
const Wallet = db.wallet;
const WalletType = db.wallet_type;
const WalletStatus = db.wallet_status;
const LimitOperation = db.limit_operation;
const sequelize = db.sequelize;
const Op = db.Sequelize.Op;

const GLOBAL_ATTRIBUTES = [
	'id',
	'phone_number',
	'full_name',
	'merchant_name',
	'photo',
	'fcm_token',
	'location',
	'commune',
	'email',
	'version_code',
	'is_commercial',
	'is_seller',
	'is_deleted',
	'created_at',
	'created_by',
	'deleted_by',
];

const GLOBAL_INCLUDE = [
	{
		model: ClientType,
		attributes: ['id', 'code', 'libelle', 'created_at', 'is_deleted'],
		as: 'client_type',
	},
	{
		model: Country,
		required: true,
		attributes: ['id', 'prefix', 'code', 'name', 'created_at', 'is_deleted'],
		as: 'country',
	},
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
			[Op.and]: [{ wallet_type_id: 6 }],
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
];

const livreurServices = {
	findLivreursBySearch: async ({ search_pattern_query, sort_query = 'DESC' }) => {
		try {
			const whereClause = {};

			whereClause[Op.or] = [{ is_deleted: false }, { is_deleted: true }];

			if (search_pattern_query !== '') {
				whereClause[Op.or] = [
					{ first_name: { [Op.like]: `%${search_pattern_query}%` } },
					{ last_name: { [Op.like]: `%${search_pattern_query}%` } },
					{ whatsapp: { [Op.like]: `%${search_pattern_query}%` } },
					{ second_phone_number: { [Op.like]: `%${search_pattern_query}%` } },
				];
			}

			const queryOptions = {
				where: whereClause,
				order: [['id', sort_query]],
			};

			const { count, rows: livreurs } = await Livreurs.findAndCountAll(queryOptions);
			return { livreurs, count };
		} catch (error) {
			console.log(error.message);
			throw new Error('Failed to fetch livreurs');
		}
	},

	getFullLivreurById: async (id) => {
		try {
			const whereClause = {
				id,
			};

			const queryOptions = {
				attributes: GLOBAL_ATTRIBUTES,
				include: GLOBAL_INCLUDE,
				where: whereClause,
			};

			return await Client.findOne(queryOptions);
		} catch (error) {
			throw new Error('Failed to fetch client');
		}
	},

	findLivreurs: async ({ status_query, skip_query, limit_query, search_pattern_query, sort_query = 'DESC' }) => {
		try {
			const whereClause = {};
			const intFromQuery = parseInt(skip_query) || 0;

			if (status_query === 'NOTHING') {
				return { count: 0, livreurs: [] };
			}

			const personalClientType = await clientTypeService.findClientTypeByIdOrCode({ code: 'PERSO' }, true);
			whereClause.client_type_id = personalClientType.id;

			if (status_query === 'ALL') {
				whereClause[Op.or] = [{ is_deleted: false }, { is_deleted: true }];
			} else if (status_query === 'ACTIVE') {
				whereClause.is_deleted = false;
			} else if (status_query === 'DELETED') {
				whereClause.is_deleted = true;
			}

			if (search_pattern_query !== '') {
				whereClause[Op.or] = [{ phone_number: { [Op.like]: `%${search_pattern_query}%` } }, { full_name: { [Op.like]: `%${search_pattern_query}%` } }];
			}

			const queryOptions = {
				attributes: GLOBAL_ATTRIBUTES,
				include: GLOBAL_INCLUDE,

				where: whereClause,
				order: [
					['id', sort_query],
					['phone_number', 'ASC'],
					// ["is_deleted", sort_query],
				],
				limit: parseInt(limit_query),
				offset: intFromQuery,
			};

			console.log('\n\n\nquery: ', queryOptions);

			const { count, rows: livreurs } = await Client.findAndCountAll(queryOptions);
			console.log('count, livreurs: ', count, livreurs.length);
			return { livreurs, count };
		} catch (error) {
			console.log(error.message);
			throw new Error('Failed to fetch livreurs');
		}
	},

	switchLivreursAccountStatus: async ({ clientId, requestUser }) => {
		// req.userData.userId
		if (!clientId || !requestUser) return;

		let client;
		try {
			client = await livreurServices.getFullClientById(clientId);
		} catch (e) {
			throw new Error('Error while fetching the client');
		}

		if (!client) {
			throw new Error('Failed to fetch client');
		}

		const updateObj = {
			is_deleted: !client.is_deleted,
			// deleted_at: new Date(),
			deleted_by: requestUser,
		};

		try {
			// updating the instance of the User model
			await client.update(updateObj);
			// saving the instance of the User model
			return await client.save();
		} catch (e) {
			throw new Error('Could not update the client information in the database');
		}
	},
};

export default livreurServices;
