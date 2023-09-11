import bcrypt from 'bcryptjs';
import { v2 as cloudinary } from 'cloudinary';

import db from '../models/init-models.js';
import clientTypeService from './clientType.service.js';

import { config } from 'dotenv';

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

const Client = db.client;
const Country = db.country;
const ClientType = db.client_type;
const Wallet = db.wallet;
const WalletType = db.wallet_type;
const Merchants = db.merchants;
const Locations = db.locations;
const MerchantWorkday = db.merchant_workday;
const WalletStatus = db.wallet_status;
const LimitOperation = db.limit_operation;
const Workdays = db.workdays;
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
	// 'deleted_at',
	'created_by',
	'deleted_by',
];

const GLOBAL_INCLUDE = [
	{
		model: Merchants,
		as: 'merchants',
		include: [
			{
				model: MerchantWorkday,
				as: 'merchant_workdays',
				include: [
					{
						model: Workdays,
						as: 'workday',
					},
				],
			},
			{
				model: Locations,
				as: 'locations',
			},
		],
	},
	{
		model: ClientType,
		attributes: [
			'id',
			'code',
			'libelle',
			'created_at',
			'is_deleted',
			// 'deleted_at'
		],
		as: 'client_type',
	},
	{
		model: Country,
		required: true,
		attributes: [
			'id',
			'prefix',
			'code',
			'name',
			'created_at',
			'is_deleted',
			// 'deleted_at'
		],
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
			[Op.or]: [{ wallet_type_id: { [Op.eq]: 1 } }, { wallet_type_id: { [Op.eq]: 2 } }],
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

const DEFAULT_PASSWORD = process.env.DEFAULT_CUSTOMER_PASSWORD;
const WALLET_TYPES = {
	PERSO: 1,
	MARCH: 2,
	LIVREUR: 6,
};
const WALLET_STATUS = {
	ACTIVATED: 1,
	PENDING: 2,
	LOCKED: 3,
};
const WALLET_LIMIT = {
	PERSO_RECEIVE: 1,
	PERSO_SEND: 3,
	MERCHANT_RECEIVE: 2,
	MERCHANT_SEND: 4,
};

const WORKDAYS = {
	MONDAY: 1,
	TUESDAY: 2,
	WEDNESDAY: 3,
	THURSDAY: 4,
	FRIDAY: 5,
	SATURDAY: 6,
	SUNDAY: 7,
};

const clientServices = {
	createMerchantClient: async ({ registration, locations, workDays, profile_picture }) => {
		try {
			const { phone_number, merchant_name, latitude, longitude } = JSON.parse(registration);

			const number = phone_number?.slice(4);

			if (!number || number.length < 10) {
				console.log(number);
				throw new Error('The given phone number is not correct');
			}

			if (!merchant_name || !latitude || !longitude || !profile_picture || locations?.length <= 0 || workDays?.length <= 0) {
				console.log(2);
				throw new Error('The provided data is not correct');
			}

			let merchantClientType;
			try {
				merchantClientType = await clientTypeService.findClientTypeByIdOrCode({ code: 'MARCH' }, true);
			} catch (error) {
				console.log(error.message);
				throw new Error('Error while fetching the merchant client type');
			}

			if (!merchantClientType) {
				console.log(3);
				throw new Error('Could not find the merchant client type');
			}

			let existingClient;
			try {
				existingClient = await clientServices.getClient({ phone_number: number, client_type_id: merchantClientType.id });
			} catch (error) {
				console.log(error.message);
				throw new Error('Error while fetching client informations');
			}

			if (existingClient) {
				console.log(existingClient);
				throw new Error(`The user with phone number: ${phone_number} already has a merchant account`);
			}

			let hashedPassword;
			try {
				hashedPassword = await bcrypt.hash(DEFAULT_PASSWORD, 12);
			} catch (err) {
				console.log(err.message);
				throw new Error('Error while generating the password');
			}

			let cloudinarySecureImageUrl;
			try {
				const cloudinaryResponse = await cloudinary.uploader.upload(profile_picture);
				cloudinarySecureImageUrl = cloudinaryResponse.secure_url;
			} catch (error) {
				console.log(error.message);
				throw new Error('Failed to save the profile picture');
			}

			locations = JSON.parse(locations);
			workDays = JSON.parse(workDays);

			try {
				const transactionObj = await sequelize.transaction(async (t) => {
					const newClient = await Client.create(
						{
							phone_number: number,
							passcode: hashedPassword,
							merchant_name: merchant_name,
							photo: cloudinarySecureImageUrl,
							client_type_id: merchantClientType.id,
							country_id: 3,
							is_deleted: false,
						},
						{ transaction: t }
					);

					const newMerchant = await Merchants.create(
						{
							name: merchant_name,
							whatsapp: number,
							logo: cloudinarySecureImageUrl,
							latitude: latitude,
							longitude: longitude,
							client_id: newClient.id,
							is_deleted: false,
						},
						{ transaction: t }
					);

					const locationsToBeSaved = locations.map((loc) => {
						return {
							name: loc.name,
							detail: loc.details,
							latitude: loc.latitude,
							longitude: loc.longitude,
							radius: loc.radius,
							is_deleted: false,
							merchant_id: newMerchant.id,
						};
					});

					await Locations.bulkCreate(locationsToBeSaved, { validate: true, transaction: t });

					const merchantWorkdaysToBeSaved = workDays.map((wd) => {
						return {
							from_time: wd.start_time,
							to_time: wd.end_time,
							status: wd.status === 'OPENED' ? 'OPEN' : 'CLOSED',
							description: wd.description,
							is_deleted: false,
							merchant_id: newMerchant.id,
							workday_id: WORKDAYS[wd.day],
						};
					});
					await MerchantWorkday.bulkCreate(merchantWorkdaysToBeSaved, { validate: true, transaction: t });

					// Client Wallet
					await Wallet.create(
						{
							client_id: newClient.id,
							balance: 0,
							bonus: 0,
							wallet_status_id: WALLET_STATUS.ACTIVATED,
							receive_limit_id: WALLET_LIMIT.PERSO_RECEIVE,
							send_limit_id: WALLET_LIMIT.PERSO_SEND,
							wallet_type_id: WALLET_TYPES.PERSO,
							is_deleted: false,
						},
						{ transaction: t }
					);

					// Merchant wallet
					await Wallet.create(
						{
							client_id: newClient.id,
							balance: 0,
							bonus: 0,
							wallet_status_id: WALLET_STATUS.ACTIVATED,
							receive_limit_id: WALLET_LIMIT.MERCHANT_RECEIVE,
							send_limit_id: WALLET_LIMIT.MERCHANT_SEND,
							wallet_type_id: WALLET_TYPES.MARCH,
							is_deleted: false,
						},
						{ transaction: t }
					);

					return newClient;
				});

				if (transactionObj.id) {
					return await clientServices.getFullClientById(transactionObj.id);
				} else {
					throw new Error('Failed to fetch client');
				}
			} catch (error) {
				console.log(error.message);
				throw new Error('Failed to fetch client');
			}
		} catch (error) {
			throw new Error(error.message);
		}
	},

	createPersonalClient: async ({ phone_number }) => {
		try {
			console.log('personal client: ', phone_number);
			const number = phone_number?.slice(4);

			if (!number || number.length < 10) {
				throw new Error('The given phone number is not correct');
			}

			let personalClientType;
			try {
				personalClientType = await clientTypeService.findClientTypeByIdOrCode({ code: 'PERSO' }, true);
			} catch (error) {
				console.log(error.message);
				throw new Error('Error while fetching the personal client type');
			}

			if (!personalClientType) {
				throw new Error('Could not find the personal client type');
			}

			let existingClient;
			try {
				existingClient = await clientServices.getClient({ phone_number: number, client_type_id: personalClientType.id });
			} catch (error) {
				console.log(error.message);
				throw new Error('Error while fetching client informations');
			}

			if (existingClient) {
				console.log(existingClient);
				throw new Error(`The user with phone number: ${phone_number} already has a personal account`);
			}

			let hashedPassword;
			try {
				hashedPassword = await bcrypt.hash(DEFAULT_PASSWORD, 12);
			} catch (err) {
				console.log('DEFAULT_PASSWORD', DEFAULT_PASSWORD);
				console.log(err.message);
				throw new Error('Error while generating the password');
			}

			try {
				const transactionObj = await sequelize.transaction(async (t) => {
					console.log('here');
					const newClient = await Client.create(
						{
							phone_number: number,
							passcode: hashedPassword,
							country_id: 3,
							client_type_id: personalClientType.id,
							is_deleted: false,
						},
						{ transaction: t }
					);

					await Wallet.create(
						{
							client_id: newClient.id,
							balance: 0,
							bonus: 0,
							wallet_status_id: WALLET_STATUS.ACTIVATED,
							receive_limit_id: WALLET_LIMIT.PERSO_RECEIVE,
							send_limit_id: WALLET_LIMIT.PERSO_SEND,
							wallet_type_id: WALLET_TYPES.PERSO,
							is_deleted: false,
						},
						{ transaction: t }
					);

					return newClient;
				});

				if (transactionObj.id) {
					return await clientServices.getFullClientById(transactionObj.id);
				} else {
					throw new Error('Failed to fetch client');
				}
			} catch (error) {
				console.log(error.message);
				throw new Error('Failed to fetch client');
			}
		} catch (error) {
			throw new Error(error.message);
		}
	},

	getClient: async (filter) => {
		try {
			const whereClause = {
				...filter,
			};

			const queryOptions = {
				where: whereClause,
			};

			return await Client.findOne(queryOptions);
		} catch (error) {
			throw new Error('Failed to fetch client');
		}
	},

	getFullClientById: async (id) => {
		try {
			const whereClause = {
				id: id,
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

	findClients: async ({ account_type_query, status_query, skip_query, limit_query, search_pattern_query, sort_query = 'DESC' }) => {
		try {
			const whereClause = {};
			const intFromQuery = parseInt(skip_query) || 0;
			// if (sort_query === 'DESC' && intFromQuery > 0) {
			// 	whereClause.id = {
			// 		[Op.lt]: intFromQuery,
			// 		// add skip
			// 	};
			// } else if (sort_query === 'ASC') {
			// 	whereClause.id = {
			// 		[Op.gt]: intFromQuery,
			// 		// add skip
			// 	};
			// }

			if (account_type_query === 'NOTHING' || status_query === 'NOTHING') {
				return { count: 0, clients: [] };
			}

			const personalClientType = await clientTypeService.findClientTypeByIdOrCode({ code: 'PERSO' }, true);
			const merchantClientType = await clientTypeService.findClientTypeByIdOrCode({ code: 'MARCH' }, true);

			console.log(account_type_query, status_query, skip_query, limit_query, search_pattern_query, sort_query);
			if (account_type_query === 'ALL' && personalClientType && merchantClientType) {
				whereClause[Op.or] = [{ client_type_id: personalClientType.id }, { client_type_id: merchantClientType.id }];
			} else if (account_type_query === 'PERSONAL' && personalClientType) {
				whereClause.client_type_id = personalClientType.id;
			} else if (account_type_query === 'MERCHANT' && merchantClientType) {
				whereClause.client_type_id = merchantClientType.id;
			} else {
				return new Error('Failed to fetch client type');
			}

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

			const { count, rows: clients } = await Client.findAndCountAll(queryOptions);
			console.log('count, clients: ', count, clients.length);
			return { clients, count };
		} catch (error) {
			console.log(error.message);
			throw new Error('Failed to fetch clients');
		}
	},

	switchClientAccountStatus: async ({ clientId, requestUser }) => {
		// req.userData.userId
		if (!clientId || !requestUser) return;

		let client;
		try {
			client = await clientServices.getFullClientById(clientId);
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

export default clientServices;
