const { sendError, sendResponse } = require('../utils/responseHandler');
const { patient } = require('../models/patientModel');
const { uuid } = require('uuidv4');
const { sendReferralDoc } = require('../utils/aws');
async function createEntry(req, res) {
	try {
		const data = req.body;

		if (data.doctorNumber) {
			let number = '91' + data.doctorNumber;
			await sendReferralDoc(
				number,
				data.name.trim(),
				data.doctorName
			);
		}
		const obj = new patient({
			patientID: uuid(),
			name: data.name.trim(),
			contact: '91' + data.contact,
			hospitalContact: data.hospitalContact,
			dischargeDate: data.dischargeDate,
			diagnosis: data.diagnosis,
			doctorEmail: data.doctorEmail ? data.doctorEmail : '',
			doctorName: data.doctorName,
			doctorNumber: data.doctorNumber
				? '91' + data.doctorNumber
				: '',
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
			return sendError(res, 'Could not add patient');
		}

		return sendResponse(res, 'Added new patient successfully');
	} catch (error) {
		console.log(error);
		return sendError(res, error);
	}
}
module.exports = {
	createEntry,
};
