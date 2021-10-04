const path = require('path');
require('dotenv').config({ path: path.resolve('../.env') });
const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const db = require('./config/mongo');
const routes = require('./routes/routes');
const AWS = require('aws-sdk');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const redisStore = require('./config/redis')(session);
const cron = require('node-cron');
const cronJobs = require('./utils/cronJobs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.connectMongo();
AWS.config.update({
	accessKeyId: process.env.AWS_KEY,
	secretAccessKey: process.env.AWS_SECRET,
	region: process.env.AWS_REGION,
});

//! Setting up Auth Session
const sec_sess = session({
	resave: false,
	saveUninitialized: true,
	secret: process.env.SESSION_SECRET_KEY,
	store: redisStore,
	cookie: { maxAge: 6048000000, sameSite: 'strict', httpOnly: false },
});
app.use(sec_sess);
app.use(cookieParser('session'));

app.use('/api', routes);

//? CRON Jobs
cron.schedule(
	'0 9 * * *',
	() => {
		try {
			console.log('Check CRON set');
			cronJobs.checkAndSendSMS();
		} catch (error) {
			console.log(error);
			console.log('Shutting down Server');
			shutDown();
		}
	},
	{
		timezone: 'Asia/Kolkata',
	}
);

app.listen(port, () => {
	console.log(`Listening on ${port}`);
});

process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);

async function shutDown() {
	console.log('Received kill signal, shutting down gracefully');
	await db.disconnectMongo();
	console.log('Server Shutdown');
	process.exit(0);
}
