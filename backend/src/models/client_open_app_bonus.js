export default (sequelize, DataTypes, Sequelize) => {
	return sequelize.define(
		'client_open_app_bonus',
		{
			id: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			start_date: {
				type: DataTypes.DATE,
				allowNull: false,
			},
			end_date: {
				type: DataTypes.DATE,
				allowNull: false,
			},
			bonus_date: {
				type: DataTypes.DATE,
				allowNull: true,
			},
			bonus_value: {
				type: DataTypes.DECIMAL(10, 0),
				allowNull: true,
			},
			client_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'client',
					key: 'id',
				},
			},
			bonus_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'bonus',
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
			tableName: 'client_open_app_bonus',
			timestamps: false,
			indexes: [
				{
					name: 'PRIMARY',
					unique: true,
					using: 'BTREE',
					fields: [{ name: 'id' }],
				},
				{
					name: 'FK_client_open_app_bonus_client_id',
					using: 'BTREE',
					fields: [{ name: 'client_id' }],
				},
				{
					name: 'FK_client_open_app_bonus_bonus_id',
					using: 'BTREE',
					fields: [{ name: 'bonus_id' }],
				},
			],
		}
	);
};
