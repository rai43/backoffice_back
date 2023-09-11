export default (sequelize, DataTypes, Sequelize) => {
	return sequelize.define(
		'commande_discounts',
		{
			id: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			title: {
				type: DataTypes.STRING(50),
				allowNull: false,
			},
			description: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			discount: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			discount_type: {
				type: DataTypes.ENUM('PERCENTAGE', 'AMOUNT'),
				allowNull: false,
			},
			discount_max: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			active: {
				type: DataTypes.TINYINT,
				allowNull: false,
			},
			is_deleted: {
				type: DataTypes.TINYINT,
				allowNull: false,
				defaultValue: 0,
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
		},
		{
			sequelize,
			tableName: 'commande_discounts',
			timestamps: false,
			indexes: [
				{
					name: 'PRIMARY',
					unique: true,
					using: 'BTREE',
					fields: [{ name: 'id' }],
				},
			],
		}
	);
};
