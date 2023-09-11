export default (sequelize, DataTypes, Sequelize) => {
	return sequelize.define(
		'supplements',
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
			is_deleted: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
				defaultValue: 0,
			},
			name: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
			price: {
				type: DataTypes.DECIMAL(19, 2),
				allowNull: false,
			},
			updated_at: {
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
			quantity: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			accompagnement_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
				references: {
					model: 'accompagnements',
					key: 'id',
				},
			},
			article_commande_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
				references: {
					model: 'article_commande',
					key: 'id',
				},
			},
			available: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
				defaultValue: 1,
			},
			deleted_at: {
				type: DataTypes.DATE,
				allowNull: true,
			},
		},
		{
			sequelize,
			tableName: 'supplements',
			timestamps: false,
			indexes: [
				{
					name: 'PRIMARY',
					unique: true,
					using: 'BTREE',
					fields: [{ name: 'id' }],
				},
				{
					name: 'FK3eplri7mop71f4snwc683vu8j',
					using: 'BTREE',
					fields: [{ name: 'article_id' }],
				},
				{
					name: 'FK_supplements_accompagnement_id',
					using: 'BTREE',
					fields: [{ name: 'accompagnement_id' }],
				},
				{
					name: 'FK_supplements_article_commande_id',
					using: 'BTREE',
					fields: [{ name: 'article_commande_id' }],
				},
			],
		}
	);
};
