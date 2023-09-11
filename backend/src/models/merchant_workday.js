export default (sequelize, DataTypes, Sequelize) => {
	return sequelize.define(
		'merchant_workday',
		{
			id: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			from_time: {
				type: DataTypes.TIME,
				allowNull: false,
			},
			to_time: {
				type: DataTypes.TIME,
				allowNull: false,
			},
			status: {
				type: DataTypes.ENUM('OPEN', 'CLOSED'),
				allowNull: false,
			},
			description: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			merchant_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'merchants',
					key: 'id',
				},
			},
			workday_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'workdays',
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
			is_deleted: {
				type: DataTypes.STRING(255),
				allowNull: true,
				defaultValue: '0',
			},
			deleted_at: {
				type: DataTypes.DATE,
				allowNull: true,
			},
		},
		{
			sequelize,
			tableName: 'merchant_workday',
			timestamps: false,
			indexes: [
				{
					name: 'PRIMARY',
					unique: true,
					using: 'BTREE',
					fields: [{ name: 'id' }],
				},
				{
					name: 'FK_merchant_workday_merchant_id',
					using: 'BTREE',
					fields: [{ name: 'merchant_id' }],
				},
				{
					name: 'FK_merchant_workday_workday_id',
					using: 'BTREE',
					fields: [{ name: 'workday_id' }],
				},
				{
					name: 'merchant_id',
					using: 'BTREE',
					fields: [{ name: 'merchant_id' }, { name: 'workday_id' }],
				},
			],
		}
	);
};
