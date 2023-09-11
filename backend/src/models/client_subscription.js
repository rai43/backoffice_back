export default (sequelize, DataTypes, Sequelize) => {
	return sequelize.define(
		'client_subscription',
		{
			id: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			subscription_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'subscriptions',
					key: 'id',
				},
			},
			client_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'client',
					key: 'id',
				},
			},
			is_deleted: {
				type: DataTypes.TINYINT,
				allowNull: false,
				defaultValue: 0,
			},
			created_at: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
			},
			updated_at: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
			},
			deleted_at: {
				type: DataTypes.DATE,
				allowNull: true,
			},
		},
		{
			sequelize,
			tableName: 'client_subscription',
			timestamps: false,
			indexes: [
				{
					name: 'PRIMARY',
					unique: true,
					using: 'BTREE',
					fields: [{ name: 'id' }],
				},
				{
					name: 'FK_client_subscription_subscription_id',
					using: 'BTREE',
					fields: [{ name: 'subscription_id' }],
				},
				{
					name: 'FK_client_subscription_client_id',
					using: 'BTREE',
					fields: [{ name: 'client_id' }],
				},
			],
		}
	);
};
