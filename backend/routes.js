import userRoutes from './src/routes/user.routes.js';
import clientRoutes from './src/routes/client.routes.js';
import livreursRoutes from './src/routes/livreurs.routes.js';
import userTypeRoutes from './src/routes/userType.route.js';
import transactionRoutes from './src/routes/transaction.routes.js';
import rechargementsRoutes from './src/routes/rechargements.routes.js';
import retraitsdRoutes from './src/routes/retraits.routes.js';
import walletRoutes from './src/routes/wallet.routes.js';
import orderRoutes from './src/routes/order.routes.js';
import articleRoutes from './src/routes/article.routes.js';
import merchantsRoutes from './src/routes/merchants.routes.js';
import accompagnementRoutes from './src/routes/accompagnement.routes.js';

const routes = (app) => {
	app.use('/api/user-type', userTypeRoutes);
	app.use('/api/user', userRoutes);
	app.use('/api/client', clientRoutes);
	app.use('/api/delivery', livreursRoutes);
	app.use('/api/transaction', transactionRoutes);
	app.use('/api/rechargement', rechargementsRoutes);
	app.use('/api/retrait', retraitsdRoutes);
	app.use('/api/wallet', walletRoutes);
	app.use('/api/order', orderRoutes);
	app.use('/api/articles', articleRoutes);
	app.use('/api/merchants-ordering', merchantsRoutes);
	app.use('/api/accompagnements', accompagnementRoutes);
};

export default routes;
