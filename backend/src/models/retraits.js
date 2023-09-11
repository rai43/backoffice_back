// const Sequelize = require('sequelize');
export default (sequelize, DataTypes, Sequelize) => {
	return sequelize.define(
		'retraits',
		{
			id: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			amount: {
				type: DataTypes.DECIMAL(10, 0),
				allowNull: false,
			},
			phone_number: {
				type: DataTypes.STRING(10),
				allowNull: false,
			},
			status: {
				type: DataTypes.ENUM('PENDING', 'SUCCESS', 'FAILED'),
				allowNull: false,
			},
			operator_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'operator',
					key: 'id',
				},
			},
			wallet_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'wallet',
					key: 'id',
				},
			},
			hub2_transfert_id: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			failure_cause: {
				type: DataTypes.STRING(255),
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
			reference: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			fee: {
				type: DataTypes.DECIMAL(10, 2),
				allowNull: true,
			},
			deleted_at: {
				type: DataTypes.DATE,
				allowNull: true,
			},
		},
		{
			sequelize,
			tableName: 'retraits',
			timestamps: false,
			indexes: [
				{
					name: 'PRIMARY',
					unique: true,
					using: 'BTREE',
					fields: [{ name: 'id' }],
				},
				{
					name: 'FK_retraits_operator_id',
					using: 'BTREE',
					fields: [{ name: 'operator_id' }],
				},
				{
					name: 'FK_retraits_wallet_id',
					using: 'BTREE',
					fields: [{ name: 'wallet_id' }],
				},
			],
		}
	);
};
