export default (sequelize, DataTypes, Sequelize) => {
	return sequelize.define(
		'commande_issue',
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
			issue_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'issues',
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
			tableName: 'commande_issue',
			timestamps: false,
			indexes: [
				{
					name: 'PRIMARY',
					unique: true,
					using: 'BTREE',
					fields: [{ name: 'id' }],
				},
				{
					name: 'FK_commande_issue_commande_id',
					using: 'BTREE',
					fields: [{ name: 'commande_id' }],
				},
				{
					name: 'FK_commande_issue_issue_id',
					using: 'BTREE',
					fields: [{ name: 'issue_id' }],
				},
			],
		}
	);
};
