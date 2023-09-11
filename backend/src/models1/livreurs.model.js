export default (sequelize, Sequelize, DataTypes) => {
	const Livreur = sequelize.define(
		'livreurs',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			name: {
				type: DataTypes.STRING(100),
				collate: 'utf8mb4_unicode_ci',
			},
			first_name: {
				type: DataTypes.STRING(100),
				collate: 'utf8mb4_unicode_ci',
			},
			last_name: {
				type: DataTypes.STRING(100),
				collate: 'utf8mb4_unicode_ci',
			},
			second_phone_number: {
				type: DataTypes.STRING(10),
				collate: 'utf8mb4_unicode_ci',
			},
			whatsapp: {
				type: DataTypes.STRING(10),
				collate: 'utf8mb4_unicode_ci',
			},
			emergency_contact: {
				type: DataTypes.STRING(10),
				collate: 'utf8mb4_unicode_ci',
			},
			photo: {
				type: DataTypes.STRING(255),
				collate: 'utf8mb4_unicode_ci',
			},
			idcard: {
				type: DataTypes.STRING(255),
				collate: 'utf8mb4_unicode_ci',
			},
			driving_licence: {
				type: DataTypes.STRING(255),
				collate: 'utf8mb4_unicode_ci',
			},
			status: {
				type: DataTypes.ENUM('PENDING', 'ACCEPTED', 'SUSPENDED', 'BANNED'),
				allowNull: false,
				defaultValue: 'PENDING',
				collate: 'utf8mb4_unicode_ci',
			},
			has_moto: {
				type: DataTypes.TINYINT(4),
				allowNull: false,
				defaultValue: 0,
			},
			has_driving_licence: {
				type: DataTypes.TINYINT(4),
				allowNull: false,
				defaultValue: 0,
			},
			available: {
				type: DataTypes.TINYINT(4),
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
			},
			is_deleted: {
				type: DataTypes.TINYINT(4),
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
			available_at: {
				type: DataTypes.DATE,
				allowNull: true,
			},
		},
		{
			tableName: 'livreurs',
			collate: 'utf8',
			timestamps: false,
		}
	);

	return Livreur;
};
