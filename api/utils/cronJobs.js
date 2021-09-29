const { patient } = require('../models/patientModel');
const { sendMessage } = require('./aws');
async function checkAndSendSMS() {
	try {
		cursor = await patient.find({});

		for (let index = 0; index < cursor.length; index++) {
			const element = cursor[index];
			let date = new Date();
			if (element.appointmentDate1 !== null) {
				var timeDiff = Math.abs(
					element.appointmentDate1.getTime() -
						date.getTime()
				);
				var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
				console.log(diffDays);
				if (diffDays == 2) {
					const dateString = date.toLocaleDateString(
						element.appointmentDate1
					);
					await sendMessage(element.number, dateString);
					result = await patient.updateOne(
						{
							patientID: element.patientID,
						},
						{
							$set: {
								appointmentDate1: null,
							},
						}
					);

					if (!result) {
						console.log('Cron Error');
					}
				}
			}
			if (element.appointmentDate3 !== null) {
				var timeDiff = Math.abs(
					element.appointmentDate3.getTime() -
						date.getTime()
				);
				var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
				console.log(diffDays);
				if (diffDays == 2) {
					const dateString = date.toLocaleDateString(
						element.appointmentDate3
					);
					await sendMessage(element.number, dateString);
					result = await patient.updateOne(
						{
							patientID: element.patientID,
						},
						{
							$set: {
								appointmentDate3: null,
							},
						}
					);

					if (!result) {
						console.log('Cron Error');
					}
				}
			}
			if (element.appointmentDate6 !== null) {
				var timeDiff = Math.abs(
					element.appointmentDate6.getTime() -
						date.getTime()
				);
				var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
				console.log(diffDays);
				if (diffDays == 2) {
					const dateString = date.toLocaleDateString(
						element.appointmentDate6
					);
					await sendMessage(element.number, dateString);
					result = await patient.updateOne(
						{
							patientID: element.patientID,
						},
						{
							$set: {
								appointmentDate6: null,
							},
						}
					);

					if (!result) {
						console.log('Cron Error');
					}
				}
			}
			if (element.appointmentDate12 !== null) {
				var timeDiff = Math.abs(
					element.appointmentDate12.getTime() -
						date.getTime()
				);
				var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
				console.log(diffDays);
				if (diffDays == 2) {
					const dateString = date.toLocaleDateString(
						element.appointmentDate12
					);
					await sendMessage(element.number, dateString);
					result = await patient.updateOne(
						{
							patientID: element.patientID,
						},
						{
							$set: {
								appointmentDate12: null,
							},
						}
					);

					if (!result) {
						console.log('Cron Error');
					}
				}
			}
			if (element.customAppointmentDate !== null) {
				var timeDiff = Math.abs(
					element.customAppointmentDate.getTime() -
						date.getTime()
				);
				var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
				console.log(diffDays);
				if (diffDays == 2) {
					const dateString = date.toLocaleDateString(
						element.customAppointmentDate
					);
					await sendMessage(element.number, dateString);
					result = await patient.updateOne(
						{
							patientID: element.patientID,
						},
						{
							$set: {
								customAppointmentDate: null,
							},
						}
					);

					if (!result) {
						console.log('Cron Error');
					}
				}
			}
		}
	} catch (error) {
		console.log(error);
	}
}

module.exports = {
	checkAndSendSMS,
};
