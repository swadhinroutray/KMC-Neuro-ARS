const AWS = require('aws-sdk');

async function sendMessage(number, date, name) {
	const text = `Goodmorning ${name} , Hope your doing fine , your follow-up in KmC manipal neurosurgery OPD is in 2 days. Please come for a review check up at 9am . Thank you :) `;
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
async function sendReferralDoc(number, name, doctorName) {
	const text = `Hello Dr ${doctorName}, Thank you for referring ${name} to us . He/she is doing fine and has been operated for the same . Planning to discharge the patient tomorrow.`;
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
	sendReferralDoc,
};
