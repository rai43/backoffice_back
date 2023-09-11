export default (sequelize, DataTypes, Sequelize) => {
	return sequelize.define(
		'payment_methods',
		{
			id: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			name: {
				type: DataTypes.STRING(100),
				allowNull: false,
			},
			method: {
				type: DataTypes.ENUM('STREET', 'CASH'),
				allowNull: false,
			},
			fee_name: {
				type: DataTypes.STRING(100),
				allowNull: false,
			},
			fee_percentage: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			fee_max_value: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			active: {
				type: DataTypes.TINYINT,
				allowNull: false,
				defaultValue: 1,
			},
			logo: {
				type: DataTypes.STRING(255),
				allowNull: false,
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
			is_deleted: {
				type: DataTypes.TINYINT,
				allowNull: false,
				defaultValue: 0,
			},
			deleted_at: {
				type: DataTypes.DATE,
				allowNull: true,
			},
		},
		{
			sequelize,
			tableName: 'payment_methods',
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
