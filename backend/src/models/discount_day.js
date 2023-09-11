export default (sequelize, DataTypes, Sequelize) => {
	return sequelize.define(
		'discount_day',
		{
			id: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			active: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
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
			day: {
				type: DataTypes.STRING(9),
				allowNull: false,
			},
			deleted_by: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			discount: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			is_deleted: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
			},
			limit_by_user: {
				type: DataTypes.INTEGER,
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
			client_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
				references: {
					model: 'client',
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
			tableName: 'discount_day',
			timestamps: false,
			indexes: [
				{
					name: 'PRIMARY',
					unique: true,
					using: 'BTREE',
					fields: [{ name: 'id' }],
				},
				{
					name: 'FKao37g5ub9t8p32kolb6g6vbg5',
					using: 'BTREE',
					fields: [{ name: 'client_id' }],
				},
			],
		}
	);
};
