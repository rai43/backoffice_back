export default (sequelize, DataTypes, Sequelize) => {
	return sequelize.define(
		'article_accompagnement',
		{
			id: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			article_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'article',
					key: 'id',
				},
			},
			accompagnement_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'accompagnements',
					key: 'id',
				},
			},
			is_deleted: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: 0,
			},
			created_at: {
				type: DataTypes.DATE,
				allowNull: false,
			},
			updated_at: {
				type: DataTypes.DATE,
				allowNull: false,
			},
			deleted_at: {
				type: DataTypes.DATE,
				allowNull: true,
			},
		},
		{
			sequelize,
			tableName: 'article_accompagnement',
			timestamps: false,
			indexes: [
				{
					name: 'PRIMARY',
					unique: true,
					using: 'BTREE',
					fields: [{ name: 'id' }],
				},
				{
					name: 'FK_article_accompagnement_article_id',
					using: 'BTREE',
					fields: [{ name: 'article_id' }],
				},
				{
					name: 'FK_article_accompagnement_accompagnement_id',
					using: 'BTREE',
					fields: [{ name: 'accompagnement_id' }],
				},
			],
		}
	);
};
