export default (sequelize, DataTypes, Sequelize) => {
	return sequelize.define(
		'view',
		{
			id: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			count: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			created_at: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
			},
			article_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'article',
					key: 'id',
				},
			},
			client_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'client',
					key: 'id',
				},
			},
			updated_at: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
			},
		},
		{
			sequelize,
			tableName: 'view',
			timestamps: false,
			indexes: [
				{
					name: 'PRIMARY',
					unique: true,
					using: 'BTREE',
					fields: [{ name: 'id' }],
				},
				{
					name: 'FKt60def4wkmffu2qmnllttyaqr',
					using: 'BTREE',
					fields: [{ name: 'client_id' }],
				},
				{
					name: 'FK_view_street_new_db.article',
					using: 'BTREE',
					fields: [{ name: 'article_id' }],
				},
				{
					name: 'view_article_id',
					using: 'BTREE',
					fields: [{ name: 'article_id' }],
				},
			],
		}
	);
};
