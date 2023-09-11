export default (sequelize, DataTypes, Sequelize) => {
	return sequelize.define(
		'sizes',
		{
			id: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			size: {
				type: DataTypes.STRING(15),
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
			created_by: {
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
			updated_by: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
		},
		{
			sequelize,
			tableName: 'sizes',
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
