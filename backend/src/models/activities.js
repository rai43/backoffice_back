export default (sequelize, DataTypes, Sequelize) => {
	return sequelize.define(
		'activities',
		{
			id: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			action: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
			created_at: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
			},
			is_deleted: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
			},
			path: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
			phone_number: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			response_status: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			updated_at: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
			},
			client_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
				references: {
					model: 'client',
					key: 'id',
				},
			},
			wallet_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
				references: {
					model: 'wallet',
					key: 'id',
				},
			},
			deleted_at: {
				type: DataTypes.DATE,
				allowNull: true,
			},
		},
		{
			sequelize,
			tableName: 'activities',
			timestamps: false,
			indexes: [
				{
					name: 'PRIMARY',
					unique: true,
					using: 'BTREE',
					fields: [{ name: 'id' }],
				},
				{
					name: 'FKs5mwna3bq3f2ohqg033aym0op',
					using: 'BTREE',
					fields: [{ name: 'client_id' }],
				},
				{
					name: 'FKj0a1357y70oa9j4pkj7cnfp14',
					using: 'BTREE',
					fields: [{ name: 'wallet_id' }],
				},
			],
		}
	);
};
