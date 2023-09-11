export default (sequelize, DataTypes, Sequelize) => {
	return sequelize.define(
		'transaction',
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
			reference: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			sender_wallet_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
				references: {
					model: 'wallet',
					key: 'id',
				},
			},
			receiver_wallet_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
				references: {
					model: 'wallet',
					key: 'id',
				},
			},
			transaction_street_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			transaction_type_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
				references: {
					model: 'transaction_type',
					key: 'id',
				},
			},
			transaction_status_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
				references: {
					model: 'transaction_status',
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
			recharge_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
				references: {
					model: 'recharge',
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
			discount_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
				references: {
					model: 'discount',
					key: 'id',
				},
			},
			order_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
				references: {
					model: 'order',
					key: 'id',
				},
			},
			bonus_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
				references: {
					model: 'bonus',
					key: 'id',
				},
			},
			commande_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
				references: {
					model: 'commandes',
					key: 'id',
				},
			},
			retrait_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
				references: {
					model: 'retraits',
					key: 'id',
				},
			},
			rechargement_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
				references: {
					model: 'rechargements',
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
			tableName: 'transaction',
			timestamps: false,
			indexes: [
				{
					name: 'PRIMARY',
					unique: true,
					using: 'BTREE',
					fields: [{ name: 'id' }],
				},
				{
					name: 'FK_transaction_type',
					using: 'BTREE',
					fields: [{ name: 'transaction_type_id' }],
				},
				{
					name: 'FK_transaction_status',
					using: 'BTREE',
					fields: [{ name: 'transaction_status_id' }],
				},
				{
					name: 'FK_sender_wallet_id',
					using: 'BTREE',
					fields: [{ name: 'sender_wallet_id' }],
				},
				{
					name: 'FK_receiver_wallet_id',
					using: 'BTREE',
					fields: [{ name: 'receiver_wallet_id' }],
				},
				{
					name: 'FK_transaction_street_id',
					using: 'BTREE',
					fields: [{ name: 'transaction_street_id' }],
				},
				{
					name: 'FKn9at5ld0ihlbyh4ptj0035t8e',
					using: 'BTREE',
					fields: [{ name: 'operator_id' }],
				},
				{
					name: 'FKoxhv9dp9uf8v8jk975yvnfv22',
					using: 'BTREE',
					fields: [{ name: 'recharge_id' }],
				},
				{
					name: 'FKjxipa7s49p45kl15f17svpyl9',
					using: 'BTREE',
					fields: [{ name: 'discount_id' }],
				},
				{
					name: 'FK_order_id',
					using: 'BTREE',
					fields: [{ name: 'order_id' }],
				},
				{
					name: 'FKg5wrm63145rnm1kiwiulev2o7',
					using: 'BTREE',
					fields: [{ name: 'bonus_id' }],
				},
				{
					name: 'FKmxigttthk9mr22yem10y0vtju',
					using: 'BTREE',
					fields: [{ name: 'commande_id' }],
				},
				{
					name: 'FK_transaction_retrait_id',
					using: 'BTREE',
					fields: [{ name: 'retrait_id' }],
				},
				{
					name: 'FK_transaction_rechargement_id',
					using: 'BTREE',
					fields: [{ name: 'rechargement_id' }],
				},
			],
		}
	);
};
