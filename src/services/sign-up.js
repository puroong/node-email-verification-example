const models = require('../models');

const signUp = async (email) => {
	try {
		return await models.user.create({email: email});
	} catch(error) {
		throw new Error(`signUp ${error}`)
	}
};

module.exports = signUp;
