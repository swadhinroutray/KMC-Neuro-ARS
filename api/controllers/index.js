const { register, login, logout, hello } = require('./auth');
const { createEntry } = require('./patientRegister');
const { cancelAppointment } = require('./patientEdit');
const { getPatients } = require('./patientFetch');

module.exports = {
	register,
	login,
	logout,
	hello,
	createEntry,
	cancelAppointment,
	getPatients,
};
