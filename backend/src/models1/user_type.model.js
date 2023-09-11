export default ( sequelize, Sequelize, DataTypes ) => {
    const UserType = sequelize.define( 'user_type', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            code: {
                type: DataTypes.STRING( 255 ),
                allowNull: true,
            },
            libelle: {
                type: DataTypes.STRING( 255 ),
                allowNull: true,
            },
            created_at: {
                type: DataTypes.DATE,
                defaultValue: sequelize.literal( 'CURRENT_TIMESTAMP' ),
            },
            deleted_at: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            updated_at: {
                type: DataTypes.DATE,
                allowNull: true,
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
        },
        {
            tableName: 'user_type',
            collate: 'utf8',
            timestamps: false,
        } );

    return UserType;
}