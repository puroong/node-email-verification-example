const services = require('../services');

const signUp = async (req, res, next) => {
	try {
		const email = req.body.email;
		const newUser = await services.signUp(email);
		await services.verifyEmail.sendEmail(newUser);
	} catch(error) {
		next(error)
	}

	res.status(200).send('check ur email');
};

module.exports = {
	signUp
}
