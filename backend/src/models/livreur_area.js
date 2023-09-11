export default (sequelize, DataTypes, Sequelize) => {
	return sequelize.define(
		'livreur_area',
		{
			id: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			livreur_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'livreurs',
					key: 'id',
				},
			},
			area_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'areas',
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
			tableName: 'livreur_area',
			timestamps: false,
			indexes: [
				{
					name: 'PRIMARY',
					unique: true,
					using: 'BTREE',
					fields: [{ name: 'id' }],
				},
				{
					name: 'FK_livreur_area_livreur_id',
					using: 'BTREE',
					fields: [{ name: 'livreur_id' }],
				},
				{
					name: 'FK_livreur_area_area_id',
					using: 'BTREE',
					fields: [{ name: 'area_id' }],
				},
			],
		}
	);
};
