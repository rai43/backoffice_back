export default (sequelize, DataTypes, Sequelize) => {
	return sequelize.define(
		'operation',
		{
			id: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			previous_balance: {
				type: DataTypes.BIGINT,
				allowNull: true,
			},
			previous_bonus: {
				type: DataTypes.BIGINT,
				allowNull: true,
			},
			operation_type_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
				references: {
					model: 'operation_type',
					key: 'id',
				},
			},
			wallet_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'wallet',
					key: 'id',
				},
			},
			transaction_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
				references: {
					model: 'transaction',
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
			created_by: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			updated_by: {
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
			amount: {
				type: DataTypes.DECIMAL(21, 2),
				allowNull: true,
			},
			libelle: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			deleted_at: {
				type: DataTypes.DATE,
				allowNull: true,
			},
		},
		{
			sequelize,
			tableName: 'operation',
			timestamps: false,
			indexes: [
				{
					name: 'PRIMARY',
					unique: true,
					using: 'BTREE',
					fields: [{ name: 'id' }],
				},
				{
					name: 'FK_operation_type',
					using: 'BTREE',
					fields: [{ name: 'operation_type_id' }],
				},
				{
					name: 'FK_wallet',
					using: 'BTREE',
					fields: [{ name: 'wallet_id' }],
				},
				{
					name: 'FK_transaction',
					using: 'BTREE',
					fields: [{ name: 'transaction_id' }],
				},
			],
		}
	);
};
