export default (sequelize, DataTypes, Sequelize) => {
	return sequelize.define(
		'commandes',
		{
			id: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			status: {
				type: DataTypes.ENUM('PAID', 'COMPLETED', 'REFUSED', 'CANCELED', 'ONCONFLICT'),
				allowNull: true,
			},
			total: {
				type: DataTypes.DECIMAL(10, 0),
				allowNull: true,
				defaultValue: 0,
			},
			client_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'client',
					key: 'id',
				},
			},
			merchant_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
				references: {
					model: 'merchants',
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
			code: {
				type: DataTypes.STRING(255),
				allowNull: false,
				unique: 'UK_wca8lrw3uog0iaulyoetlv2g',
			},
			is_deleted: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
				defaultValue: 0,
			},
			previous_balance: {
				type: DataTypes.DECIMAL(21, 2),
				allowNull: true,
			},
			previous_bonus: {
				type: DataTypes.DECIMAL(21, 2),
				allowNull: true,
			},
			total_discount: {
				type: DataTypes.DECIMAL(21, 2),
				allowNull: true,
			},
			delivery_fee: {
				type: DataTypes.DECIMAL(10, 0),
				allowNull: true,
				defaultValue: 0,
			},
			delivery_status: {
				type: DataTypes.STRING(255),
				allowNull: false,
				defaultValue: 'PENDING',
			},
			payment_method: {
				type: DataTypes.ENUM('STREET', 'CASH'),
				allowNull: true,
				defaultValue: 'STREET',
			},
			address_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
				references: {
					model: 'addresses',
					key: 'id',
				},
			},
			phone_number: {
				type: DataTypes.STRING(10),
				allowNull: true,
			},
			commande_discount_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
				references: {
					model: 'commande_discounts',
					key: 'id',
				},
			},
			balance_share: {
				type: DataTypes.DECIMAL(10, 0),
				allowNull: true,
			},
			bonus_share: {
				type: DataTypes.DECIMAL(10, 0),
				allowNull: true,
			},
			subscription_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
				references: {
					model: 'subscriptions',
					key: 'id',
				},
			},
			location_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
				references: {
					model: 'locations',
					key: 'id',
				},
			},
			total_articles: {
				type: DataTypes.DECIMAL(19, 2),
				allowNull: true,
			},
			livreur_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
				references: {
					model: 'livreurs',
					key: 'id',
				},
			},
			amount_collected: {
				type: DataTypes.DECIMAL(10, 0),
				allowNull: true,
			},
			deleted_at: {
				type: DataTypes.DATE,
				allowNull: true,
			},
		},
		{
			sequelize,
			tableName: 'commandes',
			timestamps: false,
			indexes: [
				{
					name: 'PRIMARY',
					unique: true,
					using: 'BTREE',
					fields: [{ name: 'id' }],
				},
				{
					name: 'UK_wca8lrw3uog0iaulyoetlv2g',
					unique: true,
					using: 'BTREE',
					fields: [{ name: 'code' }],
				},
				{
					name: 'FK_commandes_client_id',
					using: 'BTREE',
					fields: [{ name: 'client_id' }],
				},
				{
					name: 'FK_commandes_merchant_id',
					using: 'BTREE',
					fields: [{ name: 'merchant_id' }],
				},
				{
					name: 'FK_commandes_address_id',
					using: 'BTREE',
					fields: [{ name: 'address_id' }],
				},
				{
					name: 'FK8xo1g7oytessxcw3634sbnhxs',
					using: 'BTREE',
					fields: [{ name: 'commande_discount_id' }],
				},
				{
					name: 'FK_commandes_subscription_id',
					using: 'BTREE',
					fields: [{ name: 'subscription_id' }],
				},
				{
					name: 'FK_commandes_location_id',
					using: 'BTREE',
					fields: [{ name: 'location_id' }],
				},
				{
					name: 'FK_commandes_livreur_id',
					using: 'BTREE',
					fields: [{ name: 'livreur_id' }],
				},
			],
		}
	);
};
