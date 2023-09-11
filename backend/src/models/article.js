export default (sequelize, DataTypes, Sequelize) => {
	return sequelize.define(
		'article',
		{
			id: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			title: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			description: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			price: {
				type: DataTypes.DECIMAL(21, 2),
				allowNull: false,
			},
			discount_price: {
				type: DataTypes.DECIMAL(10, 0),
				allowNull: true,
				defaultValue: 0,
			},
			tags: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			published: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
			},
			category_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'category',
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
			},
			created_by: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			updated_by: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			view_count: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			like_count: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			ondiscount: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
			},
			dynamic_link: {
				type: DataTypes.STRING(225),
				allowNull: true,
			},
			status: {
				type: DataTypes.ENUM('PENDING', 'PUBLISHED', 'REJECTED', 'UNPUBLISHED', 'OUTOFSTOCK'),
				allowNull: true,
				defaultValue: 'PENDING',
			},
			stock_control: {
				type: DataTypes.ENUM('VERIFIED', 'UNVERIFIED'),
				allowNull: true,
				defaultValue: 'UNVERIFIED',
			},
			discount: {
				type: DataTypes.INTEGER,
				allowNull: true,
				defaultValue: 0,
			},
			merchant_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
				references: {
					model: 'merchants',
					key: 'id',
				},
			},
			article_type: {
				type: DataTypes.ENUM('FOOD', 'SHOPPING'),
				allowNull: true,
				defaultValue: 'SHOPPING',
			},
			article_status_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
				references: {
					model: 'article_status',
					key: 'id',
				},
			},
			available: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
			},
			image: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			deleted_at: {
				type: DataTypes.DATE,
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
			tableName: 'article',
			timestamps: false,
			indexes: [
				{
					name: 'PRIMARY',
					unique: true,
					using: 'BTREE',
					fields: [{ name: 'id' }],
				},
				{
					name: 'FK_article_category',
					using: 'BTREE',
					fields: [{ name: 'category_id' }],
				},
				{
					name: 'FK_articles_merchant_id',
					using: 'BTREE',
					fields: [{ name: 'merchant_id' }],
				},
				{
					name: 'FK_article_article_status_id',
					using: 'BTREE',
					fields: [{ name: 'article_status_id' }],
				},
				{
					name: 'FKk0j609vylxvnhs3efdy08i1pj',
					using: 'BTREE',
					fields: [{ name: 'discount_id' }],
				},
			],
		}
	);
};
