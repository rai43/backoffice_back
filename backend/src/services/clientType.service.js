import db from '../models/init-models.js';

const ClientType = db.client_type;
const sequelize = db.sequelize;
const Op = db.Sequelize.Op;

const clientTypeServices = {
	findClientTypeByIdOrCode: async (filter, excludeDeleted, attr = []) => {
		try {
			const whereClause = {
				...filter,
			};

			if (excludeDeleted) {
				whereClause.is_deleted = false;
			}

			const queryOptions = {
				attributes: attr.length
					? attr
					: [
							'id',
							'code',
							'libelle',
							'created_at',
							'is_deleted',
							// 'deleted_at'
					  ],
				where: whereClause,
			};

			return await ClientType.findOne(queryOptions);
		} catch (error) {
			console.log(error.message);
			throw new Error('Failed to fetch client type');
		}
	},
};

export default clientTypeServices;
