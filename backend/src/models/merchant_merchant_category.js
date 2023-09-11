export default (sequelize, DataTypes, Sequelize) => {
	return sequelize.define(
		'merchant_merchant_category',
		{
			merchant_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'merchants',
					key: 'id',
				},
			},
			merchant_category_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'merchant_categories',
					key: 'id',
				},
			},
			is_deleted: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
				defaultValue: 0,
			},
			id: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			created_at: {
				type: 'TIMESTAMP',
				defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
				allowNull: false,
			},
			updated_at: {
				type: 'TIMESTAMP',
				defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
				allowNull: false,
			},
		},
		{
			sequelize,
			tableName: 'merchant_merchant_category',
			timestamps: false,
			paranoid: true,

			indexes: [
				{
					name: 'PRIMARY',
					unique: true,
					using: 'BTREE',
					fields: [{ name: 'id' }],
				},
				{
					name: 'FK_merchant_merchant_category_merchant_id',
					using: 'BTREE',
					fields: [{ name: 'merchant_id' }],
				},
				{
					name: 'FK_merchant_merchant_category_merchant_category_id',
					using: 'BTREE',
					fields: [{ name: 'merchant_category_id' }],
				},
			],
		}
	);
};
