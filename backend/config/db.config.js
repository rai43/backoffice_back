// export default {
// 	HOST: '10.166.0.2',
// 	USER: 'dev',
// 	PASSWORD: 'VAkiT9xOR4eBoebuR4f2T7MgptOZvD',
// 	// DB: 'street_dev_db',
// 	DB: 'street_new_db',
// 	// DB: 'street_test',
// 	dialect: 'mysql',
// 	pool: {
// 		max: 5,
// 		min: 0,
// 		acquire: 30000,
// 		idle: 10000,
// 	},
// };

export default {
	HOST: '127.0.0.1',
	USER: 'root',
	PASSWORD: 'pass@1234',
	DB: 'street_new_db',
	// DB: 'street_dev_db',
	// DB: 'street_backoffice_dev',
	// DB: 'street_test',
	dialect: 'mysql',
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000,
	},
};
