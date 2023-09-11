import { DataTypes, literal, Sequelize } from 'sequelize';
import dbConfig from '../../config/db.config.js';

import _accompagnements from './accompagnements.js';
import _activities from './activities.js';
import _addresses from './addresses.js';
import _advance_payment from './advance_payment.js';
import _advance_payment_details from './advance_payment_details.js';
import _advance_payment_fees from './advance_payment_fees.js';
import _app_versions from './app_versions.js';
import _areas from './areas.js';
import _article from './article.js';
import _article_accompagnement from './article_accompagnement.js';
import _article_commande from './article_commande.js';
import _article_size from './article_size.js';
import _article_status from './article_status.js';
import _article_supplement from './article_supplement.js';
import _bonus from './bonus.js';
import _categories from './categories.js';
import _category from './category.js';
import _category_client from './category_client.js';
import _category_sizes from './category_sizes.js';
import _channels from './channels.js';
import _client from './client.js';
import _client_category from './client_category.js';
import _client_open_app_bonus from './client_open_app_bonus.js';
import _client_sub_category from './client_sub_category.js';
import _client_subscription from './client_subscription.js';
import _client_type from './client_type.js';
import _commande_commande_status from './commande_commande_status.js';
import _commande_conflicts from './commande_conflicts.js';
import _commande_discounts from './commande_discounts.js';
import _commande_issue from './commande_issue.js';
import _commande_status from './commande_status.js';
import _commandes from './commandes.js';
import _country from './country.js';
import _demande from './demande.js';
import _demande_status from './demande_status.js';
import _demande_type from './demande_type.js';
import _discount from './discount.js';
import _discount_day from './discount_day.js';
import _discounts from './discounts.js';
import _group from './group.js';
import _invitations from './invitations.js';
import _issues from './issues.js';
import _ligne_accompagnement from './ligne_accompagnement.js';
import _ligne_supplement from './ligne_supplement.js';
import _like from './like.js';
import _limit_operation from './limit_operation.js';
import _livreur_area from './livreur_area.js';
import _livreur_livreur_request from './livreur_livreur_request.js';
import _livreur_livreur_requests from './livreur_livreur_requests.js';
import _livreur_requests from './livreur_requests.js';
import _livreurs from './livreurs.js';
import _locations from './locations.js';
import _media from './media.js';
import _merchant_categories from './merchant_categories.js';
import _merchant_merchant_category from './merchant_merchant_category.js';
import _merchant_workday from './merchant_workday.js';
import _merchants from './merchants.js';
import _offers from './offers.js';
import _open_app_bonus from './open_app_bonus.js';
import _operation from './operation.js';
import _operation_type from './operation_type.js';
import _operator from './operator.js';
import _operator_operator_type from './operator_operator_type.js';
import _operator_type from './operator_type.js';
import _order from './order.js';
import _order_code from './order_code.js';
import _order_conflict from './order_conflict.js';
import _order_conflit from './order_conflit.js';
import _order_order_status from './order_order_status.js';
import _order_status from './order_status.js';
import _otp from './otp.js';
import _parametre from './parametre.js';
import _payment_channels from './payment_channels.js';
import _payment_methods from './payment_methods.js';
import _purchases from './purchases.js';
import _qrcode from './qrcode.js';
import _recharge from './recharge.js';
import _rechargements from './rechargements.js';
import _retraits from './retraits.js';
import _sizes from './sizes.js';
import _sms_operators from './sms_operators.js';
import _sms_providers from './sms_providers.js';
import _subscriptions from './subscriptions.js';
import _supplements from './supplements.js';
import _suppliers from './suppliers.js';
import _transaction from './transaction.js';
import _transaction_status from './transaction_status.js';
import _transaction_type from './transaction_type.js';
import _types from './types.js';
import _user from './user.js';
import _user_type from './user_type.js';
import _user_wallet from './user_wallet.js';
import _users from './users.js';
import _view from './view.js';
import _wallet from './wallet.js';
import _wallet_status from './wallet_status.js';
import _wallet_type from './wallet_type.js';
import _workdays from './workdays.js';

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
	host: dbConfig.HOST,
	dialect: dbConfig.dialect,
	// operatorsAliases: false,
	define: {
		// charset: 'utf8',
		collate: 'utf8mb4_unicode_ci',
		// timestamps: false
	},

	pool: {
		max: dbConfig.pool.max,
		min: dbConfig.pool.min,
		acquire: dbConfig.pool.acquire,
		idle: dbConfig.pool.idle,
	},
});

// sequelize.query('SET FOREIGN_KEY_CHECKS = 0', null).then(() => console.log('SET FOREIGN_KEY_CHECKS = 0 is successfull'));
// .then(function () {
// 	return sequelize.query('truncate table myTable', null, options);
// })
// .then(function () {
// 	return sequelize.query('SET FOREIGN_KEY_CHECKS = 1', null, options);
// })
// .then(function () {
// 	return t.commit();
// });

