export default (sequelize, DataTypes, Sequelize) => {
	return sequelize.define(
		'discount',
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
			created_by: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			deleted_by: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			discount: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			discount_date: {
				type: DataTypes.DATEONLY,
				allowNull: true,
			},
			is_deleted: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
			},
			limit_by_user: {
				type: DataTypes.BIGINT,
				allowNull: true,
			},
			merchant_share: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			updated_at: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
			},
			updated_by: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			discount_day_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
				references: {
					model: 'discount_day',
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
			tableName: 'discount',
			timestamps: false,
			indexes: [
				{
					name: 'PRIMARY',
					unique: true,
					using: 'BTREE',
					fields: [{ name: 'id' }],
				},
				{
					name: 'FKo3j61cvpdag20j0a2t3avhl0o',
					using: 'BTREE',
					fields: [{ name: 'discount_day_id' }],
				},
			],
		}
	);
};
