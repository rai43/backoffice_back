import relations from './relations.model.js';

import { DataTypes, literal, Sequelize } from 'sequelize';

import dbConfig from '../../config/db.config.js';

import user from './user.model.js';
import client from './client.model.js';
import user_type from './user_type.model.js';
import client_type from './client_type.models.js';
import country from './country.models.js';
import limit_operation from './limit_operation.model.js';
import wallet_status from './wallet_status.model.js';
import wallet_type from './wallet_type.model.js';
import wallet from './wallet.model.js';
import transaction_type from './transaction_type.model.js';
import transaction_status from './transaction_status.model.js';

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
	host: dbConfig.HOST,
	dialect: dbConfig.dialect,
	// operatorsAliases: false,

	pool: {
		max: dbConfig.pool.max,
		min: dbConfig.pool.min,
		acquire: dbConfig.pool.acquire,
		idle: dbConfig.pool.idle,
	},
});

// checks the database connectivity
sequelize
	.authenticate()
	.then(() => {
		console.log('Connection has been established successfully.');
	})
	.catch((err) => {
		console.error('Unable to connect to the database:', err);
	});
// module.exports = sequelize;

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.DataTypes = DataTypes;
db.literal = literal;

// Initializing the models
db.user = user(sequelize, Sequelize, DataTypes);
db.client = client(sequelize, Sequelize, DataTypes);
db.user_type = user_type(sequelize, Sequelize, DataTypes);
db.client_type = client_type(sequelize, Sequelize, DataTypes);
db.country = country(sequelize, Sequelize, DataTypes);
db.wallet = wallet(sequelize, Sequelize, DataTypes);
db.wallet_type = wallet_type(sequelize, Sequelize, DataTypes);
db.wallet_status = wallet_status(sequelize, Sequelize, DataTypes);
db.limit_operation = limit_operation(sequelize, Sequelize, DataTypes);
db.transaction_type = transaction_type(sequelize, Sequelize, DataTypes);
db.transaction_status = transaction_status(sequelize, Sequelize, DataTypes);
// Done initializing the models

// Exporting the db object
export default db;

relations();
