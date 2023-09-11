export default (sequelize, Sequelize, DataTypes) => {
	const Order = sequelize.define(
		'order',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
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
				defaultValue: DataTypes.NOW,
			},
			updated_at: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: DataTypes.NOW,
				onUpdate: DataTypes.NOW,
			},
			deleted_at: {
				type: DataTypes.DATE,
				allowNull: true,
			},
			code: {
				type: DataTypes.STRING(255),
				allowNull: false,
				unique: true,
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
			},
			previous_balance: {
				type: DataTypes.DECIMAL(21, 2),
				allowNull: true,
			},
			previous_bonus: {
				type: DataTypes.DECIMAL(21, 2),
				allowNull: true,
			},
		},
		{
			tableName: 'order',
			collate: 'utf8',
			timestamps: false,
		}
	);

	return Order;
};
