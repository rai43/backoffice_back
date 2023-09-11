export default (sequelize, Sequelize, DataTypes) => {
	const OrderCode = sequelize.define(
		'order_code',
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
			code: {
				type: DataTypes.STRING(225),
				allowNull: false,
				unique: true,
			},
			wallet_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
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
			is_deleted: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
			},
		},
		{
			tableName: 'order_code',
			collate: 'utf8',
			timestamps: false,
		}
	);

	return OrderCode;
};
