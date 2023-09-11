import { matchedData, validationResult } from 'express-validator';
import orderServices from '../services/order.service.js';

import db from '../models/init-models.js';

const Client = db.client;
const Livreurs = db.livreurs;
const Wallet = db.wallet;
const WalletType = db.wallet_type;
const Transaction = db.transaction;
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

const orderController = {
	getOrders: async (req, res, next) => {
		const valResult = validationResult(req);
		if (!valResult.isEmpty()) {
			console.log(valResult);
			res.statusMessage = 'Invalid params passed';
			return res.sendStatus(400);
		}
		const requestData = matchedData(req);
		console.log(requestData);

		const MIN_AMOUNT = parseInt(requestData.minAmount);
		const MAX_AMOUNT = parseInt(requestData.maxAmount);
		const FROM = requestData.from;
		const TO = requestData.to;
		const SKIP = requestData.skip;
		const ORDER_STATUS = requestData.orderStatus;
		const PAYMENT_METHOD = requestData.paymentMethod;
		const SEARCH_PATTERN = requestData.searchPattern || 'null';
		const SEARCH_PATTERN_ID = requestData.searchPatternId || 'null';
		const SEARCH_PATTERN_MERCHANT_NUMBER = requestData.searchPatternMerchantNumber || 'null';

		let fetchedOrders, count;

		try {
			({ fetchedOrders, count } = await orderServices.findAllOrders(
				ORDER_STATUS,
				PAYMENT_METHOD,
				MIN_AMOUNT,
				MAX_AMOUNT,
				FROM,
				TO,
				SKIP,
				SEARCH_PATTERN,
				SEARCH_PATTERN_ID,
				SEARCH_PATTERN_MERCHANT_NUMBER
			));
		} catch (error) {
			console.log(error.message);
			res.statusMessage = 'Could not fetch the list of orders';
			return res.sendStatus(500);
		}

		if (!fetchedOrders) {
			res.statusMessage = 'Could not fetch the list of orders';
			return res.sendStatus(500);
		}

		return res.json({
			message: 'Successfully fetch the list of orders',
			orders: fetchedOrders,
			skip: parseInt(SKIP) + (fetchedOrders.length || 0),
			totalCount: count,
		});
	},

	assignLivreur: async (req, res, next) => {
		const valResult = validationResult(req);
		if (!valResult.isEmpty()) {
			console.log(valResult);
			res.statusMessage = 'Invalid params passed';
			return res.sendStatus(400);
		}
		const requestData = matchedData(req);
		console.log(requestData);

		const COMMAND_ID = requestData.commandId;
		const LIVREUR_ID = requestData.livreurId;

		let order;
		try {
			const queryOptions = {
				where: { id: COMMAND_ID },
			};

			order = await Commandes.findOne(queryOptions);
		} catch (error) {
			console.log('here error 1', error);

			res.statusMessage = 'Error while fetching the order';
			return res.sendStatus(500);
		}

		console.log('order', order);
		if (!order) {
			console.log('here error');
			res.statusMessage = 'Could not fetch the order';
			return res.sendStatus(500);
		}

		let existingLivreur;

		try {
			const queryOptions = {
				where: { id: LIVREUR_ID },
			};
			existingLivreur = await Livreurs.findOne(queryOptions);
		} catch (error) {
			res.statusMessage = 'Could not fetch the livreur info';
			return res.sendStatus(500);
		}

		if (!existingLivreur) {
			res.statusMessage = 'Could not fetch the livreur info';
			return res.sendStatus(500);
		}

		let commande;
		try {
			const queryOptions = {
				where: { id: COMMAND_ID },
			};
			commande = await Commandes.findOne(queryOptions);
		} catch (error) {
			res.statusMessage = 'Could not fetch the commande';
			return res.sendStatus(500);
		}

		if (!commande) {
			res.statusMessage = 'Could not fetch the commande';
			return res.sendStatus(500);
		}

		const commandeUpdateObj = {
			livreur_id: existingLivreur.id,
			updated_at: new Date(),
			update_by: req.userData.userId,
		};

		try {
			await commande.update(commandeUpdateObj);
			await commande.save();
		} catch (error) {
			res.statusMessage = 'Could not assign the livreur';
			return res.sendStatus(500);
		}

		let commandeToDisplay;
		try {
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
				where: { id: commande.id },
			};
			commandeToDisplay = await Commandes.findOne(queryOptions);
		} catch (error) {
			console.log(error.message);
			res.statusMessage = 'Could not fetch the commande';
			return res.sendStatus(500);
		}

		if (!commandeToDisplay) {
			res.statusMessage = 'Could not fetch the commande';
			return res.sendStatus(500);
		}

		return res.json({
			message: 'Successfully saved the order',
			order: commandeToDisplay,
		});
	},

	setOrderStatus: async (req, res, next) => {
		const valResult = validationResult(req);
		if (!valResult.isEmpty()) {
			console.log(valResult);
			res.statusMessage = 'Invalid params passed';
			return res.sendStatus(400);
		}
		const requestData = matchedData(req);
		console.log(requestData);

		const COMMAND_ID = requestData.commandId;
		const LIVREUR_ID = requestData.livreurId;

		let order;
		try {
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
						model: CommandeCommandeStatus,
						as: 'commande_commande_statuses',
						include: [
							{
								model: CommandeStatus,
								as: 'commande_status',
							},
						],
					},
				],
				where: { id: COMMAND_ID },
			};

			order = await Commandes.findOne(queryOptions);
		} catch (error) {
			res.statusMessage = 'Could not fetch the order';
			return res.sendStatus(500);
		}

		if (!order) {
			res.statusMessage = 'Could not fetch the order';
			return res.sendStatus(500);
		}

		const orderStatusCode = order?.commande_commande_statuses[order?.commande_commande_statuses?.length - 1]?.commande_status?.code;
		let newCommandStatus;
		if (orderStatusCode === 'PENDING') {
			let existingRegisteredCommandStatus;

			try {
				const queryOptions = {
					where: { code: 'REGISTERED' },
				};
				existingRegisteredCommandStatus = await CommandeStatus.findOne(queryOptions);
			} catch (error) {
				console.log(error.message);
				res.statusMessage = 'Could not fetch the existing commande status';
				return res.sendStatus(500);
			}

			if (!existingRegisteredCommandStatus) {
				res.statusMessage = 'Could not fetch the order';
				return res.sendStatus(500);
			}

			try {
				newCommandStatus = await CommandeCommandeStatus.create({
					commande_id: order.id,
					commande_status_id: existingRegisteredCommandStatus?.id,
					is_deleted: false,
				});
			} catch (error) {
				console.log(error.message);
				res.statusMessage = 'Could not save the status';
				return res.sendStatus(500);
			}
		} else if (orderStatusCode === 'REGISTERED') {
			let existingInProcessCommandStatus;

			try {
				const queryOptions = {
					where: { code: 'INPROCESS' },
				};
				existingInProcessCommandStatus = await CommandeStatus.findOne(queryOptions);
			} catch (error) {
				console.log(error.message);
				res.statusMessage = 'Could not fetch the existing commande status';
				return res.sendStatus(500);
			}

			if (!existingInProcessCommandStatus) {
				res.statusMessage = 'Could not fetch the order';
				return res.sendStatus(500);
			}

			let existingLivreur;

			try {
				const queryOptions = {
					where: { id: LIVREUR_ID },
				};
				existingLivreur = await Livreurs.findOne(queryOptions);
			} catch (error) {
				console.log(error.message);
				res.statusMessage = 'Could not fetch the livreur info';
				return res.sendStatus(500);
			}

			if (!existingLivreur) {
				res.statusMessage = 'Could not fetch the livreur info';
				return res.sendStatus(500);
			}

			let commande;
			try {
				const queryOptions = {
					where: { id: COMMAND_ID },
				};
				commande = await Commandes.findOne(queryOptions);
			} catch (error) {
				console.log(error.message);
				res.statusMessage = 'Could not fetch the commande';
				return res.sendStatus(500);
			}

			if (!commande) {
				res.statusMessage = 'Could not fetch the commande';
				return res.sendStatus(500);
			}

			const commandeUpdateObj = {
				livreur_id: existingLivreur.id,
				updated_at: new Date(),
				update_by: req.userData.userId,
			};

			await commande.update(commandeUpdateObj);
			await commande.save();

			try {
				newCommandStatus = await CommandeCommandeStatus.create({
					commande_id: order.id,
					commande_status_id: existingInProcessCommandStatus?.id,
					is_deleted: false,
				});
			} catch (error) {
				console.log(error.message);
				res.statusMessage = 'Could not save the status';
				return res.sendStatus(500);
			}
		} else if (orderStatusCode === 'INPROCESS') {
			let existingInDeliveryCommandStatus;

			try {
				const queryOptions = {
					where: { code: 'INDELIVERY' },
				};
				existingInDeliveryCommandStatus = await CommandeStatus.findOne(queryOptions);
			} catch (error) {
				console.log(error.message);
				res.statusMessage = 'Could not fetch the existing commande status';
				return res.sendStatus(500);
			}

			if (!existingInDeliveryCommandStatus) {
				res.statusMessage = 'Could not fetch the order';
				return res.sendStatus(500);
			}

			try {
				newCommandStatus = await CommandeCommandeStatus.create({
					commande_id: order.id,
					commande_status_id: existingInDeliveryCommandStatus?.id,
					is_deleted: false,
				});
			} catch (error) {
				console.log(error.message);
				res.statusMessage = 'Could not save the status';
				return res.sendStatus(500);
			}
		} else if (orderStatusCode === 'INDELIVERY') {
			let existingDeliveredCommandStatus;

			try {
				const queryOptions = {
					where: { code: 'DELIVERED' },
				};
				existingDeliveredCommandStatus = await CommandeStatus.findOne(queryOptions);
			} catch (error) {
				console.log(error.message);
				res.statusMessage = 'Could not fetch the existing commande status';
				return res.sendStatus(500);
			}

			if (!existingDeliveredCommandStatus) {
				res.statusMessage = 'Could not fetch the order';
				return res.sendStatus(500);
			}

			try {
				newCommandStatus = await CommandeCommandeStatus.create({
					commande_id: order.id,
					commande_status_id: existingDeliveredCommandStatus?.id,
					is_deleted: false,
				});
			} catch (error) {
				console.log(error.message);
				res.statusMessage = 'Could not save the status';
				return res.sendStatus(500);
			}
		}

		if (!newCommandStatus) {
			res.statusMessage = 'Could not fetch the order';
			return res.sendStatus(500);
		}

		let commande;
		try {
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
				where: { id: COMMAND_ID },
			};
			commande = await Commandes.findOne(queryOptions);
		} catch (error) {
			console.log(error.message);
			res.statusMessage = 'Could not fetch the commande';
			return res.sendStatus(500);
		}

		if (!commande) {
			res.statusMessage = 'Could not fetch the commande';
			return res.sendStatus(500);
		}

		return res.json({
			message: 'Successfully saved the order',
			order: commande,
		});
	},

	cancelOrder: async (req, res, next) => {
		const valResult = validationResult(req);
		if (!valResult.isEmpty()) {
			console.log(valResult);
			res.statusMessage = 'Invalid params passed';
			return res.sendStatus(400);
		}
		const requestData = matchedData(req);
		console.log(requestData);

		const COMMAND_ID = requestData.commandId;

		let order;
		try {
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
					'client_id',
				],
				include: [
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
				],
				where: { id: COMMAND_ID },
			};

			order = await Commandes.findOne(queryOptions);
		} catch (error) {
			res.statusMessage = 'Could not fetch the order';
			return res.sendStatus(500);
		}

		if (!order) {
			res.statusMessage = 'Could not fetch the order';
			return res.sendStatus(500);
		}

		let existingCancelCommandStatus;

		try {
			const queryOptions = {
				where: { code: 'CANCELED' },
			};
			existingCancelCommandStatus = await CommandeStatus.findOne(queryOptions);
		} catch (error) {
			res.statusMessage = 'Could not fetch the existing commande status';
			return res.sendStatus(500);
		}

		if (!existingCancelCommandStatus) {
			res.statusMessage = 'Could not fetch the order';
			return res.sendStatus(500);
		}
		let newCommandStatus;
		try {
			newCommandStatus = await CommandeCommandeStatus.create({
				commande_id: order.id,
				commande_status_id: existingCancelCommandStatus?.id,
				is_deleted: false,
			});
		} catch (error) {
			console.log(error.message);
			res.statusMessage = 'Could not save the status';
			return res.sendStatus(500);
		}

		if (!newCommandStatus) {
			res.statusMessage = 'Could not save the status';
			return res.sendStatus(500);
		}

		let personalWallet;
		try {
			const whereClause = { client_id: order.id, wallet_type_id: 1 };
			personalWallet = await Wallet.findOne({
				where: whereClause,
			});
		} catch (error) {
			res.statusMessage = 'Could not fetch the user personal wallet';
			return res.sendStatus(500);
		}

		if (!personalWallet) {
			res.statusMessage = 'Could not fetch the user personal wallet';
			return res.sendStatus(500);
		}

		const walletUpdateObj = {
			bonus: personalWallet.bonus + order.bonus_share,
			updated_at: new Date(),
		};

		if (order.payment_method === 'STREET') {
			walletUpdateObj.balance = personalWallet.balance + order.balance_share;
		}

		try {
			console.log(personalWallet);
			await personalWallet.update(walletUpdateObj);
			await personalWallet.save();
		} catch (error) {
			console.log(error);
			res.statusMessage = "Could revert the user's money";
			return res.sendStatus(500);
		}

		let commande;
		try {
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
				where: { id: COMMAND_ID },
			};
			commande = await Commandes.findOne(queryOptions);
		} catch (error) {
			console.log(error.message);
			res.statusMessage = 'Could not fetch the commande';
			return res.sendStatus(500);
		}

		if (!commande) {
			res.statusMessage = 'Could not fetch the commande';
			return res.sendStatus(500);
		}

		return res.json({
			message: 'Successfully saved the new order status',
			order: commande,
		});
	},
};

export default orderController;
