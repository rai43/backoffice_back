import { matchedData, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import db from '../models/init-models.js';
import userServices from '../services/user.service.js';

const sequelize = db.sequelize;
const User = db.user;
const UserType = db.user_type;

const userController = {
	login: async (req, res, next) => {
		const valResult = validationResult(req);
		if (!valResult.isEmpty()) {
			res.statusMessage = 'Authentication failed due to invalid data';
			return res.sendStatus(400);
		}

		// Retrieving the data from the req.body
		const { email, password } = req.body;

		// try fetching using the given email id to see if the user exists in our db.
		let user;
		try {
			user = await User.findOne({
				attributes: ['id', [sequelize.literal("CONCAT(nom, ' ', prenom)"), 'nom_complet'], 'nom', 'prenom', 'password', 'telephone', 'email', 'adresse', 'is_locked'],
				include: [
					{
						model: UserType,
						as: 'user_type',
					},
				],
				where: {
					email: email,
				},
			});
		} catch (e) {
			console.log(e.message);
			res.statusMessage = 'Could not get the user information';
			return res.sendStatus(500);
		}

		// if the user has not been found
		if (!user) {
			console.log('here');
			res.statusMessage = 'User not found!';
			return res.sendStatus(404);
		}

		// check if the provided password matches with the fetched user password
		let isValidPassword = false;
		try {
			isValidPassword = await bcrypt.compare(password, user.password);
		} catch (e) {
			res.statusMessage = 'Unable to connect the user';
			return res.sendStatus(500);
		}

		// return in case the passwords don't match
		if (!isValidPassword) {
			res.statusMessage = 'Incorrect password, verify your information';
			return res.sendStatus(403);
		}

		let token;
		try {
			token = jwt.sign(
				{
					userId: user.id,
					email: user.email,
					telephone: user.telephone,
					adresse: user.adresse,
					//     should add profile_type
				},
				process.env.JWT_KEY,
				{ expiresIn: '24h' }
				// { expiresIn: '5s' },
			);
		} catch (err) {
			res.statusMessage = 'Unable to connect the user';
			return res.sendStatus(500);
		}

		if (!token) {
			res.statusMessage = 'Unable to generate the token for this user';
			return res.sendStatus(403);
		}

		res.status(200).json({
			userId: user.id,
			nom: user.nom,
			email: user.email,
			telephone: user.telephone,
			adresse: user.adresse,
			token: token,
		});
	},

	getUsers: async (req, res, next) => {
		const valResult = validationResult(req);
		if (!valResult.isEmpty()) {
			res.statusMessage = 'Invalid params passed';
			return res.sendStatus(400);
		}
		const requestData = matchedData(req);

		const IS_ACTIVE = requestData.active === 'true';
		const IS_INACTIVE = requestData.inactive === 'true';
		const FROM = parseInt(requestData.from) || 0;
		const LIMIT = parseInt(requestData.limit);
		const SEARCH_PATTERN = requestData.searchPattern === 'undefined' ? '' : requestData.searchPattern;
		const SORT = 'ASC';
		let users;
		try {
			users = await userServices.findUsers(IS_ACTIVE, IS_INACTIVE, FROM, SORT, SEARCH_PATTERN, LIMIT);
		} catch (e) {
			res.statusMessage = 'Could not fetch the users';
			return res.sendStatus(500);
		}

		if (!users) {
			res.statusMessage = 'Could not fetch the users';
			return res.sendStatus(500);
		}

		return res.json({
			message: 'Successfully fetch the users',
			users,
			lastId: users[users.length - 1]?.id || FROM,
		});
	},

	saveUser: async (req, res, next) => {
		const valResult = validationResult(req);
		if (!valResult.isEmpty()) {
			console.log(valResult);
			res.statusMessage = 'Invalid params passed';
			return res.sendStatus(400);
		}
		const requestData = matchedData(req);

		const NOM = requestData.nom;
		const PRENOM = requestData.prenom;
		const TELEPHONE = requestData.telephone;
		const EMAIL = requestData.email;
		const ADRESSE = requestData.adresse;
		const USER_TYPE = parseInt(requestData.userType);
		const PASSWORD = requestData.password;

		let user;
		try {
			const u = await userServices.saveUser(NOM, PRENOM, TELEPHONE, EMAIL, ADRESSE, USER_TYPE, PASSWORD, req.userData.userId);
			user = await userServices.findUserByIdOrEmail({ id: u.id });
		} catch (e) {
			res.statusMessage = 'Could not save the user';
			return res.sendStatus(500);
		}

		if (!user) {
			res.statusMessage = 'The user did not get saved';
			return res.sendStatus(409);
		}

		return res.json({
			message: 'Successfully saved the user',
			user,
		});
	},

	updateUser: async (req, res, next) => {
		const valResult = validationResult(req);
		if (!valResult.isEmpty()) {
			res.statusMessage = 'Invalid params passed';
			return res.sendStatus(400);
		}
		const requestData = matchedData(req);
		const USER_ID = requestData.uid;
		const NOM = requestData.nom;
		const PRENOM = requestData.prenom;
		const TELEPHONE = requestData.telephone;
		const EMAIL = requestData.email;
		const ADRESSE = requestData.adresse;
		const USER_TYPE = parseInt(requestData.userType);

		let user;
		try {
			const u = await userServices.updateOrDeleteUserById(req.userData.userId, USER_ID, NOM, PRENOM, TELEPHONE, EMAIL, ADRESSE, USER_TYPE);
			user = await userServices.findUserByIdOrEmail({ id: u.id });
		} catch (e) {
			res.statusMessage = 'Could not save the user';
			return res.sendStatus(500);
		}

		return res.json({
			message: 'Successfully updated the user',
			user,
		});
	},

	deleteUser: async (req, res, next) => {
		const valResult = validationResult(req);
		if (!valResult.isEmpty()) {
			res.statusMessage = 'Invalid params passed';
			return res.sendStatus(400);
		}
		const requestData = matchedData(req);
		const USER_ID = requestData.uid;

		let user;
		try {
			const u = await userServices.updateOrDeleteUserById(req.userData.userId, USER_ID);
			user = await userServices.findUserByIdOrEmail({ id: u.id }, true);
		} catch (e) {
			res.statusMessage = 'Could not save the user';
			return res.sendStatus(500);
		}

		return res.json({
			message: 'Successfully deleted the user',
			user,
		});
	},
};

export default userController;
