const AWS = require('aws-sdk');

async function sendMessage(number, date) {
	const text = `Thank you for visiting KMC, your next appointment is on ${date}`;
	var params = {
		Message: text,
		PhoneNumber: number,
	};
	var publishTextPromise = new AWS.SNS({ apiVersion: '2010-03-31' })
		.publish(params)
		.promise();

	publishTextPromise
		.then(function (data) {
			// console.log(JSON.stringify({ MessageID: data.MessageId }));
			console.log('Sent Message');
		})
		.catch(function (err) {
			console.log(JSON.stringify({ Error: err }));
		});
}

module.exports = {
	sendMessage,
};
