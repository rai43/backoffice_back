export default (sequelize, DataTypes, Sequelize) => {
	return sequelize.define(
		'order_conflit',
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
			id_deleted: {
				type: DataTypes.TINYINT,
				allowNull: true,
			},
			motif: {
				type: DataTypes.STRING(225),
				allowNull: true,
			},
			status: {
				type: DataTypes.STRING(9),
				allowNull: true,
			},
			updated_at: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
			},
			order_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
				references: {
					model: 'order',
					key: 'id',
				},
			},
		},
		{
			sequelize,
			tableName: 'order_conflit',
			timestamps: false,
			indexes: [
				{
					name: 'PRIMARY',
					unique: true,
					using: 'BTREE',
					fields: [{ name: 'id' }],
				},
				{
					name: 'FKotcbo0dgka91unnldwscwpk8y',
					using: 'BTREE',
					fields: [{ name: 'order_id' }],
				},
			],
		}
	);
};
