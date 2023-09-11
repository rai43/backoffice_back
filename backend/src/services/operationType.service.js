import db from '../models/init-models.js';

const OperationType = db.operation_type;
const sequelize = db.sequelize;
const Op = db.Sequelize.Op;

const operationTypeServices = {
	findOperationType: async (filter) => {
		try {
			const whereClause = {
				...filter,
			};
			const queryOptions = {
				where: whereClause,
			};

			return OperationType.findOne(queryOptions);
		} catch (error) {
			console.log(error.message);
			throw new Error('Failed to fetch operation type');
		}
	},
};

export default operationTypeServices;
