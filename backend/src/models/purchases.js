export default (sequelize, DataTypes, Sequelize) => {
	return sequelize.define(
		'purchases',
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
			purchase_date: {
				type: DataTypes.DATEONLY,
				allowNull: true,
			},
			article_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'article',
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
		},
		{
			sequelize,
			tableName: 'purchases',
			timestamps: false,
			indexes: [
				{
					name: 'PRIMARY',
					unique: true,
					using: 'BTREE',
					fields: [{ name: 'id' }],
				},
				{
					name: 'FK_purchases_article_id',
					using: 'BTREE',
					fields: [{ name: 'article_id' }],
				},
				{
					name: 'FK_purchases_size_id',
					using: 'BTREE',
					fields: [{ name: 'size_id' }],
				},
			],
		}
	);
};
