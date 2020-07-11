const services = require('../services');

const verifyEmailCode = async (req, res, next) => {
	const code = req.query.code;
	try{
		await services.verifyEmail.verifyCode(code);
	} catch(error) {
		next(error);
	}

	await res.status(200).send('email verification success');
};

module.exports = { verifyEmailCode };
