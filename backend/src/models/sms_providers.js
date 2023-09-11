export default (sequelize, DataTypes, Sequelize) => {
	return sequelize.define(
		'sms_providers',
		{
			id: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			sms_operator_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'sms_operators',
					key: 'id',
				},
			},
			provider: {
				type: DataTypes.ENUM('ORANGE', 'LETEXTO', 'TERMII', 'INFOBIP'),
				allowNull: false,
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
			tableName: 'sms_providers',
			timestamps: false,
			indexes: [
				{
					name: 'PRIMARY',
					unique: true,
					using: 'BTREE',
					fields: [{ name: 'id' }],
				},
				{
					name: 'sms_operator_id',
					unique: true,
					using: 'BTREE',
					fields: [{ name: 'sms_operator_id' }, { name: 'provider' }],
				},
				{
					name: 'FK_sms_providers_sms_operator_id',
					using: 'BTREE',
					fields: [{ name: 'sms_operator_id' }],
				},
			],
		}
	);
};
