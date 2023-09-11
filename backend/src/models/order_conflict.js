export default (sequelize, DataTypes, Sequelize) => {
	return sequelize.define(
		'order_conflict',
		{
			id: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			created_at: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
			},
			id_deleted: {
				type: DataTypes.TINYINT,
				allowNull: true,
			},
			motif: {
				type: DataTypes.STRING(225),
				allowNull: true,
			},
			status: {
				type: DataTypes.STRING(9),
				allowNull: true,
			},
			updated_at: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
			},
			order_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
				references: {
					model: 'order',
					key: 'id',
				},
			},
			is_deleted: {
				type: DataTypes.TINYINT,
				allowNull: true,
			},
			deleted_at: {
				type: DataTypes.DATE,
				allowNull: true,
			},
		},
		{
			sequelize,
			tableName: 'order_conflict',
			timestamps: false,
			indexes: [
				{
					name: 'PRIMARY',
					unique: true,
					using: 'BTREE',
					fields: [{ name: 'id' }],
				},
				{
					name: 'FKtrdpqnkpaxdnpqdjb54lwjmu8',
					using: 'BTREE',
					fields: [{ name: 'order_id' }],
				},
			],
		}
	);
};
