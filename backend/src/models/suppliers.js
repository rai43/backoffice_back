export default (sequelize, DataTypes, Sequelize) => {
	return sequelize.define(
		'suppliers',
		{
			id: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			name: {
				type: DataTypes.STRING(225),
				allowNull: false,
			},
			phone_number: {
				type: DataTypes.STRING(15),
				allowNull: true,
			},
			whatsapp: {
				type: DataTypes.STRING(15),
				allowNull: true,
			},
			location: {
				type: DataTypes.STRING(100),
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
		},
		{
			sequelize,
			tableName: 'suppliers',
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
