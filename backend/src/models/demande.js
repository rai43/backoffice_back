export default (sequelize, DataTypes, Sequelize) => {
	return sequelize.define(
		'demande',
		{
			id: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			amount: {
				type: DataTypes.BIGINT,
				allowNull: true,
			},
			phone_number: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			wallet_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
				references: {
					model: 'wallet',
					key: 'id',
				},
			},
			operator_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
				references: {
					model: 'operator',
					key: 'id',
				},
			},
			demande_status_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'demande_status',
					key: 'id',
				},
			},
			demande_type_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
				references: {
					model: 'demande_type',
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
			motif_refus: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			cenceled_at: {
				type: DataTypes.DATE,
				allowNull: true,
			},
			uuid: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			canceled_at: {
				type: DataTypes.DATE,
				allowNull: true,
			},
			operator_uuid: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			deleted_at: {
				type: DataTypes.DATE,
				allowNull: true,
			},
		},
		{
			sequelize,
			tableName: 'demande',
			timestamps: false,
			indexes: [
				{
					name: 'PRIMARY',
					unique: true,
					using: 'BTREE',
					fields: [{ name: 'id' }],
				},
				{
					name: 'FK_demande_wallet',
					using: 'BTREE',
					fields: [{ name: 'wallet_id' }],
				},
				{
					name: 'FK_demande_status',
					using: 'BTREE',
					fields: [{ name: 'demande_status_id' }],
				},
				{
					name: 'FK_demande_operator',
					using: 'BTREE',
					fields: [{ name: 'operator_id' }],
				},
				{
					name: 'FK_demande_type',
					using: 'BTREE',
					fields: [{ name: 'demande_type_id' }],
				},
			],
		}
	);
};
