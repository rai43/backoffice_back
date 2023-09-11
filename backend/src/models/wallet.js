export default (sequelize, DataTypes, Sequelize) => {
	return sequelize.define(
		'wallet',
		{
			id: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			balance: {
				type: DataTypes.INTEGER,
				allowNull: true,
				defaultValue: 0,
			},
			bonus: {
				type: DataTypes.INTEGER,
				allowNull: true,
				defaultValue: 0,
			},
			client_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
				references: {
					model: 'client',
					key: 'id',
				},
			},
			wallet_status_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
				references: {
					model: 'wallet_status',
					key: 'id',
				},
			},
			receive_limit_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
				references: {
					model: 'limit_operation',
					key: 'id',
				},
			},
			send_limit_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
				references: {
					model: 'limit_operation',
					key: 'id',
				},
			},
			wallet_type_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
				references: {
					model: 'wallet_type',
					key: 'id',
				},
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
			is_seller: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
				defaultValue: 0,
			},
			qrcode: {
				type: DataTypes.STRING(255),
				allowNull: true,
				unique: 'UK_dfv5cy7iesuu6gx19s34k5v51',
			},
			commissionTotal: {
				type: DataTypes.DOUBLE,
				allowNull: true,
				defaultValue: 0,
			},
			commission_total: {
				type: DataTypes.DOUBLE,
				allowNull: true,
				defaultValue: 0,
			},
			deleted_at: {
				type: DataTypes.DATE,
				allowNull: true,
			},
		},
		{
			sequelize,
			tableName: 'wallet',
			timestamps: false,
			indexes: [
				{
					name: 'PRIMARY',
					unique: true,
					using: 'BTREE',
					fields: [{ name: 'id' }],
				},
				{
					name: 'UK_dfv5cy7iesuu6gx19s34k5v51',
					unique: true,
					using: 'BTREE',
					fields: [{ name: 'qrcode' }],
				},
				{
					name: 'FK_client',
					using: 'BTREE',
					fields: [{ name: 'client_id' }],
				},
				{
					name: 'FK_wallet_type',
					using: 'BTREE',
					fields: [{ name: 'wallet_type_id' }],
				},
				{
					name: 'FK_wallet_limit_operation',
					using: 'BTREE',
					fields: [{ name: 'receive_limit_id' }],
				},
				{
					name: 'FK_wallet_limit_operation_2',
					using: 'BTREE',
					fields: [{ name: 'send_limit_id' }],
				},
				{
					name: 'FK_wallet_status',
					using: 'BTREE',
					fields: [{ name: 'wallet_status_id' }],
				},
			],
		}
	);
};
