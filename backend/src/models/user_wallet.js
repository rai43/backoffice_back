export default (sequelize, DataTypes, Sequelize) => {
	return sequelize.define(
		'user_wallet',
		{
			id: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			user_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
				references: {
					model: 'user',
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
			creditedAmount: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			deleted_at: {
				type: DataTypes.DATE,
				allowNull: true,
			},
		},
		{
			sequelize,
			tableName: 'user_wallet',
			timestamps: false,
			indexes: [
				{
					name: 'PRIMARY',
					unique: true,
					using: 'BTREE',
					fields: [{ name: 'id' }],
				},
				{
					name: 'FK_user_id',
					using: 'BTREE',
					fields: [{ name: 'user_id' }],
				},
				{
					name: 'FK_wallet_id',
					using: 'BTREE',
					fields: [{ name: 'wallet_id' }],
				},
			],
		}
	);
};
