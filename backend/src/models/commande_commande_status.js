export default (sequelize, DataTypes, Sequelize) => {
	return sequelize.define(
		'commande_commande_status',
		{
			id: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			commande_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'commandes',
					key: 'id',
				},
			},
			commande_status_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'commande_status',
					key: 'id',
				},
			},
			is_deleted: {
				type: DataTypes.TINYINT,
				allowNull: false,
				defaultValue: 0,
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
			deleted_at: {
				type: DataTypes.DATE,
				allowNull: true,
			},
		},
		{
			sequelize,
			tableName: 'commande_commande_status',
			timestamps: false,
			indexes: [
				{
					name: 'PRIMARY',
					unique: true,
					using: 'BTREE',
					fields: [{ name: 'id' }],
				},
				{
					name: 'FK2kj50l71lokknlra9tl46mhk7',
					using: 'BTREE',
					fields: [{ name: 'commande_id' }],
				},
				{
					name: 'FKqdw79i7rcoumjwx6cqw9nbjn9',
					using: 'BTREE',
					fields: [{ name: 'commande_status_id' }],
				},
			],
		}
	);
};
