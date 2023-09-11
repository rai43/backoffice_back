import db from '../models/init-models.js';

const TransactionType = db.transaction_type;
const sequelize = db.sequelize;
const Op = db.Sequelize.Op;

const transactionTypeServices = {
	findTransactionType: async (code, attr = ['id', 'code', 'libelle', 'created_at']) => {
		try {
			const queryOptions = {
				attributes: attr,
				where: {
					code,
				},
			};

			return await TransactionType.findOne(queryOptions);
		} catch (error) {
			console.log(error.message);
			throw new Error('Failed to fetch transaction type');
		}
	},
};

export default transactionTypeServices;
