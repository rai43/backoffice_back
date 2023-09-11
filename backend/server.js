// import fs from 'fs';
// import path from 'path';
import cors from 'cors';
import express from 'express';
import * as bodyParser from 'body-parser';

import routes from './routes.js';
// import db from './src/models/index.js';
import db from './src/models/init-models.js';
import logger from './src/utils/logger.js';

import swaggerDocs from './src/utils/swagger.js';
import { config } from 'dotenv';

config();

const app = express();
const PORT = process.env.PORT || 8080;

const corsOptions = {
	origin: 'http://localhost:3000',
};

app.use(express.json());

app.use(cors(corsOptions));

try {
	app.listen(PORT, async () => {
		await db.sequelize.sync();
		//     // .sync({ force: true })

		logger.info(`App running at http:localhost:${PORT}`);

		// app.use('/uploads/images', express.static(path.join('uploads', 'images')));
		routes(app);

		swaggerDocs(app, PORT);
	});
} catch (e) {
	logger.info(`Failed to start app at http:localhost:${PORT}`);
	logger.info(`Error: ${e.message}`);
}
