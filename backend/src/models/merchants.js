export default (sequelize, DataTypes, Sequelize) => {
	return sequelize.define(
		'merchants',
		{
			id: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			name: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
			whatsapp: {
				type: DataTypes.STRING(15),
				allowNull: true,
			},
			logo: {
				type: DataTypes.STRING(225),
				allowNull: true,
			},
			location: {
				type: DataTypes.STRING(225),
				allowNull: true,
			},
			client_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'client',
					key: 'id',
				},
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
				type: DataTypes.BOOLEAN,
				allowNull: true,
				defaultValue: 0,
			},
			location_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
				references: {
					model: 'locations',
					key: 'id',
				},
			},
			radius: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			latitude: {
				type: DataTypes.DECIMAL(20, 15),
				allowNull: true,
			},
			longitude: {
				type: DataTypes.DECIMAL(20, 15),
				allowNull: true,
			},
			deleted_at: {
				type: DataTypes.DATE,
				allowNull: true,
			},
		},
		{
			sequelize,
			tableName: 'merchants',
			timestamps: false,
			indexes: [
				{
					name: 'PRIMARY',
					unique: true,
					using: 'BTREE',
					fields: [{ name: 'id' }],
				},
				{
					name: 'FK_merchants_client_id',
					using: 'BTREE',
					fields: [{ name: 'client_id' }],
				},
				{
					name: 'FK_merchants_location_id',
					using: 'BTREE',
					fields: [{ name: 'location_id' }],
				},
			],
		}
	);
};
