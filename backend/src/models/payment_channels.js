export default (sequelize, DataTypes, Sequelize) => {
	return sequelize.define(
		'payment_channels',
		{
			id: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			operator_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'operator',
					key: 'id',
				},
			},
			channel: {
				type: DataTypes.ENUM('HUB2', 'ORANGE', 'MTN', 'MOOV', 'WAVE', 'CINETPAY'),
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
			tableName: 'payment_channels',
			timestamps: false,
			indexes: [
				{
					name: 'PRIMARY',
					unique: true,
					using: 'BTREE',
					fields: [{ name: 'id' }],
				},
				{
					name: 'FK_payment_channels_operator_id',
					using: 'BTREE',
					fields: [{ name: 'operator_id' }],
				},
			],
		}
	);
};
