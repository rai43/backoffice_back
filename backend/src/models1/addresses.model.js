export default (sequelize, Sequelize, DataTypes) => {
	const Address = sequelize.define(
		'addresses',
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
			deleted_at: {
				type: DataTypes.DATE,
				allowNull: true,
			},
			detail: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			is_deleted: {
				type: DataTypes.BOOLEAN,
				defaultValue: false,
			},
			label: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			latitude: {
				type: DataTypes.DOUBLE,
				allowNull: false,
			},
			longitude: {
				type: DataTypes.DOUBLE,
				allowNull: false,
			},
			name: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
			updated_at: {
				type: DataTypes.DATE,
				allowNull: true,
			},
		},
		{
			tableName: 'addresses',
			collate: 'utf8',
			timestamps: false,
		}
	);

	return Address;
};
