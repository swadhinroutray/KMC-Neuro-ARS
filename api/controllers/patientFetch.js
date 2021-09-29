const { sendError, sendResponse } = require('../utils/responseHandler');
const { patient } = require('../models/patientModel');

async function getPatients(req, res) {
	try {
		cursor = await patient.find({});
		if (!cursor) {
			return sendResponse(res, 'Cursor Fetch Error');
		}
		return sendResponse(res, cursor);
	} catch (error) {
		console.log(error);
		sendResponse(res, 'An error occured');
	}
}
module.exports = {
	getPatients,
};
