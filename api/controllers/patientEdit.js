const { sendError, sendResponse } = require('../utils/responseHandler');
const { patient } = require('../models/patientModel');

async function cancelAppointment(req, res) {
	try {
		const patientID = req.body.patientID;
		const appointVal = req.body.appointVal;
		if (appointVal == 1) {
			result = await patient.updateOne(
				{
					patientID: patientID,
				},
				{
					$set: {
						appointmentDate1: null,
					},
				}
			);

			if (!result) {
				sendResponse(res, 'Update Error');
			}
		}
		if (appointVal == 3) {
			result = await patient.updateOne(
				{
					patientID: patientID,
				},
				{
					$set: {
						appointmentDate3: null,
					},
				}
			);

			if (!result) {
				sendResponse(res, 'Update Error');
			}
		}

		if (appointVal == 6) {
			result = await patient.updateOne(
				{
					patientID: patientID,
				},
				{
					$set: {
						appointmentDate6: null,
					},
				}
			);

			if (!result) {
				sendResponse(res, 'Update Error');
			}
		}
		if (appointVal == 12) {
			result = await patient.updateOne(
				{
					patientID: patientID,
				},
				{
					$set: {
						appointmentDate12: null,
					},
				}
			);

			if (!result) {
				sendResponse(res, 'Update Error');
			}
		}
		if (appointVal == 420) {
			//!Custom Date Update
			result = await patient.updateOne(
				{
					patientID: patientID,
				},
				{
					$set: {
						customAppointmentDate: null,
					},
				}
			);

			if (!result) {
				sendResponse(res, 'Update Error');
			}
		}
		return sendResponse(res, 'Successfully cancelled appointment!');
	} catch (error) {
		console.log(error);
		sendResponse(res, 'An error occured');
	}
}

module.exports = {
	cancelAppointment,
};
