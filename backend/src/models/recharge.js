export default (sequelize, DataTypes, Sequelize) => {
	return sequelize.define(
		'recharge',
		{
			id: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			amount: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			code: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			created_at: {
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
			expiration_date: {
				type: DataTypes.DATE,
				allowNull: false,
			},
			is_deleted: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
			},
			serial_number: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
			status: {
				type: DataTypes.STRING(255),
				allowNull: false,
			},
			updated_at: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
			},
			updated_by: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			deleted_at: {
				type: DataTypes.DATE,
				allowNull: true,
			},
		},
		{
			sequelize,
			tableName: 'recharge',
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
