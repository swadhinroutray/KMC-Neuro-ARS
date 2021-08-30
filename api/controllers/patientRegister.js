const { sendError, sendResponse } = require('../utils/responseHandler');
const { patient } = require('../models/patientModel');
const { sendMessage } = require('../utils/aws');

async function createEntry(req, res) {
	try {
		const data = req.body;
		const obj = new patient({
			name: data.name.trim(),
			email: data.email.trim(),
			contact: data.contact,
			hospitalContact: data.hospitalContact,
			dischargeDate: data.dischargeDate,
			diagnosis: data.diagnosis,
			doctorName: data.doctorName,
			doctorNumber: data.doctorNumber,
			appointmentDate1: data.appointmentDate1
				? new Date(data.appointmentDate1)
				: '',
			appointmentDate3: data.appointmentDate3
				? new Date(data.appointmentDate3)
				: '',
			appointmentDate6: data.appointmentDate6
				? new Date(data.appointmentDate6)
				: '',
			appointmentDate12: data.appointmentDate12
				? new Date(data.appointmentDate12)
				: '',
			customAppointmentDate: data.customAppointmentDate
				? new Date(data.customAppointmentDate)
				: '',
		});

		result = await obj.save();
		if (!result) {
			return sendResponse(res, 'Could not add patient');
		}
		//! TODO: Add notification
		await sendMessage(data.contact, data.dischargeDate);

		return sendResponse(res, 'Added new patient successfully');
	} catch (error) {
		console.log(error);
		return sendError(res, error);
	}
}
module.exports = {
	createEntry,
};
