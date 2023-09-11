import moment from 'moment';
import db from '../models/init-models.js';
import transactionTypeServices from './transactionType.service.js';

const Client = db.client;
const Wallet = db.wallet;
const WalletType = db.wallet_type;
const Transaction = db.transaction;
const TransactionStatus = db.transaction_status;
const TransactionType = db.transaction_type;
const Commandes = db.commandes;
const sequelize = db.sequelize;
const Op = db.Sequelize.Op;

const transactionServices = {
	findUserTransactionForDisplay: async (filter) => {
		try {
			let whereClause = {
				...filter,
			};

			const queryOptions = {
				attributes: ['id', 'amount', 'reference', 'created_at'],
				include: [
					{
						model: Wallet,
						attributes: ['id', 'balance', 'bonus', 'client_id'],
						as: 'sender_wallet',
						include: [
							{
								model: Client,
								attributes: ['id', 'phone_number'],
								as: 'client',
							},
						],
					},
					{
						model: Wallet,
						attributes: ['id', 'balance', 'bonus', 'client_id'],
						as: 'receiver_wallet',
						include: [
							{
								model: Client,
								attributes: ['id', 'phone_number'],
								as: 'client',
							},
						],
					},
					{
						model: TransactionType,
						attributes: ['id', 'code', 'libelle'],
						as: 'transaction_type',
					},
					{
						model: TransactionStatus,
						attributes: ['id', 'code', 'libelle'],
						as: 'transaction_status',
					},
				],
				where: whereClause,
			};
			const fetchedTransaction = await Transaction.findOne(queryOptions);
			return fetchedTransaction;
		} catch (error) {
			console.log(error.message);
			throw new Error('Failed to fetch transaction');
		}
	},

	findUserTransactionsAndGroupByDay: async (walletId, from, to, transaction_type, skip, sort = 'DESC') => {
		try {
			// SELECT
			//     year,
			//     GROUP_CONCAT(CONCAT('(', transaction_date, ', ', money_earned, ')')) AS values
			// FROM
			//     earnings
			// GROUP BY
			//     year
			// ORDER BY
			//     year;
			let whereClause = {
				[Op.or]: [{ sender_wallet_id: walletId }, { receiver_wallet_id: walletId }],
				created_at: {
					[Op.lte]: moment(to).toDate() || moment().toDate(),
					[Op.gte]: moment(from).toDate() || moment().subtract(7, 'days').toDate(),
				},
			};

			if (!['ALL', 'PAYMENT', 'RECHARGEMENT', 'RETRAIT', 'RECHARGEMENT_STREET', 'RECHARGEMENT_MOBILE_MONEY', 'BONUS'].includes(transaction_type)) {
				console.log('Transaction type not matching');
				throw new Error('Transaction type not matching');
			}

			if (transaction_type !== 'ALL') {
				let existingTransactionType;
				try {
					existingTransactionType = await transactionTypeServices.findTransactionType(transaction_type, ['id']);
				} catch (e) {
					console.log('Transaction type not found');
					throw new Error('Transaction type not found');
				}
				if (!existingTransactionType) {
					console.log('Transaction type not found');
					throw new Error('Transaction type not found');
				}
				whereClause.transaction_type_id = existingTransactionType.id;
			}

			const queryOptions = {
				// [sequelize.literal("CONCAT(user.nom, ' ', user.prenom)"), 'nom_complet']
				// ['id', 'created_at', [sequelize.literal("GROUP_CONCAT(CONCAT('(', transaction_date, ', ', money_earned, ')'))"), 'transactions_string']]
				attributes: ['id', 'amount', 'reference', 'created_at'],
				include: [
					{
						model: Wallet,
						attributes: ['id', 'balance', 'bonus', 'client_id'],
						as: 'sender_wallet',
						include: [
							{
								model: Client,
								attributes: ['id', 'phone_number'],
								as: 'client',
							},
						],
					},
					{
						model: Wallet,
						attributes: ['id', 'balance', 'bonus', 'client_id'],
						as: 'receiver_wallet',
						include: [
							{
								model: Client,
								attributes: ['id', 'phone_number'],
								as: 'client',
							},
						],
					},
					{
						model: TransactionType,
						attributes: ['id', 'code', 'libelle'],
						as: 'transaction_type',
					},
					{
						model: TransactionStatus,
						attributes: ['id', 'code', 'libelle'],
						as: 'transaction_status',
					},
				],
				where: whereClause,
				order: [
					['id', sort],
					// ["nom", sort],
				],
				limit: 500,
				offset: parseInt(skip) || 0,
			};
			const { count, rows: fetchedTransactions } = await Transaction.findAndCountAll(queryOptions);
			return { fetchedTransactions, count };
		} catch (error) {
			console.log(error.message);
			throw new Error('Failed to fetch transaction');
		}
	},

	findAllTransactions: async (minAmount, maxAmount, from, to, transaction_type, skip, searchPattern = 'null', sort = 'DESC') => {
		try {
			let whereClause = {
				created_at: {
					[Op.lte]: moment(to).toDate() || moment().toDate(),
					[Op.gte]: moment(from).toDate() || moment().subtract(7, 'days').toDate(),
				},
			};

			if (!['ALL', 'PAYMENT', 'RECHARGEMENT', 'RETRAIT', 'RECHARGEMENT_STREET', 'RECHARGEMENT_MOBILE_MONEY', 'BONUS'].includes(transaction_type)) {
				console.log('Transaction type not matching');
				throw new Error('Transaction type not matching');
			}

			if (transaction_type !== 'ALL') {
				let existingTransactionType;
				try {
					existingTransactionType = await transactionTypeServices.findTransactionType(transaction_type, ['id']);
				} catch (e) {
					console.log('Transaction type not found');
					throw new Error('Transaction type not found');
				}
				if (!existingTransactionType) {
					console.log('Transaction type not found');
					throw new Error('Transaction type not found');
				}
				whereClause.transaction_type_id = existingTransactionType.id;
			}

			if (searchPattern.length && searchPattern !== 'null') {
				// delete whereClause.id; // Remove the id condition if searchPattern is present
				whereClause[Op.or] = [{ amount: { [Op.like]: `%${searchPattern}%` } }, { reference: { [Op.like]: `%${searchPattern}%` } }];
			}

			if (minAmount > 0 && maxAmount > 0 && maxAmount > minAmount) {
				whereClause.amount = {
					[Op.gte]: minAmount,
					[Op.lte]: maxAmount,
				};
			} else if (minAmount > 0 && maxAmount <= 0) {
				whereClause.amount = {
					[Op.gte]: minAmount,
				};
			} else if (maxAmount > 0 && minAmount <= 0) {
				whereClause.amount = {
					[Op.lte]: maxAmount,
				};
			}

			if (maxAmount > 0 && maxAmount > minAmount) {
				whereClause.amount = {
					[Op.lte]: maxAmount,
				};
			}

			const queryOptions = {
				attributes: ['id', 'amount', 'reference', 'created_at'],
				include: [
					{
						model: Wallet,
						attributes: ['id', 'balance', 'bonus', 'client_id'],
						as: 'sender_wallet',
						include: [
							{
								model: Client,
								attributes: ['id', 'phone_number'],
								as: 'client',
							},
							{
								model: WalletType,
								attributes: ['id', 'code', 'libelle'],
								as: 'wallet_type',
							},
						],
					},
					{
						model: Wallet,
						attributes: ['id', 'balance', 'bonus', 'client_id'],
						as: 'receiver_wallet',
						include: [
							{
								model: Client,
								attributes: ['id', 'phone_number'],
								as: 'client',
							},
							{
								model: WalletType,
								attributes: ['id', 'code', 'libelle'],
								as: 'wallet_type',
							},
						],
					},
					{
						model: TransactionType,
						attributes: ['id', 'code', 'libelle'],
						as: 'transaction_type',
						order: [['code', 'ASC']],
					},
					{
						model: TransactionStatus,
						attributes: ['id', 'code', 'libelle'],
						as: 'transaction_status',
						order: [['code', sort]],
					},
					{
						model: Commandes,
						attributes: ['id', 'status', 'total', 'code', 'created_at', 'previous_balance', 'previous_bonus', 'total_discount', 'payment_method', 'balance_share', 'bonus_share'],
						as: 'commande',
					},
				],
				where: whereClause,
				order: [
					['id', sort],
					// ['transaction_type.code', 'ASC'],
					// ['transaction_status.code', sort],
				],
				limit: 500,
				offset: parseInt(skip) || 0,
			};
			const { count, rows: fetchedTransactions } = await Transaction.findAndCountAll(queryOptions);
			return { fetchedTransactions, count };
		} catch (error) {
			console.log(error.message);
			throw new Error('Failed to fetch transaction');
		}
	},
};

export default transactionServices;