// checks the database connectivity
sequelize
	.authenticate()
	.then(() => {
		console.log('Connection has been established successfully.');
	})
	.catch((err) => {
		console.error('Unable to connect to the database:', err);
	});

function initModels(sequelize, Sequelize) {
	const accompagnements = _accompagnements(sequelize, DataTypes, Sequelize);
	const activities = _activities(sequelize, DataTypes, Sequelize);
	const addresses = _addresses(sequelize, DataTypes, Sequelize);
	const advance_payment = _advance_payment(sequelize, DataTypes, Sequelize);
	const advance_payment_details = _advance_payment_details(sequelize, DataTypes, Sequelize);
	const advance_payment_fees = _advance_payment_fees(sequelize, DataTypes, Sequelize);
	const app_versions = _app_versions(sequelize, DataTypes, Sequelize);
	const areas = _areas(sequelize, DataTypes, Sequelize);
	const article = _article(sequelize, DataTypes, Sequelize);
	const article_accompagnement = _article_accompagnement(sequelize, DataTypes, Sequelize);
	const article_commande = _article_commande(sequelize, DataTypes, Sequelize);
	const article_size = _article_size(sequelize, DataTypes, Sequelize);
	const article_status = _article_status(sequelize, DataTypes, Sequelize);
	const article_supplement = _article_supplement(sequelize, DataTypes, Sequelize);
	const bonus = _bonus(sequelize, DataTypes, Sequelize);
	const categories = _categories(sequelize, DataTypes, Sequelize);
	const category = _category(sequelize, DataTypes, Sequelize);
	const category_client = _category_client(sequelize, DataTypes, Sequelize);
	const category_sizes = _category_sizes(sequelize, DataTypes, Sequelize);
	const channels = _channels(sequelize, DataTypes, Sequelize);
	const client = _client(sequelize, DataTypes, Sequelize);
	const client_category = _client_category(sequelize, DataTypes, Sequelize);
	const client_open_app_bonus = _client_open_app_bonus(sequelize, DataTypes, Sequelize);
	const client_sub_category = _client_sub_category(sequelize, DataTypes, Sequelize);
	const client_subscription = _client_subscription(sequelize, DataTypes, Sequelize);
	const client_type = _client_type(sequelize, DataTypes, Sequelize);
	const commande_commande_status = _commande_commande_status(sequelize, DataTypes, Sequelize);
	const commande_conflicts = _commande_conflicts(sequelize, DataTypes, Sequelize);
	const commande_discounts = _commande_discounts(sequelize, DataTypes, Sequelize);
	const commande_issue = _commande_issue(sequelize, DataTypes, Sequelize);
	const commande_status = _commande_status(sequelize, DataTypes, Sequelize);
	const commandes = _commandes(sequelize, DataTypes, Sequelize);
	const country = _country(sequelize, DataTypes, Sequelize);
	const demande = _demande(sequelize, DataTypes, Sequelize);
	const demande_status = _demande_status(sequelize, DataTypes, Sequelize);
	const demande_type = _demande_type(sequelize, DataTypes, Sequelize);
	const discount = _discount(sequelize, DataTypes, Sequelize);
	const discount_day = _discount_day(sequelize, DataTypes, Sequelize);
	const discounts = _discounts(sequelize, DataTypes, Sequelize);
	const group = _group(sequelize, DataTypes, Sequelize);
	const invitations = _invitations(sequelize, DataTypes, Sequelize);
	const issues = _issues(sequelize, DataTypes, Sequelize);
	const ligne_accompagnement = _ligne_accompagnement(sequelize, DataTypes, Sequelize);
	const ligne_supplement = _ligne_supplement(sequelize, DataTypes, Sequelize);
	const like = _like(sequelize, DataTypes, Sequelize);
	const limit_operation = _limit_operation(sequelize, DataTypes, Sequelize);
	const livreur_area = _livreur_area(sequelize, DataTypes, Sequelize);
	const livreur_livreur_request = _livreur_livreur_request(sequelize, DataTypes, Sequelize);
	const livreur_livreur_requests = _livreur_livreur_requests(sequelize, DataTypes, Sequelize);
	const livreur_requests = _livreur_requests(sequelize, DataTypes, Sequelize);
	const livreurs = _livreurs(sequelize, DataTypes, Sequelize);
	const locations = _locations(sequelize, DataTypes, Sequelize);
	const media = _media(sequelize, DataTypes, Sequelize);
	const merchant_categories = _merchant_categories(sequelize, DataTypes, Sequelize);
	const merchant_merchant_category = _merchant_merchant_category(sequelize, DataTypes, Sequelize);
	const merchant_workday = _merchant_workday(sequelize, DataTypes, Sequelize);
	const merchants = _merchants(sequelize, DataTypes, Sequelize);
	const offers = _offers(sequelize, DataTypes, Sequelize);
	const open_app_bonus = _open_app_bonus(sequelize, DataTypes, Sequelize);
	const operation = _operation(sequelize, DataTypes, Sequelize);
	const operation_type = _operation_type(sequelize, DataTypes, Sequelize);
	const operator = _operator(sequelize, DataTypes, Sequelize);
	const operator_operator_type = _operator_operator_type(sequelize, DataTypes, Sequelize);
	const operator_type = _operator_type(sequelize, DataTypes, Sequelize);
	const order = _order(sequelize, DataTypes, Sequelize);
	const order_code = _order_code(sequelize, DataTypes, Sequelize);
	const order_conflict = _order_conflict(sequelize, DataTypes, Sequelize);
	const order_conflit = _order_conflit(sequelize, DataTypes, Sequelize);
	const order_order_status = _order_order_status(sequelize, DataTypes, Sequelize);
	const order_status = _order_status(sequelize, DataTypes, Sequelize);
	const otp = _otp(sequelize, DataTypes, Sequelize);
	const parametre = _parametre(sequelize, DataTypes, Sequelize);
	const payment_channels = _payment_channels(sequelize, DataTypes, Sequelize);
	const payment_methods = _payment_methods(sequelize, DataTypes, Sequelize);
	const purchases = _purchases(sequelize, DataTypes, Sequelize);
	const qrcode = _qrcode(sequelize, DataTypes, Sequelize);
	const recharge = _recharge(sequelize, DataTypes, Sequelize);
	const rechargements = _rechargements(sequelize, DataTypes, Sequelize);
	const retraits = _retraits(sequelize, DataTypes, Sequelize);
	const sizes = _sizes(sequelize, DataTypes, Sequelize);
	const sms_operators = _sms_operators(sequelize, DataTypes, Sequelize);
	const sms_providers = _sms_providers(sequelize, DataTypes, Sequelize);
	const subscriptions = _subscriptions(sequelize, DataTypes, Sequelize);
	const supplements = _supplements(sequelize, DataTypes, Sequelize);
	const suppliers = _suppliers(sequelize, DataTypes, Sequelize);
	const transaction = _transaction(sequelize, DataTypes, Sequelize);
	const transaction_status = _transaction_status(sequelize, DataTypes, Sequelize);
	const transaction_type = _transaction_type(sequelize, DataTypes, Sequelize);
	const types = _types(sequelize, DataTypes, Sequelize);
	const user = _user(sequelize, DataTypes, Sequelize);
	const user_type = _user_type(sequelize, DataTypes, Sequelize);
	const user_wallet = _user_wallet(sequelize, DataTypes, Sequelize);
	const users = _users(sequelize, DataTypes, Sequelize);
	const view = _view(sequelize, DataTypes, Sequelize);
	const wallet = _wallet(sequelize, DataTypes, Sequelize);
	const wallet_status = _wallet_status(sequelize, DataTypes, Sequelize);
	const wallet_type = _wallet_type(sequelize, DataTypes, Sequelize);
	const workdays = _workdays(sequelize, DataTypes, Sequelize);

	article_accompagnement.belongsTo(accompagnements, { as: 'accompagnement', foreignKey: 'accompagnement_id' });
	accompagnements.hasMany(article_accompagnement, { as: 'article_accompagnements', foreignKey: 'accompagnement_id' });
	article_supplement.belongsTo(accompagnements, { as: 'accompagnement', foreignKey: 'accompagnement_id' });
	accompagnements.hasMany(article_supplement, { as: 'article_supplements', foreignKey: 'accompagnement_id' });
	ligne_accompagnement.belongsTo(accompagnements, { as: 'accompagnement', foreignKey: 'accompagnement_id' });
	accompagnements.hasMany(ligne_accompagnement, { as: 'ligne_accompagnements', foreignKey: 'accompagnement_id' });
	supplements.belongsTo(accompagnements, { as: 'accompagnement', foreignKey: 'accompagnement_id' });
	accompagnements.hasMany(supplements, { as: 'supplements', foreignKey: 'accompagnement_id' });
	commandes.belongsTo(addresses, { as: 'address', foreignKey: 'address_id' });
	addresses.hasMany(commandes, { as: 'commandes', foreignKey: 'address_id' });
	livreur_area.belongsTo(areas, { as: 'area', foreignKey: 'area_id' });
	areas.hasMany(livreur_area, { as: 'livreur_areas', foreignKey: 'area_id' });
	accompagnements.belongsTo(article, { as: 'article', foreignKey: 'article_id' });
	article.hasMany(accompagnements, { as: 'accompagnements', foreignKey: 'article_id' });
	article_accompagnement.belongsTo(article, { as: 'article', foreignKey: 'article_id' });
	article.hasMany(article_accompagnement, { as: 'article_accompagnements', foreignKey: 'article_id' });
	article_commande.belongsTo(article, { as: 'article', foreignKey: 'article_id' });
	article.hasMany(article_commande, { as: 'article_commandes', foreignKey: 'article_id' });
	article_size.belongsTo(article, { as: 'article', foreignKey: 'article_id' });
	article.hasMany(article_size, { as: 'article_sizes', foreignKey: 'article_id' });
	article_supplement.belongsTo(article, { as: 'article', foreignKey: 'article_id' });
	article.hasMany(article_supplement, { as: 'article_supplements', foreignKey: 'article_id' });
	like.belongsTo(article, { as: 'article', foreignKey: 'article_id' });
	article.hasMany(like, { as: 'likes', foreignKey: 'article_id' });
	media.belongsTo(article, { as: 'article', foreignKey: 'article_id' });
	article.hasMany(media, { as: 'media', foreignKey: 'article_id' });
	purchases.belongsTo(article, { as: 'article', foreignKey: 'article_id' });
	article.hasMany(purchases, { as: 'purchases', foreignKey: 'article_id' });
	supplements.belongsTo(article, { as: 'article', foreignKey: 'article_id' });
	article.hasMany(supplements, { as: 'supplements', foreignKey: 'article_id' });
	view.belongsTo(article, { as: 'article', foreignKey: 'article_id' });
	article.hasMany(view, { as: 'views', foreignKey: 'article_id' });
	ligne_accompagnement.belongsTo(article_commande, { as: 'article_commande', foreignKey: 'article_commande_id' });
	article_commande.hasMany(ligne_accompagnement, { as: 'ligne_accompagnements', foreignKey: 'article_commande_id' });
	ligne_supplement.belongsTo(article_commande, { as: 'article_commande', foreignKey: 'article_commande_id' });
	article_commande.hasMany(ligne_supplement, { as: 'ligne_supplements', foreignKey: 'article_commande_id' });
	supplements.belongsTo(article_commande, { as: 'article_commande', foreignKey: 'article_commande_id' });
	article_commande.hasMany(supplements, { as: 'supplements', foreignKey: 'article_commande_id' });
	article.belongsTo(article_status, { as: 'article_status', foreignKey: 'article_status_id' });
	article_status.hasMany(article, { as: 'articles', foreignKey: 'article_status_id' });
	client_open_app_bonus.belongsTo(bonus, { as: 'bonus', foreignKey: 'bonus_id' });
	bonus.hasMany(client_open_app_bonus, { as: 'client_open_app_bonus', foreignKey: 'bonus_id' });
	invitations.belongsTo(bonus, { as: 'bonus', foreignKey: 'bonus_id' });
	bonus.hasMany(invitations, { as: 'invitations', foreignKey: 'bonus_id' });
	transaction.belongsTo(bonus, { as: 'bonus', foreignKey: 'bonus_id' });
	bonus.hasMany(transaction, { as: 'transactions', foreignKey: 'bonus_id' });
	types.belongsTo(categories, { as: 'category', foreignKey: 'category_id' });
	categories.hasMany(types, { as: 'types', foreignKey: 'category_id' });
	article.belongsTo(category, { as: 'category', foreignKey: 'category_id' });
	category.hasMany(article, { as: 'articles', foreignKey: 'category_id' });
	category.belongsTo(category, { as: 'parent', foreignKey: 'parent_id' });
	category.hasMany(category, { as: 'categories', foreignKey: 'parent_id' });
	category_client.belongsTo(category, { as: 'category', foreignKey: 'category_id' });
	category.hasMany(category_client, { as: 'category_clients', foreignKey: 'category_id' });
	rechargements.belongsTo(channels, { as: 'channel', foreignKey: 'channel_id' });
	channels.hasMany(rechargements, { as: 'rechargements', foreignKey: 'channel_id' });
	activities.belongsTo(client, { as: 'client', foreignKey: 'client_id' });
	client.hasMany(activities, { as: 'activities', foreignKey: 'client_id' });
	category_client.belongsTo(client, { as: 'client', foreignKey: 'client_id' });
	client.hasMany(category_client, { as: 'category_clients', foreignKey: 'client_id' });
	client_open_app_bonus.belongsTo(client, { as: 'client', foreignKey: 'client_id' });
	client.hasMany(client_open_app_bonus, { as: 'client_open_app_bonus', foreignKey: 'client_id' });
	client_subscription.belongsTo(client, { as: 'client', foreignKey: 'client_id' });
	client.hasMany(client_subscription, { as: 'client_subscriptions', foreignKey: 'client_id' });
	commandes.belongsTo(client, { as: 'client', foreignKey: 'client_id' });
	client.hasMany(commandes, { as: 'commandes', foreignKey: 'client_id' });
	discount_day.belongsTo(client, { as: 'client', foreignKey: 'client_id' });
	client.hasMany(discount_day, { as: 'discount_days', foreignKey: 'client_id' });
	invitations.belongsTo(client, { as: 'invitee_client', foreignKey: 'invitee_client_id' });
	client.hasMany(invitations, { as: 'invitations', foreignKey: 'invitee_client_id' });
	invitations.belongsTo(client, { as: 'inviter_client', foreignKey: 'inviter_client_id' });
	client.hasMany(invitations, { as: 'inviter_client_invitations', foreignKey: 'inviter_client_id' });
	like.belongsTo(client, { as: 'client', foreignKey: 'client_id' });
	client.hasMany(like, { as: 'likes', foreignKey: 'client_id' });
	livreurs.belongsTo(client, { as: 'client', foreignKey: 'client_id' });
	client.hasMany(livreurs, { as: 'livreurs', foreignKey: 'client_id' });
	merchants.belongsTo(client, { as: 'client', foreignKey: 'client_id' });
	client.hasMany(merchants, { as: 'merchants', foreignKey: 'client_id' });
	users.belongsTo(client, { as: 'user_type', foreignKey: 'user_type_id' });
	client.hasMany(users, { as: 'users', foreignKey: 'user_type_id' });
	view.belongsTo(client, { as: 'client', foreignKey: 'client_id' });
	client.hasMany(view, { as: 'views', foreignKey: 'client_id' });
	wallet.belongsTo(client, { as: 'client', foreignKey: 'client_id' });
	client.hasMany(wallet, { as: 'wallets', foreignKey: 'client_id' });
	client_sub_category.belongsTo(client_category, { as: 'category', foreignKey: 'category_id' });
	client_category.hasMany(client_sub_category, { as: 'client_sub_categories', foreignKey: 'category_id' });
	client.belongsTo(client_type, { as: 'client_type', foreignKey: 'client_type_id' });
	client_type.hasMany(client, { as: 'clients', foreignKey: 'client_type_id' });
	commandes.belongsTo(commande_discounts, { as: 'commande_discount', foreignKey: 'commande_discount_id' });
	commande_discounts.hasMany(commandes, { as: 'commandes', foreignKey: 'commande_discount_id' });
	commande_commande_status.belongsTo(commande_status, { as: 'commande_status', foreignKey: 'commande_status_id' });
	commande_status.hasMany(commande_commande_status, { as: 'commande_commande_statuses', foreignKey: 'commande_status_id' });
	article_commande.belongsTo(commandes, { as: 'commande', foreignKey: 'commande_id' });
	commandes.hasMany(article_commande, { as: 'article_commandes', foreignKey: 'commande_id' });
	commande_commande_status.belongsTo(commandes, { as: 'commande', foreignKey: 'commande_id' });
	commandes.hasMany(commande_commande_status, { as: 'commande_commande_statuses', foreignKey: 'commande_id' });
	commande_conflicts.belongsTo(commandes, { as: 'commande', foreignKey: 'commande_id' });
	commandes.hasMany(commande_conflicts, { as: 'commande_conflicts', foreignKey: 'commande_id' });
	commande_issue.belongsTo(commandes, { as: 'commande', foreignKey: 'commande_id' });
	commandes.hasMany(commande_issue, { as: 'commande_issues', foreignKey: 'commande_id' });
	transaction.belongsTo(commandes, { as: 'commande', foreignKey: 'commande_id' });
	commandes.hasMany(transaction, { as: 'transactions', foreignKey: 'commande_id' });
	client.belongsTo(country, { as: 'country', foreignKey: 'country_id' });
	country.hasMany(client, { as: 'clients', foreignKey: 'country_id' });
	demande.belongsTo(demande_status, { as: 'demande_status', foreignKey: 'demande_status_id' });
	demande_status.hasMany(demande, { as: 'demandes', foreignKey: 'demande_status_id' });
	demande.belongsTo(demande_type, { as: 'demande_type', foreignKey: 'demande_type_id' });
	demande_type.hasMany(demande, { as: 'demandes', foreignKey: 'demande_type_id' });
	transaction.belongsTo(discount, { as: 'discount', foreignKey: 'discount_id' });
	discount.hasMany(transaction, { as: 'transactions', foreignKey: 'discount_id' });
	discount.belongsTo(discount_day, { as: 'discount_day', foreignKey: 'discount_day_id' });
	discount_day.hasMany(discount, { as: 'discounts', foreignKey: 'discount_day_id' });
	article.belongsTo(discounts, { as: 'article_discount', foreignKey: 'discount_id' });
	discounts.hasMany(article, { as: 'articles', foreignKey: 'discount_id' });
	article_commande.belongsTo(discounts, { as: 'article_commande_discount', foreignKey: 'discount_id' });
	discounts.hasMany(article_commande, { as: 'article_commandes', foreignKey: 'discount_id' });
	category.belongsTo(group, { as: 'group', foreignKey: 'group_id' });
	group.hasMany(category, { as: 'categories', foreignKey: 'group_id' });
	commande_issue.belongsTo(issues, { as: 'issue', foreignKey: 'issue_id' });
	issues.hasMany(commande_issue, { as: 'commande_issues', foreignKey: 'issue_id' });
	wallet.belongsTo(limit_operation, { as: 'receive_limit', foreignKey: 'receive_limit_id' });
	limit_operation.hasMany(wallet, { as: 'wallets', foreignKey: 'receive_limit_id' });
	wallet.belongsTo(limit_operation, { as: 'send_limit', foreignKey: 'send_limit_id' });
	limit_operation.hasMany(wallet, { as: 'send_limit_wallets', foreignKey: 'send_limit_id' });
	livreur_livreur_request.belongsTo(livreur_requests, { as: 'livreur_request', foreignKey: 'livreur_request_id' });
	livreur_requests.hasMany(livreur_livreur_request, { as: 'livreur_livreur_requests', foreignKey: 'livreur_request_id' });
	livreur_livreur_requests.belongsTo(livreur_requests, { as: 'livreur_request', foreignKey: 'livreur_request_id' });
	livreur_requests.hasMany(livreur_livreur_requests, { as: 'livreur_request_livreur_livreur_requests', foreignKey: 'livreur_request_id' });
	commandes.belongsTo(livreurs, { as: 'livreur', foreignKey: 'livreur_id' });
	livreurs.hasMany(commandes, { as: 'commandes', foreignKey: 'livreur_id' });
	livreur_area.belongsTo(livreurs, { as: 'livreur', foreignKey: 'livreur_id' });
	livreurs.hasMany(livreur_area, { as: 'livreur_areas', foreignKey: 'livreur_id' });
	livreur_livreur_request.belongsTo(livreurs, { as: 'livreur', foreignKey: 'livreur_id' });
	livreurs.hasMany(livreur_livreur_request, { as: 'livreur_livreur_requests', foreignKey: 'livreur_id' });
	livreur_livreur_requests.belongsTo(livreurs, { as: 'livreur', foreignKey: 'livreur_id' });
	livreurs.hasMany(livreur_livreur_requests, { as: 'livreur_livreur_livreur_requests', foreignKey: 'livreur_id' });
	commandes.belongsTo(locations, { as: 'location', foreignKey: 'location_id' });
	locations.hasMany(commandes, { as: 'commandes', foreignKey: 'location_id' });
	merchants.belongsTo(locations, { as: 'location_location', foreignKey: 'location_id' });
	locations.hasMany(merchants, { as: 'location_merchants', foreignKey: 'location_id' });
	merchant_merchant_category.belongsTo(merchant_categories, { as: 'merchant_category', foreignKey: 'merchant_category_id' });
	merchant_categories.hasMany(merchant_merchant_category, { as: 'merchant_merchant_categories', foreignKey: 'merchant_category_id' });
	accompagnements.belongsTo(merchants, { as: 'merchant', foreignKey: 'merchant_id' });
	merchants.hasMany(accompagnements, { as: 'accompagnements', foreignKey: 'merchant_id' });
	article.belongsTo(merchants, { as: 'merchant', foreignKey: 'merchant_id' });
	merchants.hasMany(article, { as: 'articles', foreignKey: 'merchant_id' });
	commandes.belongsTo(merchants, { as: 'merchant', foreignKey: 'merchant_id' });
	merchants.hasMany(commandes, { as: 'commandes', foreignKey: 'merchant_id' });
	locations.belongsTo(merchants, { as: 'merchant', foreignKey: 'merchant_id' });
	merchants.hasMany(locations, { as: 'locations', foreignKey: 'merchant_id' });
	merchant_merchant_category.belongsTo(merchants, { as: 'merchant', foreignKey: 'merchant_id' });
	merchants.hasMany(merchant_merchant_category, { as: 'merchant_merchant_categories', foreignKey: 'merchant_id' });
	merchant_workday.belongsTo(merchants, { as: 'merchant', foreignKey: 'merchant_id' });
	merchants.hasMany(merchant_workday, { as: 'merchant_workdays', foreignKey: 'merchant_id' });
	subscriptions.belongsTo(offers, { as: 'offer', foreignKey: 'offer_id' });
	offers.hasMany(subscriptions, { as: 'subscriptions', foreignKey: 'offer_id' });
	operation.belongsTo(operation_type, { as: 'operation_type', foreignKey: 'operation_type_id' });
	operation_type.hasMany(operation, { as: 'operations', foreignKey: 'operation_type_id' });
	demande.belongsTo(operator, { as: 'operator', foreignKey: 'operator_id' });
	operator.hasMany(demande, { as: 'demandes', foreignKey: 'operator_id' });
	operator_operator_type.belongsTo(operator, { as: 'operator', foreignKey: 'operator_id' });
	operator.hasMany(operator_operator_type, { as: 'operator_operator_types', foreignKey: 'operator_id' });
	payment_channels.belongsTo(operator, { as: 'operator', foreignKey: 'operator_id' });
	operator.hasMany(payment_channels, { as: 'payment_channels', foreignKey: 'operator_id' });
	rechargements.belongsTo(operator, { as: 'operator', foreignKey: 'operator_id' });
	operator.hasMany(rechargements, { as: 'rechargements', foreignKey: 'operator_id' });
	retraits.belongsTo(operator, { as: 'operator', foreignKey: 'operator_id' });
	operator.hasMany(retraits, { as: 'retraits', foreignKey: 'operator_id' });
	transaction.belongsTo(operator, { as: 'operator', foreignKey: 'operator_id' });
	operator.hasMany(transaction, { as: 'transactions', foreignKey: 'operator_id' });
	operator_operator_type.belongsTo(operator_type, { as: 'operator_type', foreignKey: 'operator_type_id' });
	operator_type.hasMany(operator_operator_type, { as: 'operator_operator_types', foreignKey: 'operator_type_id' });
	order_conflict.belongsTo(order, { as: 'order', foreignKey: 'order_id' });
	order.hasMany(order_conflict, { as: 'order_conflicts', foreignKey: 'order_id' });
	order_conflit.belongsTo(order, { as: 'order', foreignKey: 'order_id' });
	order.hasMany(order_conflit, { as: 'order_conflits', foreignKey: 'order_id' });
	order_order_status.belongsTo(order, { as: 'order', foreignKey: 'order_id' });
	order.hasMany(order_order_status, { as: 'order_order_statuses', foreignKey: 'order_id' });
	transaction.belongsTo(order, { as: 'order', foreignKey: 'order_id' });
	order.hasMany(transaction, { as: 'transactions', foreignKey: 'order_id' });
	order.belongsTo(order_code, { as: 'order_code', foreignKey: 'order_code_id' });
	order_code.hasMany(order, { as: 'orders', foreignKey: 'order_code_id' });
	order_order_status.belongsTo(order_status, { as: 'order_status', foreignKey: 'order_status_id' });
	order_status.hasMany(order_order_status, { as: 'order_order_statuses', foreignKey: 'order_status_id' });
	transaction.belongsTo(recharge, { as: 'recharge', foreignKey: 'recharge_id' });
	recharge.hasMany(transaction, { as: 'transactions', foreignKey: 'recharge_id' });
	transaction.belongsTo(rechargements, { as: 'rechargement', foreignKey: 'rechargement_id' });
	rechargements.hasMany(transaction, { as: 'transactions', foreignKey: 'rechargement_id' });
	rechargements.belongsTo(retraits, { as: 'rechargement', foreignKey: 'rechargement_id' });
	retraits.hasMany(rechargements, { as: 'rechargements', foreignKey: 'rechargement_id' });
	transaction.belongsTo(retraits, { as: 'retrait', foreignKey: 'retrait_id' });
	retraits.hasMany(transaction, { as: 'transactions', foreignKey: 'retrait_id' });
	article_commande.belongsTo(sizes, { as: 'size', foreignKey: 'size_id' });
	sizes.hasMany(article_commande, { as: 'article_commandes', foreignKey: 'size_id' });
	article_size.belongsTo(sizes, { as: 'size', foreignKey: 'size_id' });
	sizes.hasMany(article_size, { as: 'article_sizes', foreignKey: 'size_id' });
	purchases.belongsTo(sizes, { as: 'size', foreignKey: 'size_id' });
	sizes.hasMany(purchases, { as: 'purchases', foreignKey: 'size_id' });
	sms_providers.belongsTo(sms_operators, { as: 'sms_operator', foreignKey: 'sms_operator_id' });
	sms_operators.hasMany(sms_providers, { as: 'sms_providers', foreignKey: 'sms_operator_id' });
	client_subscription.belongsTo(subscriptions, { as: 'subscription', foreignKey: 'subscription_id' });
	subscriptions.hasMany(client_subscription, { as: 'client_subscriptions', foreignKey: 'subscription_id' });
	commandes.belongsTo(subscriptions, { as: 'subscription', foreignKey: 'subscription_id' });
	subscriptions.hasMany(commandes, { as: 'commandes', foreignKey: 'subscription_id' });
	ligne_supplement.belongsTo(supplements, { as: 'supplement', foreignKey: 'supplement_id' });
	supplements.hasMany(ligne_supplement, { as: 'ligne_supplements', foreignKey: 'supplement_id' });
	operation.belongsTo(transaction, { as: 'transaction', foreignKey: 'transaction_id' });
	transaction.hasMany(operation, { as: 'operations', foreignKey: 'transaction_id' });
	transaction.belongsTo(transaction_status, { as: 'transaction_status', foreignKey: 'transaction_status_id' });
	transaction_status.hasMany(transaction, { as: 'transactions', foreignKey: 'transaction_status_id' });
	transaction.belongsTo(transaction_type, { as: 'transaction_type', foreignKey: 'transaction_type_id' });
	transaction_type.hasMany(transaction, { as: 'transactions', foreignKey: 'transaction_type_id' });
	user_wallet.belongsTo(user, { as: 'user', foreignKey: 'user_id' });
	user.hasMany(user_wallet, { as: 'user_wallets', foreignKey: 'user_id' });
	user.belongsTo(user_type, { as: 'user_type', foreignKey: 'user_type_id' });
	user_type.hasMany(user, { as: 'users', foreignKey: 'user_type_id' });
	// user.belongsTo(user, { as: 'create', foreignKey: 'created_by' });
	// user.hasOne(user, { as: 'created', foreignKey: 'created_by' });
	activities.belongsTo(wallet, { as: 'wallet', foreignKey: 'wallet_id' });
	wallet.hasMany(activities, { as: 'activities', foreignKey: 'wallet_id' });
	demande.belongsTo(wallet, { as: 'wallet', foreignKey: 'wallet_id' });
	wallet.hasMany(demande, { as: 'demandes', foreignKey: 'wallet_id' });
	operation.belongsTo(wallet, { as: 'wallet', foreignKey: 'wallet_id' });
	wallet.hasMany(operation, { as: 'operations', foreignKey: 'wallet_id' });
	order.belongsTo(wallet, { as: 'client_wallet', foreignKey: 'client_wallet_id' });
	wallet.hasMany(order, { as: 'orders', foreignKey: 'client_wallet_id' });
	order_code.belongsTo(wallet, { as: 'wallet', foreignKey: 'wallet_id' });
	wallet.hasMany(order_code, { as: 'order_codes', foreignKey: 'wallet_id' });
	rechargements.belongsTo(wallet, { as: 'wallet', foreignKey: 'wallet_id' });
	wallet.hasMany(rechargements, { as: 'rechargements', foreignKey: 'wallet_id' });
	retraits.belongsTo(wallet, { as: 'wallet', foreignKey: 'wallet_id' });
	wallet.hasMany(retraits, { as: 'retraits', foreignKey: 'wallet_id' });
	transaction.belongsTo(wallet, { as: 'sender_wallet', foreignKey: 'sender_wallet_id' });
	wallet.hasMany(transaction, { as: 'transactions', foreignKey: 'sender_wallet_id' });
	transaction.belongsTo(wallet, { as: 'receiver_wallet', foreignKey: 'receiver_wallet_id' });
	wallet.hasMany(transaction, { as: 'receiver_wallet_transactions', foreignKey: 'receiver_wallet_id' });
	user_wallet.belongsTo(wallet, { as: 'wallet', foreignKey: 'wallet_id' });
	wallet.hasMany(user_wallet, { as: 'user_wallets', foreignKey: 'wallet_id' });
	wallet.belongsTo(wallet_status, { as: 'wallet_status', foreignKey: 'wallet_status_id' });
	wallet_status.hasMany(wallet, { as: 'wallets', foreignKey: 'wallet_status_id' });
	operator_operator_type.belongsTo(wallet_type, { as: 'wallet_type', foreignKey: 'wallet_type_id' });
	wallet_type.hasMany(operator_operator_type, { as: 'operator_operator_types', foreignKey: 'wallet_type_id' });
	wallet.belongsTo(wallet_type, { as: 'wallet_type', foreignKey: 'wallet_type_id' });
	wallet_type.hasMany(wallet, { as: 'wallets', foreignKey: 'wallet_type_id' });
	merchant_workday.belongsTo(workdays, { as: 'workday', foreignKey: 'workday_id' });
	workdays.hasMany(merchant_workday, { as: 'merchant_workdays', foreignKey: 'workday_id' });

	return {
		accompagnements,
		activities,
		addresses,
		advance_payment,
		advance_payment_details,
		advance_payment_fees,
		app_versions,
		areas,
		article,
		article_accompagnement,
		article_commande,
		article_size,
		article_status,
		article_supplement,
		bonus,
		categories,
		category,
		category_client,
		category_sizes,
		channels,
		client,
		client_category,
		client_open_app_bonus,
		client_sub_category,
		client_subscription,
		client_type,
		commande_commande_status,
		commande_conflicts,
		commande_discounts,
		commande_issue,
		commande_status,
		commandes,
		country,
		demande,
		demande_status,
		demande_type,
		discount,
		discount_day,
		discounts,
		group,
		invitations,
		issues,
		ligne_accompagnement,
		ligne_supplement,
		like,
		limit_operation,
		livreur_area,
		livreur_livreur_request,
		livreur_livreur_requests,
		livreur_requests,
		livreurs,
		locations,
		media,
		merchant_categories,
		merchant_merchant_category,
		merchant_workday,
		merchants,
		offers,
		open_app_bonus,
		operation,
		operation_type,
		operator,
		operator_operator_type,
		operator_type,
		order,
		order_code,
		order_conflict,
		order_conflit,
		order_order_status,
		order_status,
		otp,
		parametre,
		payment_channels,
		payment_methods,
		purchases,
		qrcode,
		recharge,
		rechargements,
		retraits,
		sizes,
		sms_operators,
		sms_providers,
		subscriptions,
		supplements,
		suppliers,
		transaction,
		transaction_status,
		transaction_type,
		types,
		user,
		user_type,
		user_wallet,
		users,
		view,
		wallet,
		wallet_status,
		wallet_type,
		workdays,
	};
}

const initModelsInstance = initModels(sequelize, Sequelize);

let db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.DataTypes = DataTypes;
db.literal = literal;
db = {
	...db,
	...initModelsInstance,
};

export default db;

// export default initModels;
