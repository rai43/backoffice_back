export default (sequelize, Sequelize, DataTypes) => {
	const DiscountDay = sequelize.define(
		'discount_day',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			active: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
			},
			created_at: {
				type: DataTypes.DATE,
				allowNull: true,
			},
			created_by: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			day: {
				type: DataTypes.STRING(9),
				allowNull: false,
			},
			deleted_at: {
				type: DataTypes.DATE,
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
				allowNull: true,
			},
			updated_by: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			client_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
		},
		{
			tableName: 'discount_day',
			collate: 'utf8',
			timestamps: false,
		}
	);

	return DiscountDay;
};
