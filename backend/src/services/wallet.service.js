import db from '../models/init-models.js';

const Wallet = db.wallet;
const sequelize = db.sequelize;
const Op = db.Sequelize.Op;

const walletServices = {
	findWallet: async (filter) => {
		try {
			const whereClause = {
				...filter,
			};
			const queryOptions = {
				where: whereClause,
			};

			return Wallet.findOne(queryOptions);
		} catch (error) {
			console.log(error.message);
			throw new Error('Failed to fetch client type');
		}
	},
};

export default walletServices;
