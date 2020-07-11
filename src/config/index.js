const emailConfig = {
	service: process.env['MAIL_SERVICE'],
	auth: {
		user: process.env['MAIL_USER'],
		pass: process.env['MAIL_PASS']
	}
}

module.exports = { emailConfig };
