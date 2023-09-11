export default (sequelize, DataTypes, Sequelize) => {
	return sequelize.define(
		'offers',
		{
			id: {
				autoIncrement: true,
				type: DataTypes.INTEGER,
				allowNull: false,
				primaryKey: true,
			},
			name: {
				type: DataTypes.STRING(100),
				allowNull: false,
			},
			offer: {
				type: DataTypes.ENUM('PARTICULIER', 'ENTREPRISE'),
				allowNull: false,
			},
			type: {
				type: DataTypes.ENUM('WEEKLY', 'MONTHLY'),
				allowNull: false,
			},
			amount: {
				type: DataTypes.DECIMAL(10, 0),
				allowNull: false,
			},
			max_quantity: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			suscriber_limit: {
				type: DataTypes.INTEGER,
				allowNull: false,
				defaultValue: 1,
			},
			description: {
				type: DataTypes.STRING(255),
				allowNull: true,
			},
			is_deleted: {
				type: DataTypes.TINYINT,
				allowNull: false,
				defaultValue: 0,
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
			deleted_at: {
				type: DataTypes.DATE,
				allowNull: true,
			},
		},
		{
			sequelize,
			tableName: 'offers',
			timestamps: false,
			indexes: [
				{
					name: 'PRIMARY',
					unique: true,
					using: 'BTREE',
					fields: [{ name: 'id' }],
				},
				{
					name: 'offer',
					unique: true,
					using: 'BTREE',
					fields: [{ name: 'offer' }, { name: 'type' }],
				},
			],
		}
	);
};
