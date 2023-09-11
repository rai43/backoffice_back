export default (sequelize, DataTypes, Sequelize) => {
	return sequelize.define(
		'livreur_livreur_request',
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
			updated_at: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
			},
			latitude: {
				type: DataTypes.DOUBLE,
				allowNull: false,
			},
			longitude: {
				type: DataTypes.DOUBLE,
				allowNull: false,
			},
			livreur_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'livreurs',
					key: 'id',
				},
			},
			livreur_request_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'livreur_requests',
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
			tableName: 'livreur_livreur_request',
			timestamps: false,
			indexes: [
				{
					name: 'PRIMARY',
					unique: true,
					using: 'BTREE',
					fields: [{ name: 'id' }],
				},
				{
					name: 'FKpbfkix97ojkj29a9vn4y4waj9',
					using: 'BTREE',
					fields: [{ name: 'livreur_id' }],
				},
				{
					name: 'FK5yxibmwnjjhbld9npq8tj63yg',
					using: 'BTREE',
					fields: [{ name: 'livreur_request_id' }],
				},
			],
		}
	);
};
