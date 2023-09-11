export default (sequelize, Sequelize, DataTypes) => {
  const Wallet = sequelize.define(
    "wallet",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      balance: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      bonus: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      client_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      wallet_status_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      receive_limit_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      send_limit_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      wallet_type_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: true,
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
      is_seller: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      qrcode: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      commissionTotal: {
        type: DataTypes.DOUBLE,
        defaultValue: 0,
      },
      commission_total: {
        type: DataTypes.DOUBLE,
        defaultValue: 0,
      },
    },
    {
      tableName: "wallet",
      collate: "utf8",
      timestamps: false,
    },
  );

  return Wallet;
};
