export default (sequelize, Sequelize, DataTypes) => {
	const Bonus = sequelize.define(
		'bonus',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			active: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			},
			bonus_type: {
				type: DataTypes.ENUM('RECHARGEMENT', 'ORDER_PAYMENT', 'INVITATION', 'OPEN_APP'),
				allowNull: true,
			},
			bonus_value_type: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			created_at: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: DataTypes.NOW,
			},
			deleted_at: {
				type: DataTypes.DATE,
				allowNull: true,
			},
			is_deleted: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			},
			updated_at: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: DataTypes.NOW,
				onUpdate: DataTypes.NOW,
			},
			value: {
				type: DataTypes.DECIMAL(19, 2),
				allowNull: false,
			},
			createdAt: {
				type: DataTypes.DATE,
				allowNull: true,
			},
			updatedAt: {
				type: DataTypes.DATE,
				allowNull: true,
			},
			limit: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			description: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			title: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
		},
		{
			tableName: 'bonus',
			collate: 'utf8',
			timestamps: false,
		}
	);

	return Bonus;
};
