import db from '../models/init-models.js';
const Merchants = db.merchants;
const Accompagnements = db.accompagnements;
const Client = db.client;
const Category = db.category;
const Article = db.article;
const Media = db.media;
const ArticleAccompagnement = db.article_accompagnement;
const ArticleSupplement = db.article_supplement;

const accompagnementServices = {
	saveAccompagnement: async ({ name, merchant_id }) => {
		try {
			const newAccompagnement = await Accompagnements.create({
				name: name,
				article_id: 1,
				merchant_id: parseInt(merchant_id),
				is_deleted: false,
				price: 0,
				available: true,
			});
			return newAccompagnement;
		} catch (error) {
			console.log(error.message);
			throw new Error('Failed to save new accompagnement');
		}
	},

	editAccompagnement: async ({ name, id, action }) => {
		let accompagnement;
		try {
			accompagnement = await Accompagnements.findOne({ where: { id: id } });
		} catch (e) {
			throw new Error('Error while fetching the accompagnement');
		}

		if (!accompagnement) {
			throw new Error('Failed to fetch accompagnement');
		}

		let updateObj = {};
		if (action === 'edit') {
			updateObj = {
				name,
				updated_at: new Date(),
			};
		} else if (action === 'edit_and_available') {
			updateObj = {
				name: name,
				available: !accompagnement.available,
				updated_at: new Date(),
			};
		} else if (action === 'available') {
			updateObj = {
				available: !accompagnement.available,
				updated_at: new Date(),
			};
		} else if (action === 'delete') {
			updateObj = {
				is_deleted: !accompagnement.is_deleted,
				deleted_at: new Date(),
			};
		}

		try {
			await accompagnement.update(updateObj);
			return await accompagnement.save();
		} catch (e) {
			throw new Error('Could not update the client information in the database');
		}
	},
};

export default accompagnementServices;
