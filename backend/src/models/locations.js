export default (sequelize, DataTypes, Sequelize) => {
	return sequelize.define(
		'locations',
		{
			id: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			created_at: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
			},
			detail: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			is_deleted: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
				defaultValue: 0,
			},
			latitude: {
				type: DataTypes.DECIMAL(20, 15),
				allowNull: true,
			},
			longitude: {
				type: DataTypes.DECIMAL(20, 15),
				allowNull: true,
			},
			name: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
			updated_at: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
			},
			radius: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			merchant_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
				references: {
					model: 'merchants',
					key: 'id',
				},
			},
			deleted_at: {
				type: DataTypes.DATE,
				allowNull: true,
			},
		},
		{
			sequelize,
			tableName: 'locations',
			timestamps: false,
			indexes: [
				{
					name: 'PRIMARY',
					unique: true,
					using: 'BTREE',
					fields: [{ name: 'id' }],
				},
				{
					name: 'FK_locations_merchant_id',
					using: 'BTREE',
					fields: [{ name: 'merchant_id' }],
				},
			],
		}
	);
};
