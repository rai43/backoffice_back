export default (sequelize, DataTypes, Sequelize) => {
	return sequelize.define(
		'client',
		{
			id: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			phone_number: {
				type: DataTypes.STRING(10),
				allowNull: false,
			},
			passcode: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
			full_name: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			merchant_name: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			photo: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			fcm_token: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			latitude: {
				type: DataTypes.DOUBLE,
				allowNull: true,
			},
			longitude: {
				type: DataTypes.DOUBLE,
				allowNull: true,
			},
			location: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			version_code: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			client_type_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
				references: {
					model: 'client_type',
					key: 'id',
				},
			},
			client_sub_category_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			client_category_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			country_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
				references: {
					model: 'country',
					key: 'id',
				},
			},
			is_seller: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
			},
			is_invited: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
			},
			is_deleted: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
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
			fmc_token: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			is_commercial: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
				defaultValue: 0,
			},
			updated_by: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			commune: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			email: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			quartier: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			ville: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			active_session: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			whatsapp: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			referral_code: {
				type: DataTypes.STRING(255),
				allowNull: true,
				unique: 'UK_ff6o1146qcygbsyo61b1wbtj',
			},
			deleted_at: {
				type: DataTypes.DATE,
				allowNull: true,
			},
		},
		{
			sequelize,
			tableName: 'client',
			timestamps: false,
			indexes: [
				{
					name: 'PRIMARY',
					unique: true,
					using: 'BTREE',
					fields: [{ name: 'id' }],
				},
				{
					name: 'UK_ff6o1146qcygbsyo61b1wbtj',
					unique: true,
					using: 'BTREE',
					fields: [{ name: 'referral_code' }],
				},
				{
					name: 'FK_client_type_id',
					using: 'BTREE',
					fields: [{ name: 'client_type_id' }],
				},
				{
					name: 'FK_country_id',
					using: 'BTREE',
					fields: [{ name: 'country_id' }],
				},
			],
		}
	);
};
