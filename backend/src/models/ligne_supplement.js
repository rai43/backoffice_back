export default (sequelize, DataTypes, Sequelize) => {
	return sequelize.define(
		'ligne_supplement',
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
			price: {
				type: DataTypes.DECIMAL(19, 2),
				allowNull: false,
			},
			quantity: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			updated_at: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
			},
			article_commande_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'article_commande',
					key: 'id',
				},
			},
			supplement_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'supplements',
					key: 'id',
				},
			},
			deleted_at: {
				type: DataTypes.DATE,
				allowNull: true,
			},
		},
		{
			sequelize,
			tableName: 'ligne_supplement',
			timestamps: false,
			indexes: [
				{
					name: 'PRIMARY',
					unique: true,
					using: 'BTREE',
					fields: [{ name: 'id' }],
				},
				{
					name: 'FK7pdoyaeqr2d463bccixwguntr',
					using: 'BTREE',
					fields: [{ name: 'article_commande_id' }],
				},
				{
					name: 'FKpbnws0hxd0t3cuqsjdct2qv9x',
					using: 'BTREE',
					fields: [{ name: 'supplement_id' }],
				},
			],
		}
	);
};
