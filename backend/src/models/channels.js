export default (sequelize, DataTypes, Sequelize) => {
	return sequelize.define(
		'channels',
		{
			id: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			channel: {
				type: DataTypes.ENUM('HUB2', 'ORANGE', 'MTN', 'MOOV', 'WAVE', 'CINETPAY'),
				allowNull: false,
			},
			status: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			hub2_token: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			hub2_intent_id: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			hub2_payment_id: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			hub2_payment_amount: {
				type: DataTypes.DECIMAL(10, 0),
				allowNull: true,
			},
			hub2_purchage_reference: {
				type: DataTypes.STRING(100),
				allowNull: true,
			},
			hub2_extra: {
				type: DataTypes.TEXT,
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
			created_by: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			deleted_by: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			updated_by: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			extra: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
			final_extra: {
				type: DataTypes.TEXT,
				allowNull: true,
			},
			deleted_at: {
				type: DataTypes.DATE,
				allowNull: true,
			},
		},
		{
			sequelize,
			tableName: 'channels',
			timestamps: false,
			indexes: [
				{
					name: 'PRIMARY',
					unique: true,
					using: 'BTREE',
					fields: [{ name: 'id' }],
				},
			],
		}
	);
};
