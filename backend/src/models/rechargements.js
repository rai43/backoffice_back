export default (sequelize, DataTypes, Sequelize) => {
	return sequelize.define(
		'rechargements',
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
			previous_balance: {
				type: DataTypes.DECIMAL(10, 0),
				allowNull: false,
			},
			previous_bonus: {
				type: DataTypes.DECIMAL(10, 0),
				allowNull: false,
			},
			phone_number: {
				type: DataTypes.STRING(15),
				allowNull: true,
			},
			type: {
				type: DataTypes.ENUM('RECHARGEMENT', 'BONUS', 'REMBOURSEMENT'),
				allowNull: false,
			},
			status: {
				type: DataTypes.ENUM('PENDING', 'DONE', 'FAILED'),
				allowNull: false,
			},
			reference: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			wallet_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
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
			comments: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			is_deleted: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
			},
			operator_uuid: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			channel_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
				references: {
					model: 'channels',
					key: 'id',
				},
			},
			rechargement_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
				references: {
					model: 'retraits',
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
			tableName: 'rechargements',
			timestamps: false,
			indexes: [
				{
					name: 'PRIMARY',
					unique: true,
					using: 'BTREE',
					fields: [{ name: 'id' }],
				},
				{
					name: 'FK_rechargements_wallet_id',
					using: 'BTREE',
					fields: [{ name: 'wallet_id' }],
				},
				{
					name: 'FK_rechargements_operator_id',
					using: 'BTREE',
					fields: [{ name: 'operator_id' }],
				},
				{
					name: 'FK_rechargements_channel_id',
					using: 'BTREE',
					fields: [{ name: 'channel_id' }],
				},
				{
					name: 'rechargements_rechargement_id_foreign_idx',
					using: 'BTREE',
					fields: [{ name: 'rechargement_id' }],
				},
			],
		}
	);
};
