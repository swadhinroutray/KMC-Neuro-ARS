const { sendError, sendResponse } = require('../utils/responseHandler');
const { patient } = require('../models/patientModel');

async function cancelAppointment(req, res) {
	try {
		const patientID = req.body.patientID;
		const appointVal = req.body.appointVal;

		let result = null;
		if (appointVal == 1) {
			result = await patient.updateOne(
				{
					_id: patientID,
				},
				{
					$set: {
						appointmentDate1: null,
					},
				}
			);
		}
		else if (appointVal == 3) {
			result = await patient.updateOne(
				{
					_id: patientID,
				},
				{
					$set: {
						appointmentDate3: null,
					},
				}
			);
		}

		else if (appointVal == 6) {
			result = await patient.updateOne(
				{
					_id: patientID,
				},
				{
					$set: {
						appointmentDate6: null,
					},
				}
			);
		}
		else if (appointVal == 12) {
			result = await patient.updateOne(
				{
					_id: patientID,
				},
				{
					$set: {
						appointmentDate12: null,
					},
				}
			);
		}
		else if (appointVal == 420) {
			//!Custom Date Update
			result = await patient.updateOne(
				{
					_id: patientID,
				},
				{
					$set: {
						customAppointmentDate: null,
					},
				}
			);
		}
		else {
			sendError(res, "An Invalid appointment value was sent. Should be in {1, 3, 6, 12, 420}.")
		}

		if (!result) {
			sendError(res, "Update Error: Couldn't find that patientID");
		}
		return sendResponse(res, result);

	} catch (error) {
		console.log(error);
		sendResponse(res, 'An error occured');
	}
}

module.exports = {
	cancelAppointment,
};
