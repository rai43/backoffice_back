export default (sequelize, DataTypes, Sequelize) => {
	return sequelize.define(
		'category',
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
				type: DataTypes.STRING(225),
				allowNull: true,
			},
			type: {
				type: DataTypes.ENUM('ARTICLE', 'CLIENT'),
				allowNull: true,
				defaultValue: 'CLIENT',
			},
			old_category_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			name: {
				type: DataTypes.STRING(225),
				allowNull: false,
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
			is_active: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
			},
			parent_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
				references: {
					model: 'category',
					key: 'id',
				},
			},
			group_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
				references: {
					model: 'group',
					key: 'id',
				},
			},
			active: {
				type: DataTypes.TINYINT,
				allowNull: false,
				defaultValue: 1,
			},
			deleted_at: {
				type: DataTypes.DATE,
				allowNull: true,
			},
		},
		{
			sequelize,
			tableName: 'category',
			timestamps: false,
			indexes: [
				{
					name: 'PRIMARY',
					unique: true,
					using: 'BTREE',
					fields: [{ name: 'id' }],
				},
				{
					name: 'FK_category_group_id',
					using: 'BTREE',
					fields: [{ name: 'group_id' }],
				},
				{
					name: 'FK_category_parent_id',
					using: 'BTREE',
					fields: [{ name: 'parent_id' }],
				},
			],
		}
	);
};
