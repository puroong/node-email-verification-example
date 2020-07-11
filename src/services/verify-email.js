const nodemailer = require('nodemailer');
const models = require('../models');
const { emailConfig } = require('../config');

const generateCode = (length) => Math.random().toString(36).substring(length);

const createEmailTransporter = () => {
 	return nodemailer.createTransport(emailConfig);
};

const createMailOptions = (receiverEmail, code) => {
	return {
		from: emailConfig.user,
		to: receiverEmail,
		subject: 'Sending Email using Node.js',
		text: `http://localhost:3000/verify-email-code?code=${code}`
	}
}

const sendEmail = async (user) => {
	const codeLength = 6;
	const code = generateCode(codeLength);
	const emailTransporter = createEmailTransporter();
	const mailOptions = createMailOptions(user.email, code);

	try {
		await models.emailVerifyCode.create({ userId: user.id, code: code });
	} catch(error) {
		throw new Error('sendEmail: ', error);
	}

	return new Promise((resolve, reject) => {
		emailTransporter.sendMail(mailOptions, (error, info) => {
			if(error) reject(error);
			else resolve(info);
		});
	})
	.then(info => console.log(info))
	.catch(error => console.error(error));
};

const verifyCode = async (code) => {
	const emailVerifyCode = await models.emailVerifyCode.findOne({ where: { code: code }});

	if(emailVerifyCode === null) throw new Error('verifyCode: Invalid Code')

	const user = await models.user.findOne({ where: { id: emailVerifyCode.userId }});

	if(user === null) throw new Error('verifyCode: User not found');

	user.verificationStatus = 'VERIFIED';
	await user.save();
}

module.exports = {
	sendEmail,
	verifyCode
}
