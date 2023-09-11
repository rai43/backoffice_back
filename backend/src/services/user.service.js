import bcrypt from 'bcryptjs';
import db from '../models/init-models.js';
import userTypeServices from './userType.service.js';

const User = db.user;
const UserType = db.user_type;
const sequelize = db.sequelize;
const Op = db.Sequelize.Op;

const userServices = {
	getFullUserById: async (id) => {
		try {
			const whereClause = {
				id,
				// is_deleted: {
				//   [Op.eq]: false,
				// },
			};

			const queryOptions = {
				where: whereClause,
			};

			return await User.findOne(queryOptions);
		} catch (error) {
			throw new Error('Failed to fetch user');
		}
	},

	/**
	 * Params:
	 *  searchObj: { id: value } || { email: value }
	 */
	findUserByIdOrEmail: async (searchObj, includeDeleted = false) => {
		try {
			const whereClause = {
				...searchObj,
			};

			if (includeDeleted) {
				whereClause.is_deleted = {
					[Op.eq]: true,
				};
			}

			const queryOptions = {
				attributes: ['id', [sequelize.literal("CONCAT(user.nom, ' ', user.prenom)"), 'nom_complet'], 'nom', 'prenom', 'telephone', 'email', 'adresse', 'is_locked', 'created_at'],
				include: [
					{
						model: UserType,
						attributes: ['id', 'code', 'libelle'],
						as: 'user_type',
					},
					// {
					// 	model: User,
					// 	as: 'UserCreate',
					// 	required: true,
					// 	attributes: ['id', 'nom', 'prenom', 'email', 'telephone'],
					// },
				],
				where: whereClause,
			};
			return await User.findOne(queryOptions);
		} catch (error) {
			console.log(error.message);
			throw new Error('Failed to fetch user');
		}
	},

	findUsers: async (active, inactive, from, sort, searchPattern, limit = 10) => {
		try {
			let users;
			const whereClause = {
				id: {
					[Op.gt]: from || 0,
				},
				[Op.or]: [{ is_deleted: { [Op.eq]: false } }, { is_deleted: { [Op.eq]: null } }],
			};

			if (!(active || inactive)) {
				return [];
			} else if ((active || inactive) && !(active && inactive)) {
				whereClause.is_locked = !!inactive;
			}

			if (searchPattern) {
				// delete whereClause.id; // Remove the id condition if searchPattern is present
				whereClause[Op.or] = [{ nom: { [Op.like]: `%${searchPattern}%` } }, { prenom: { [Op.like]: `%${searchPattern}%` } }, { email: { [Op.like]: `%${searchPattern}%` } }];
			}

			const queryOptions = {
				attributes: ['id', [sequelize.literal("CONCAT(user.nom, ' ', user.prenom)"), 'nom_complet'], 'nom', 'prenom', 'telephone', 'email', 'adresse', 'is_locked', 'created_by'],
				include: [
					{
						model: UserType,
						attributes: ['id', 'code', 'libelle'],
						as: 'user_type',
					},
					// {
					// 	model: User,
					// 	// as: 'UserCreate',
					// 	required: true,
					// 	attributes: ['id', 'nom', 'prenom', 'email', 'telephone'],
					// },
				],
				where: whereClause,
				order: [
					['id', sort],
					// ["nom", sort],
					['is_locked', sort],
				],
			};

			if (!searchPattern) {
				queryOptions.limit = limit;
			}

			users = await User.findAll(queryOptions);

			return users;
		} catch (error) {
			console.log(error.message);
			throw new Error('Failed to fetch users');
		}
	},

	saveUser: async (nom, prenom, telephone, email, adresse, userType, password, createdByUserId) => {
		let userTypeObj;

		try {
			userTypeObj = await userTypeServices.findUserType(userType, ['id', 'code', 'libelle']);
		} catch (e) {
			throw new Error('Failed to fetch the user type assign to the user');
		}

		if (!userTypeObj) {
			throw new Error('Failed to fetch the user type assign to the user');
		}

		let existingUser = await userServices.findUserByIdOrEmail({ email }, true);

		if (existingUser) {
			throw new Error('User already exists');
		}

		let hashedPassword;
		try {
			hashedPassword = await bcrypt.hash(password, 12);
		} catch (err) {
			throw new Error('Error while generating the password');
		}

		// Object to be inserted
		const newUserObject = {
			nom,
			prenom,
			telephone,
			email,
			adresse,
			password: hashedPassword,
			user_type_id: userTypeObj.id,
			is_locked: 0,
			created_by: createdByUserId,
		};

		let newUser;
		try {
			newUser = await User.create(newUserObject);
		} catch (e) {
			throw new Error('Error while creating the new user');
		}

		return newUser;
	},

	updateOrDeleteUserById: async (updatedBy, id, nom = '', prenom = '', telephone = '', email = '', adresse = '', userType = '') => {
		const isDeleteOperation = !nom || !prenom || !telephone || !email || !adresse || !userType;

		let userTypeObj;
		if (!isDeleteOperation) {
			try {
				userTypeObj = await userTypeServices.findUserType(userType, ['id', 'code', 'libelle']);
			} catch (e) {
				throw new Error('Failed to fetch the user type assign to the user');
			}

			if (!userTypeObj) {
				throw new Error('Failed to fetch the user type assign to the user');
			}
		}

		let existingUser = await userServices.getFullUserById(id);

		if (!existingUser) {
			throw new Error('User does not exist in the database');
		}

		let updateObj;
		if (isDeleteOperation) {
			updateObj = {
				is_deleted: !existingUser.is_deleted,
				deleted_at: new Date(),
				deleted_by: updatedBy,
			};
		} else {
			updateObj = {
				nom,
				prenom,
				telephone,
				email,
				adresse,
				user_type_id: userTypeObj.id,
				updated_by: updatedBy,
				updated_at: new Date(),
			};
		}

		try {
			// updating the instance of the User model
			await existingUser.update(updateObj);

			// saving the instance of the User model
			return await existingUser.save();
		} catch (e) {
			throw new Error('Could not update the user in the database');
		}
	},
};

export default userServices;
