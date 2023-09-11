export default (sequelize, DataTypes, Sequelize) => {
	return sequelize.define(
		'ligne_accompagnement',
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
			accompagnement_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'accompagnements',
					key: 'id',
				},
			},
			article_commande_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'article_commande',
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
			tableName: 'ligne_accompagnement',
			timestamps: false,
			indexes: [
				{
					name: 'PRIMARY',
					unique: true,
					using: 'BTREE',
					fields: [{ name: 'id' }],
				},
				{
					name: 'FKhnwvxaoff2msq9gx8aketcnp1',
					using: 'BTREE',
					fields: [{ name: 'accompagnement_id' }],
				},
				{
					name: 'FK5bmseqt78boa612d78jug2bsy',
					using: 'BTREE',
					fields: [{ name: 'article_commande_id' }],
				},
			],
		}
	);
};
