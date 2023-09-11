export default (sequelize, Sequelize, DataTypes) => {
  const User = sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nom: {
        type: DataTypes.STRING(225),
        allowNull: true,
      },
      prenom: {
        type: DataTypes.STRING(225),
        allowNull: true,
      },
      telephone: {
        type: DataTypes.STRING(225),
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING(225),
        allowNull: true,
      },
      adresse: {
        type: DataTypes.STRING(225),
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING(225),
        allowNull: true,
      },
      user_type_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      is_locked: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
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
      is_connected: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      pers_a_contacter: {
        type: DataTypes.STRING(225),
        allowNull: true,
      },
      token: {
        type: DataTypes.STRING(225),
        allowNull: true,
      },
    },
    {
      tableName: "user",
      collate: "utf8",
      timestamps: false,
    },
  );

  return User;
};
