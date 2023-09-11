export default (sequelize, DataTypes, Sequelize) => {
	return sequelize.define(
		'order',
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
			status: {
				type: DataTypes.ENUM('PAID', 'COMPLETED', 'CANCELED', 'REFUSED'),
				allowNull: false,
			},
			order_code_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'order_code',
					key: 'id',
				},
			},
			completed_at: {
				type: DataTypes.DATE,
				allowNull: true,
			},
			canceled_at: {
				type: DataTypes.DATE,
				allowNull: true,
			},
			refused_at: {
				type: DataTypes.DATE,
				allowNull: true,
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
			code: {
				type: DataTypes.STRING(255),
				allowNull: false,
				unique: 'UK_28dgdc5siorptevhwl566i27v',
			},
			is_deleted: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
			},
			paid_at: {
				type: DataTypes.DATE,
				allowNull: true,
			},
			client_wallet_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
				references: {
					model: 'wallet',
					key: 'id',
				},
			},
			previous_balance: {
				type: DataTypes.DECIMAL(21, 2),
				allowNull: true,
			},
			previous_bonus: {
				type: DataTypes.DECIMAL(21, 2),
				allowNull: true,
			},
			deleted_at: {
				type: DataTypes.DATE,
				allowNull: true,
			},
		},
		{
			sequelize,
			tableName: 'order',
			timestamps: false,
			indexes: [
				{
					name: 'PRIMARY',
					unique: true,
					using: 'BTREE',
					fields: [{ name: 'id' }],
				},
				{
					name: 'UK_28dgdc5siorptevhwl566i27v',
					unique: true,
					using: 'BTREE',
					fields: [{ name: 'code' }],
				},
				{
					name: 'FK_order_code_id',
					using: 'BTREE',
					fields: [{ name: 'order_code_id' }],
				},
				{
					name: 'FK8ihhdwp1temy48gwvw8v2khp5',
					using: 'BTREE',
					fields: [{ name: 'client_wallet_id' }],
				},
			],
		}
	);
};
