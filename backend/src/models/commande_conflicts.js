export default (sequelize, DataTypes, Sequelize) => {
	return sequelize.define(
		'commande_conflicts',
		{
			id: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			motif: {
				type: DataTypes.STRING(225),
				allowNull: true,
			},
			status: {
				type: DataTypes.ENUM('PENDING', 'VALIDATED', 'REFUSED'),
				allowNull: true,
			},
			commande_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'commandes',
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
			deleted_at: {
				type: DataTypes.DATE,
				allowNull: true,
			},
		},
		{
			sequelize,
			tableName: 'commande_conflicts',
			timestamps: false,
			indexes: [
				{
					name: 'PRIMARY',
					unique: true,
					using: 'BTREE',
					fields: [{ name: 'id' }],
				},
				{
					name: 'FK_commande_conflicts_commande_id',
					using: 'BTREE',
					fields: [{ name: 'commande_id' }],
				},
			],
		}
	);
};
