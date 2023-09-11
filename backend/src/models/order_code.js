export default (sequelize, DataTypes, Sequelize) => {
	return sequelize.define(
		'order_code',
		{
			id: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			amount: {
				type: DataTypes.DECIMAL(10, 0),
				allowNull: false,
			},
			code: {
				type: DataTypes.STRING(225),
				allowNull: false,
				unique: 'code',
			},
			wallet_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
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
			is_deleted: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
			},
			deleted_at: {
				type: DataTypes.DATE,
				allowNull: true,
			},
		},
		{
			sequelize,
			tableName: 'order_code',
			timestamps: false,
			indexes: [
				{
					name: 'PRIMARY',
					unique: true,
					using: 'BTREE',
					fields: [{ name: 'id' }],
				},
				{
					name: 'code',
					unique: true,
					using: 'BTREE',
					fields: [{ name: 'code' }],
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
