export default (sequelize, DataTypes, Sequelize) => {
	return sequelize.define(
		'order_order_status',
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
			order_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
				references: {
					model: 'order',
					key: 'id',
				},
			},
			order_status_id: {
				type: DataTypes.INTEGER,
				allowNull: true,
				references: {
					model: 'order_status',
					key: 'id',
				},
			},
			updated_at: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
			},
		},
		{
			sequelize,
			tableName: 'order_order_status',
			timestamps: false,
			indexes: [
				{
					name: 'PRIMARY',
					unique: true,
					using: 'BTREE',
					fields: [{ name: 'id' }],
				},
				{
					name: 'FKb2w5jr3drp8df9112debi7x6e',
					using: 'BTREE',
					fields: [{ name: 'order_id' }],
				},
				{
					name: 'FKa7aicdeoexsnf48qba9bps2y2',
					using: 'BTREE',
					fields: [{ name: 'order_status_id' }],
				},
			],
		}
	);
};
