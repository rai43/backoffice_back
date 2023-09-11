export default (sequelize, DataTypes, Sequelize) => {
	return sequelize.define(
		'category_client',
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
			created_by: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			deleted_by: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			is_deleted: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
			},
			updated_at: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
			},
			updated_by: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			category_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
				references: {
					model: 'category',
					key: 'id',
				},
			},
			client_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
				references: {
					model: 'client',
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
			tableName: 'category_client',
			timestamps: false,
			indexes: [
				{
					name: 'PRIMARY',
					unique: true,
					using: 'BTREE',
					fields: [{ name: 'id' }],
				},
				{
					name: 'FK9fqothn96icfbd7yfiyry77b',
					using: 'BTREE',
					fields: [{ name: 'category_id' }],
				},
				{
					name: 'FKh7f4gpj6wt6tcqpxbbe1k4ktm',
					using: 'BTREE',
					fields: [{ name: 'client_id' }],
				},
			],
		}
	);
};
