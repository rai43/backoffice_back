export default (sequelize, DataTypes, Sequelize) => {
	return sequelize.define(
		'client_sub_category',
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
			logo: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			name: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			updated_at: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
			},
			updated_by: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			category_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
				references: {
					model: 'client_category',
					key: 'id',
				},
			},
		},
		{
			sequelize,
			tableName: 'client_sub_category',
			timestamps: false,
			indexes: [
				{
					name: 'PRIMARY',
					unique: true,
					using: 'BTREE',
					fields: [{ name: 'id' }],
				},
				{
					name: 'FK2j688brpram9tr2dpmnlhrj8m',
					using: 'BTREE',
					fields: [{ name: 'category_id' }],
				},
			],
		}
	);
};
