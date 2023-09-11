export default (sequelize, DataTypes, Sequelize) => {
	return sequelize.define(
		'operator_operator_type',
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
			is_deleted: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
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
			operator_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
				references: {
					model: 'operator',
					key: 'id',
				},
			},
			operator_type_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
				references: {
					model: 'operator_type',
					key: 'id',
				},
			},
			deleted_at: {
				type: DataTypes.DATE,
				allowNull: true,
			},
			fee: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: true,
			},
			wallet_type_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
				references: {
					model: 'wallet_type',
					key: 'id',
				},
			},
		},
		{
			sequelize,
			tableName: 'operator_operator_type',
			timestamps: false,
			indexes: [
				{
					name: 'PRIMARY',
					unique: true,
					using: 'BTREE',
					fields: [{ name: 'id' }],
				},
				{
					name: 'FKkrt2c673nn8dgaejpshqibi3m',
					using: 'BTREE',
					fields: [{ name: 'operator_id' }],
				},
				{
					name: 'FKgcawlxphi8ma9n2qmb3jq97mi',
					using: 'BTREE',
					fields: [{ name: 'operator_type_id' }],
				},
				{
					name: 'FKe67plrc8yvyhfmp124oi9a88l',
					using: 'BTREE',
					fields: [{ name: 'wallet_type_id' }],
				},
			],
		}
	);
};
