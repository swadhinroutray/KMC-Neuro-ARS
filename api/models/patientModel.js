const mongoose = require('mongoose');
const patientSchema = new mongoose.Schema({
	patientID: {
		type: String,
	},
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	contact: {
		// Phone numner
		type: String,
		required: true,
	},
	hospitalContact: {
		type: String,
		required: true,
	},
	dischargeDate: {
		type: Date,
		required: true,
	},
	diagnosis: {
		type: String,
		required: true,
	},
	doctorEmail: {
		// referral
		type: String,
	},
	doctorNumber: {
		//referral
		type: String,
	},
	appointmentDate1: {
		type: Date,
	},
	appointmentDate3: {
		type: Date,
	},
	appointmentDate6: {
		type: Date,
	},
	appointmentDate12: {
		type: Date,
	},
	customAppointmentDate: {
		type: Date,
	},
});

const patient = mongoose.model('patients', patientSchema);
module.exports = {
	patient,
};
