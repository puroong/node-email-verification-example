const express = require('express');
const app = express();
const port = 3000;

const sequelize = require('./db');
const models = require('./models');

const api = require('./api');

const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.post('/sign-up', api.user.signUp);
app.get('/verify-email-code', api.verifyEmail.verifyEmailCode);

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send('Internal Server Error');
});

app.use((req, res, next) => {
	res.status(404).send('Not Found');
});

(async run => {
	await sequelize.sync();

	app.listen(port, () => { console.log(`running on http://localhost:${port}`)});
})()

