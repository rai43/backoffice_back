export default (sequelize, DataTypes, Sequelize) => {
	return sequelize.define(
		'livreurs',
		{
			id: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			name: {
				type: DataTypes.STRING(100),
				allowNull: true,
			},
			first_name: {
				type: DataTypes.STRING(100),
				allowNull: true,
			},
			last_name: {
				type: DataTypes.STRING(100),
				allowNull: true,
			},
			second_phone_number: {
				type: DataTypes.STRING(10),
				allowNull: true,
			},
			whatsapp: {
				type: DataTypes.STRING(10),
				allowNull: true,
			},
			emergency_contact: {
				type: DataTypes.STRING(10),
				allowNull: true,
			},
			photo: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			idcard: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			driving_licence: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			status: {
				type: DataTypes.ENUM('PENDING', 'ACCEPTED', 'SUSPENDED', 'BANNED'),
				allowNull: false,
				defaultValue: 'PENDING',
			},
			has_moto: {
				type: DataTypes.TINYINT,
				allowNull: false,
				defaultValue: 0,
			},
			has_driving_licence: {
				type: DataTypes.TINYINT,
				allowNull: false,
				defaultValue: 0,
			},
			available: {
				type: DataTypes.TINYINT,
				allowNull: false,
				defaultValue: 1,
			},
			latitude: {
				type: DataTypes.DECIMAL(20, 15),
				allowNull: true,
			},
			longitude: {
				type: DataTypes.DECIMAL(20, 15),
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
			available_at: {
				type: DataTypes.DATE,
				allowNull: true,
			},
			deleted_at: {
				type: DataTypes.DATE,
				allowNull: true,
			},
		},
		{
			sequelize,
			tableName: 'livreurs',
			timestamps: false,
			indexes: [
				{
					name: 'PRIMARY',
					unique: true,
					using: 'BTREE',
					fields: [{ name: 'id' }],
				},
				{
					name: 'FK_livreurs_client_id',
					using: 'BTREE',
					fields: [{ name: 'client_id' }],
				},
			],
		}
	);
};
