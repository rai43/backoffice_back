import db from '../models/init-models.js';

const UserType = db.user_type;
const sequelize = db.sequelize;
const Op = db.Sequelize.Op;

const userTypeServices = {
	findUserType: async (id, attr) => {
		try {
			const whereClause = {
				id,
			};
			const queryOptions = {
				attributes: attr || ['id', 'code', 'libelle', 'is_deleted', 'created_at'],
				where: whereClause,
			};

			return await UserType.findOne(queryOptions);
		} catch (error) {
			throw new Error('Failed to fetch user type');
		}
	},

	findUserTypes: async (active, inactive) => {
		try {
			let userTypes;
			const whereClause = {};

			if (!(active || inactive)) {
				return [];
			} else if ((active || inactive) && !(active && inactive)) {
				whereClause.is_deleted = !!inactive;
			}

			const queryOptions = {
				attributes: ['id', 'code', 'libelle', 'is_deleted', 'created_at'],
				where: whereClause,
				order: [
					['libelle', 'ASC'],
					// ["nom", sort],
					['is_deleted', 'ASC'],
				],
			};

			userTypes = await UserType.findAll(queryOptions);

			return userTypes;
		} catch (error) {
			throw new Error('Failed to fetch user types');
		}
	},
};

export default userTypeServices;
