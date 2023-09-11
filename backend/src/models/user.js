export default (sequelize, DataTypes, Sequelize) => {
	return sequelize.define(
		'user',
		{
			id: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			nom: {
				type: DataTypes.STRING(225),
				allowNull: true,
			},
			prenom: {
				type: DataTypes.STRING(225),
				allowNull: true,
			},
			telephone: {
				type: DataTypes.STRING(225),
				allowNull: true,
			},
			email: {
				type: DataTypes.STRING(225),
				allowNull: true,
			},
			adresse: {
				type: DataTypes.STRING(225),
				allowNull: true,
			},
			password: {
				type: DataTypes.STRING(225),
				allowNull: true,
			},
			user_type_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
				references: {
					model: 'user_type',
					key: 'id',
				},
			},
			is_locked: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
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
			created_by: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			updated_by: {
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
			is_connected: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
			},
			pers_a_contacter: {
				type: DataTypes.STRING(225),
				allowNull: true,
			},
			token: {
				type: DataTypes.STRING(225),
				allowNull: true,
			},
			deleted_at: {
				type: DataTypes.DATE,
				allowNull: true,
			},
		},
		{
			sequelize,
			tableName: 'user',
			timestamps: false,
			indexes: [
				{
					name: 'PRIMARY',
					unique: true,
					using: 'BTREE',
					fields: [{ name: 'id' }],
				},
				{
					name: 'fk_user_type_user',
					using: 'BTREE',
					fields: [{ name: 'user_type_id' }],
				},
			],
		}
	);
};
