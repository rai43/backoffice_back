import db from "./index.js";

export default () => {
  const User = db.user;
  const Client = db.client;
  const UserType = db.user_type;
  const ClientType = db.client_type;
  const Country = db.country;
  const Wallet = db.wallet;
  const WalletType = db.wallet_type;
  const WalletStatus = db.wallet_status;
  const LimitOperation = db.limit_operation;

  //     Relation between UserType model and User model - Relation 1
  UserType.hasMany(User, {
    foreignKey: "user_type_id",
  });
  User.belongsTo(UserType, {
    foreignKey: "user_type_id",
  });
  User.sync();

  // Relation between User model and User model
  User.belongsTo(User, {
    foreignKey: "created_by",
    targetKey: "id",
    as: "UserCreate",
  });
  User.sync();

  // Relation between ClientType model and Client model - Relation 1
  ClientType.hasMany(Client, {
    foreignKey: "client_type_id",
  });
  Client.belongsTo(ClientType, {
    foreignKey: "client_type_id",
  });
  Country.sync();

  // Relation between Country model and Client model - Relation 1
  Country.hasMany(Client, {
    foreignKey: "country_id",
  });
  Client.belongsTo(Country, {
    foreignKey: "country_id",
  });
  Country.sync();

  // Relation between Wallet model and Client, WalletStatus, LimitOperation, WalletType models
  Client.hasMany(Wallet, {
    foreignKey: "client_id",
  });
  Wallet.belongsTo(Client, { foreignKey: "client_id" });

  WalletStatus.hasMany(Wallet, {
    foreignKey: "wallet_status_id",
  });
  Wallet.belongsTo(WalletStatus, { foreignKey: "wallet_status_id" });

  LimitOperation.hasMany(Wallet, {
    foreignKey: "receive_limit_id",
  });
  Wallet.belongsTo(LimitOperation, {
    foreignKey: "receive_limit_id",
    as: "receivedLimitOperation",
  });

  LimitOperation.hasMany(Wallet, {
    foreignKey: "send_limit_id",
  });
  Wallet.belongsTo(LimitOperation, {
    as: "sentLimitOperation",
    foreignKey: "send_limit_id",
  });

  WalletType.hasMany(Wallet, {
    foreignKey: "wallet_type_id",
  });
  Wallet.belongsTo(WalletType, { foreignKey: "wallet_type_id" });
  Wallet.sync();
};
