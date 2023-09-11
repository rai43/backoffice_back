export default (sequelize, DataTypes, Sequelize) => {
	return sequelize.define(
		'article_commande',
		{
			id: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			price: {
				type: DataTypes.DECIMAL(10, 0),
				allowNull: false,
			},
			quantity: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			article_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'article',
					key: 'id',
				},
			},
			commande_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'commandes',
					key: 'id',
				},
			},
			size_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
				references: {
					model: 'sizes',
					key: 'id',
				},
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
			is_deleted: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
				defaultValue: 0,
			},
			discount_price: {
				type: DataTypes.DECIMAL(10, 0),
				allowNull: true,
				defaultValue: 0,
			},
			comment: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			deleted_at: {
				type: DataTypes.DATE,
				allowNull: true,
			},
			discount: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: true,
			},
			total: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: true,
			},
			discount_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
				references: {
					model: 'discounts',
					key: 'id',
				},
			},
		},
		{
			sequelize,
			tableName: 'article_commande',
			timestamps: false,
			indexes: [
				{
					name: 'PRIMARY',
					unique: true,
					using: 'BTREE',
					fields: [{ name: 'id' }],
				},
				{
					name: 'FK_article_commande_article_id',
					using: 'BTREE',
					fields: [{ name: 'article_id' }],
				},
				{
					name: 'FK_article_commande_commande_id',
					using: 'BTREE',
					fields: [{ name: 'commande_id' }],
				},
				{
					name: 'FK_article_commande_size_id',
					using: 'BTREE',
					fields: [{ name: 'size_id' }],
				},
				{
					name: 'FKkokrqcjkyqybgrpyk2dem6tl1',
					using: 'BTREE',
					fields: [{ name: 'discount_id' }],
				},
			],
		}
	);
};
