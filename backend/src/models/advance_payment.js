export default (sequelize, DataTypes, Sequelize) => {
	return sequelize.define(
		'advance_payment',
		{
			id: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			loaned_amount: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			outstanding_balance: {
				type: DataTypes.INTEGER,
				allowNull: true,
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
			is_overdue: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
			},
			start_date: {
				type: DataTypes.DATE,
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
			transaction_volume: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			payment_per_week: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			wallet_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{
			sequelize,
			tableName: 'advance_payment',
			timestamps: false,
			indexes: [
				{
					name: 'PRIMARY',
					unique: true,
					using: 'BTREE',
					fields: [{ name: 'id' }],
				},
				{
					name: 'FK7easboo2gh1qj09hbr2ynnis',
					using: 'BTREE',
					fields: [{ name: 'wallet_id' }],
				},
			],
		}
	);
};
