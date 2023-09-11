export default (sequelize, DataTypes, Sequelize) => {
	return sequelize.define(
		'category_sizes',
		{
			size_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			category_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
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
			tableName: 'category_sizes',
			timestamps: false,
			indexes: [
				{
					name: 'PRIMARY',
					unique: true,
					using: 'BTREE',
					fields: [{ name: 'category_id' }, { name: 'size_id' }],
				},
				{
					name: 'FKfa1pi69s0vucmu182q7t6rpq2',
					using: 'BTREE',
					fields: [{ name: 'size_id' }],
				},
			],
		}
	);
};
