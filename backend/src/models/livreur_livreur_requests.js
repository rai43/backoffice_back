export default (sequelize, DataTypes, Sequelize) => {
	return sequelize.define(
		'livreur_livreur_requests',
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
			livreur_request_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'livreur_requests',
					key: 'id',
				},
			},
			latitude: {
				type: DataTypes.DECIMAL(20, 15),
				allowNull: true,
			},
			longitude: {
				type: DataTypes.DECIMAL(20, 15),
				allowNull: true,
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
		},
		{
			sequelize,
			tableName: 'livreur_livreur_requests',
			timestamps: false,
			indexes: [
				{
					name: 'PRIMARY',
					unique: true,
					using: 'BTREE',
					fields: [{ name: 'id' }],
				},
				{
					name: 'livreur_id',
					unique: true,
					using: 'BTREE',
					fields: [{ name: 'livreur_id' }, { name: 'livreur_request_id' }],
				},
				{
					name: 'livreur_livreur_requests_livreur_id',
					using: 'BTREE',
					fields: [{ name: 'livreur_id' }],
				},
				{
					name: 'livreur_livreur_requests_livreur_request_id',
					using: 'BTREE',
					fields: [{ name: 'livreur_request_id' }],
				},
			],
		}
	);
};
