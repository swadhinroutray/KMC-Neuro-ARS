const path = require('path');
require('dotenv').config({ path: path.resolve('../.env') });
const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const db = require('./config/mongo');
const routes = require('./routes/routes');
// const AWS = require("aws-sdk");
const cookieParser = require('cookie-parser');
const session = require('express-session');
const redisStore = require('./config/redis')(session);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.connectMongo();
// AWS.config.update({
//   Bucket: process.env.BUCKET_NAME,
//   accessKeyId: process.env.AWS_KEY,
//   secretAccessKey: process.env.AWS_SECRET,
//   region: process.env.AWS_REGION,
// });

// s3 = new AWS.S3({ apiVersion: "2006-03-01" });

//! Setting up Auth Session
const sec_sess = session({
	resave: false,
	saveUninitialized: true,
	secret: process.env.SESSION_SECRET_KEY,
	store: redisStore,
	cookie: { maxAge: 6048000000, sameSite: 'strict', httpOnly: false},
});
app.use(sec_sess);
app.use(cookieParser('session'));

app.use('/api', routes);

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
