export default (sequelize, Sequelize, DataTypes) => {
	const Operator = sequelize.define(
		'operator',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			name: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			logo: {
				type: DataTypes.TEXT('medium'),
				allowNull: true,
			},
			prefix: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			is_cash: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
			},
			created_at: {
				type: DataTypes.DATE,
				defaultValue: DataTypes.NOW,
			},
			deleted_at: {
				type: DataTypes.DATE,
				allowNull: true,
			},
			updated_at: {
				type: DataTypes.DATE,
				allowNull: true,
			},
			created_by: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			updated_by: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			deleted_by: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			is_deleted: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
			},
			code: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
		},
		{
			tableName: 'operator',
			collate: 'utf8',
			timestamps: false,
		}
	);

	return Operator;
};
