export default (sequelize, Sequelize, DataTypes) => {
	const Discount = sequelize.define(
		'discount',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			created_at: {
				type: DataTypes.DATE,
				allowNull: true,
			},
			created_by: {
				type: DataTypes.INTEGER,
				allowNull: true,
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
				allowNull: true,
			},
			updated_by: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			discount_day_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
		},
		{
			tableName: 'discount',
			collate: 'utf8',
			timestamps: false,
		}
	);

	return Discount;
};
