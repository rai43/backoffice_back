import moment from 'moment';
import db from '../models/init-models.js';
import transactionTypeServices from './transactionType.service.js';

const Rechargement = db.rechargements;
const Wallet = db.wallet;
const Transaction = db.transaction;
const TransactionStatus = db.transaction_status;
const TransactionType = db.transaction_type;
const Operator = db.operator;
const sequelize = db.sequelize;
const Op = db.Sequelize.Op;

const rechargementServices = {
	findUserRechargements: async (walletId, from, to, transaction_type, skip, sort = 'DESC') => {
		try {
			let whereClause = {
				wallet_id: walletId,
				created_at: {
					[Op.lte]: moment(to).toDate() || moment().toDate(),
					[Op.gte]: moment(from).toDate() || moment().subtract(7, 'days').toDate(),
				},
			};

			if (!['ALL', 'RECHARGEMENT', 'RECHARGEMENT_STREET', 'RECHARGEMENT_MOBILE_MONEY', 'BONUS'].includes(transaction_type)) {
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
				whereClause.type = existingTransactionType.code || transaction_type;
			}

			const queryOptions = {
				attributes: ['id', 'amount', 'previous_balance', 'previous_bonus', 'reference', 'phone_number', 'type', 'status', 'created_at'],
				include: [
					{
						model: Wallet,
						attributes: ['id', 'balance', 'bonus'],
						as: 'wallet',
					},
					{
						model: Operator,
						attributes: ['id', 'name', 'logo', 'prefix', 'code', 'is_cash', 'created_at'],
						as: 'operator',
					},
				],
				where: whereClause,
				order: [
					['id', sort],
					['created_at', sort],
				],
				limit: 500,
				offset: parseInt(skip) || 0,
			};
			const { count, rows: fetchedRechargements } = await Rechargement.findAndCountAll(queryOptions);
			return { fetchedRechargements, count };
		} catch (error) {
			console.log(error.message);
			throw new Error('Failed to fetch rechargements');
		}
	},
};

export default rechargementServices;
