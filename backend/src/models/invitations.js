export default (sequelize, DataTypes, Sequelize) => {
	return sequelize.define(
		'invitations',
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
			bonus_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
				references: {
					model: 'bonus',
					key: 'id',
				},
			},
			invitee_client_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
				references: {
					model: 'client',
					key: 'id',
				},
			},
			inviter_client_id: {
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
			tableName: 'invitations',
			timestamps: false,
			indexes: [
				{
					name: 'PRIMARY',
					unique: true,
					using: 'BTREE',
					fields: [{ name: 'id' }],
				},
				{
					name: 'FK41n32g7ngdxr92dkhnfbomelp',
					using: 'BTREE',
					fields: [{ name: 'bonus_id' }],
				},
				{
					name: 'FKsei4qhw2g7rdw3qh5k7hsu380',
					using: 'BTREE',
					fields: [{ name: 'invitee_client_id' }],
				},
				{
					name: 'FKl32s109cyouoh99r498ubk20t',
					using: 'BTREE',
					fields: [{ name: 'inviter_client_id' }],
				},
			],
		}
	);
};
