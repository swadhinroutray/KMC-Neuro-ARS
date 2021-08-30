const { register, login, logout, hello } = require('./auth');
const { createEntry } = require('./patientRegister');

module.exports = {
	register,
	login,
	logout,
	hello,
	createEntry,
};
