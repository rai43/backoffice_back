import moment from 'moment';
import db from '../models/init-models.js';

const Client = db.client;
const Livreurs = db.livreurs;
const Article = db.article;
const Media = db.media;
const Merchants = db.merchants;
const CommandeStatus = db.commande_status;
const CommandeCommandeStatus = db.commande_commande_status;
const Addresses = db.addresses;
const Commandes = db.commandes;
const ArticleCommande = db.article_commande;
const LigneSupplements = db.ligne_supplement;
const LigneAccompagnements = db.ligne_accompagnement;
const Accompagnements = db.accompagnements;
const Supplements = db.supplements;
const sequelize = db.sequelize;
const Op = db.Sequelize.Op;

const TRANSACTION_STATUS = {
	PENDING: 'PENDING',
	REGISTERED: 'REGISTERED',
	INDELIVERY: 'INDELIVERY',
	DELIVERED: 'DELIVERED',
	CANCELED: 'CANCELED',
	INPROCESS: 'INPROCESS',
};

const PAYMENT_METHOD = {
	CASH: 'CASH',
	STREET: 'STREET',
};

const orderServices = {
	// findUserTransactionForDisplay: async (filter) => {
	// 	try {
	// 		let whereClause = {
	// 			...filter,
	// 		};

	// 		const queryOptions = {
	// 			attributes: ['id', 'amount', 'reference', 'created_at'],
	// 			include: [
	// 				{
	// 					model: Wallet,
	// 					attributes: ['id', 'balance', 'bonus', 'client_id'],
	// 					as: 'sender_wallet',
	// 					include: [
	// 						{
	// 							model: Client,
	// 							attributes: ['id', 'phone_number'],
	// 							as: 'client',
	// 						},
	// 					],
	// 				},
	// 				{
	// 					model: Wallet,
	// 					attributes: ['id', 'balance', 'bonus', 'client_id'],
	// 					as: 'receiver_wallet',
	// 					include: [
	// 						{
	// 							model: Client,
	// 							attributes: ['id', 'phone_number'],
	// 							as: 'client',
	// 						},
	// 					],
	// 				},
	// 				{
	// 					model: TransactionType,
	// 					attributes: ['id', 'code', 'libelle'],
	// 					as: 'transaction_type',
	// 				},
	// 				{
	// 					model: TransactionStatus,
	// 					attributes: ['id', 'code', 'libelle'],
	// 					as: 'transaction_status',
	// 				},
	// 			],
	// 			where: whereClause,
	// 		};
	// 		const fetchedTransaction = await Transaction.findOne(queryOptions);
	// 		return fetchedTransaction;
	// 	} catch (error) {
	// 		console.log(error.message);
	// 		throw new Error('Failed to fetch transaction');
	// 	}
	// },

	findAllOrders: async (
		order_status,
		payment_method,
		minAmount,
		maxAmount,
		from,
		to,
		skip,
		searchPattern = 'null',
		searchPatternId = 'null',
		searchPatternMerchantNumber = 'null',
		sort = 'DESC'
	) => {
		try {
			let whereClause = {
				created_at: {
					[Op.lte]: moment(to).toDate() || moment().toDate(),
					[Op.gte]: moment(from).toDate() || moment().subtract(7, 'days').toDate(),
				},
			};

			if (!['ALL', 'PENDING', 'REGISTERED', 'INDELIVERY', 'DELIVERED', 'CANCELED', 'INPROCESS'].includes(order_status)) {
				console.log('The given order status is not matching');
				throw new Error('The given order status is not matching');
			}

			if (order_status !== 'ALL') {
				let existingCmdStatus;
				try {
					existingCmdStatus = TRANSACTION_STATUS[order_status];
				} catch (e) {
					console.log('Order status not found');
					throw new Error('Order status not found');
				}
				if (!existingCmdStatus) {
					console.log('Transaction type not found');
					throw new Error('Transaction type not found');
				}
				whereClause.delivery_status = existingCmdStatus;
			}

			if (!['ALL', 'STREET', 'CASH'].includes(payment_method)) {
				console.log('Payment method is not matching');
				throw new Error('Payment method is not matching');
			}

			if (payment_method !== 'ALL') {
				let existingPaymentMethod;
				try {
					existingPaymentMethod = PAYMENT_METHOD[payment_method];
				} catch (e) {
					console.log('Payment method not found');
					throw new Error('Payment method type not found');
				}
				if (!existingPaymentMethod) {
					console.log('Payment method type not found');
					throw new Error('Payment method type not found');
				}
				whereClause.payment_method = existingPaymentMethod;
			}

			if (searchPatternId.length && searchPatternId !== 'null') {
				// delete whereClause.id; // Remove the id condition if searchPattern is present
				whereClause[Op.or] = [{ id: { [Op.like]: `%${searchPatternId}%` } }];
			} else if (searchPatternMerchantNumber.length && searchPatternMerchantNumber !== 'null') {
				whereClause[Op.or] = [
					{
						'$merchant.whatsapp$': { [Op.like]: `%${searchPatternMerchantNumber}%` },
					},
				];
			} else if (searchPattern.length && searchPattern !== 'null') {
				// delete whereClause.id; // Remove the id condition if searchPattern is present
				whereClause[Op.or] = [
					{ phone_number: { [Op.like]: `%${searchPattern}%` } },
					{ status: { [Op.like]: `%${searchPattern}%` } },
					{ total: { [Op.like]: `%${searchPattern}%` } },
					{ payment_method: { [Op.like]: `%${searchPattern}%` } },
					{ delivery_status: { [Op.like]: `%${searchPattern}%` } },
				];
			}

			if (minAmount > 0 && maxAmount > 0 && maxAmount > minAmount) {
				whereClause.total = {
					[Op.gte]: minAmount,
					[Op.lte]: maxAmount,
				};
			} else if (minAmount > 0 && maxAmount <= 0) {
				whereClause.total = {
					[Op.gte]: minAmount,
				};
			} else if (maxAmount > 0 && minAmount <= 0) {
				whereClause.total = {
					[Op.lte]: maxAmount,
				};
			}

			if (maxAmount > 0 && maxAmount > minAmount) {
				whereClause.total = {
					[Op.lte]: maxAmount,
				};
			}

			const queryOptions = {
				attributes: [
					'id',
					'status',
					'total',
					'created_at',
					'updated_at',
					'code',
					'is_deleted',
					'previous_balance',
					'previous_bonus',
					'total_discount',
					'delivery_fee',
					'delivery_status',
					'payment_method',
					'phone_number',
					'balance_share',
					'bonus_share',
					'total_articles',
				],
				include: [
					{
						model: Client,
						attributes: ['id', 'created_at', 'is_deleted', 'phone_number'],
						as: 'client',
					},
					{
						model: Livreurs,
						as: 'livreur',
					},
					{
						model: Merchants,
						attributes: ['id', 'name', 'logo', 'whatsapp', 'created_at', 'is_deleted'],
						as: 'merchant',
					},
					{
						model: Addresses,
						as: 'address',
					},
					{
						model: CommandeCommandeStatus,
						as: 'commande_commande_statuses',
						include: [
							{
								model: CommandeStatus,
								as: 'commande_status',
							},
						],
					},
					{
						model: ArticleCommande,
						as: 'article_commandes',
						include: [
							{
								model: Article,
								attributes: ['id', 'title', 'description'],
								as: 'article',
								include: [{ model: Media, as: 'media', attributes: ['id', 'name', 'url'] }],
							},
							{
								model: LigneAccompagnements,
								as: 'ligne_accompagnements',
								include: [
									{
										model: Accompagnements,
										as: 'accompagnement',
									},
								],
							},
							{
								model: LigneSupplements,
								as: 'ligne_supplements',
								include: [
									{
										model: Supplements,
										as: 'supplement',
									},
								],
							},
						],
					},
				],
				where: whereClause,
				order: [['id', sort]],
				limit: 500,
				offset: parseInt(skip) || 0,
			};
			const { count, rows: fetchedOrders } = await Commandes.findAndCountAll(queryOptions);
			return { fetchedOrders, count };
		} catch (error) {
			console.log(error.message);
			throw new Error('Failed to fetch orders');
		}
	},
};

export default orderServices;
