export default (sequelize, Sequelize, DataTypes) => {
	const CommandeDiscount = sequelize.define(
		'commande_discounts',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			title: {
				type: DataTypes.STRING(50),
				allowNull: false,
				collate: 'utf8mb4_unicode_ci',
			},
			description: {
				type: DataTypes.STRING(255),
				allowNull: true,
				collate: 'utf8mb4_unicode_ci',
			},
			discount: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			discount_type: {
				type: DataTypes.ENUM('PERCENTAGE', 'AMOUNT'),
				allowNull: false,
				collate: 'utf8mb4_unicode_ci',
			},
			discount_max: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			active: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
			},
			is_deleted: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: 0,
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
		},
		{
			tableName: 'commande_discounts',
			collate: 'utf8',
			timestamps: false,
		}
	);

	return CommandeDiscount;
};
