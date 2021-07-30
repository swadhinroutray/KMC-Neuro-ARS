const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
	userID: {
		type: String,
		required: true,
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
	password: {
		type: String,
		required: true,
	},
	contact: {
		// Phone numner
		type: String,
		required: true,
	},
});

const user = mongoose.model('user', userSchema);
module.exports = {
	user,
};
