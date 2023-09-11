export default (sequelize, DataTypes, Sequelize) => {
	return sequelize.define(
		'advance_payment_fees',
		{
			id: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
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
			date: {
				type: DataTypes.DATE,
				allowNull: true,
			},
			deleted_by: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			fees: {
				type: DataTypes.DOUBLE,
				allowNull: true,
			},
			is_deleted: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
			},
			rate: {
				type: DataTypes.DOUBLE,
				allowNull: true,
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
			advance_payment_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{
			sequelize,
			tableName: 'advance_payment_fees',
			timestamps: false,
			indexes: [
				{
					name: 'PRIMARY',
					unique: true,
					using: 'BTREE',
					fields: [{ name: 'id' }],
				},
				{
					name: 'FK8al16393d051rnmy4x4egqueh',
					using: 'BTREE',
					fields: [{ name: 'advance_payment_id' }],
				},
			],
		}
	);
};
