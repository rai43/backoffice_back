import moment from 'moment';
import db from '../models/init-models.js';
import transactionTypeServices from './transactionType.service.js';

const Rechargement = db.rechargements;
const Wallet = db.wallet;
const Retrait = db.retraits;
const TransactionStatus = db.transaction_status;
const Operator = db.operator;
const sequelize = db.sequelize;
const Op = db.Sequelize.Op;

const retraitServices = {
	findUserRequests: async (walletId, from, to, skip, sort = 'DESC') => {
		try {
			let whereClause = {
				wallet_id: walletId,
				created_at: {
					[Op.lte]: moment(to).toDate() || moment().toDate(),
					[Op.gte]: moment(from).toDate() || moment().subtract(7, 'days').toDate(),
				},
			};

			const queryOptions = {
				attributes: ['id', 'amount', 'reference', 'phone_number', 'status', 'created_at'],
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
			const { count, rows: fetchedRetraits } = await Retrait.findAndCountAll(queryOptions);
			return { fetchedRetraits, count };
		} catch (error) {
			console.log(error.message);
			throw new Error('Failed to fetch retraits');
		}
	},
};

export default retraitServices;
