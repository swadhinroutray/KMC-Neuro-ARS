const bcrypt = require('bcryptjs');
const { user } = require('../models/userModel');
const { uuid } = require('uuidv4');
const { sendError, sendResponse } = require('../utils/responseHandler');

async function register(req, res) {
	try {
		const salt = await bcrypt.genSalt(
			parseInt(process.env.SALT_FACTOR)
		);
		bcrypt.hash(req.body.password, salt).then(async (hash) => {
			const newUser = new user({
				userID: uuid(),
				name: req.body.name.trim(),
				email: req.body.email.trim(),
				password: hash,
				contact: req.body.contact.trim(),
			});

			var result = await newUser.save();
			if (!result) {
				console.log(e);
				return sendError(res, 'An error Occured');
			}
			//   console.log(result);
			return sendResponse(res, newUser);
		});
	} catch (e) {
		console.log(e);
		return sendError(res, e);
	}
}
async function login(req, res) {
	try {
		// console.log(req.session)
		if (req.session.logged_in == undefined || !req.session.logged_in) {
			result = await user.findOne({ email: req.body.email.trim() });
			// console.log(result)

			if (!result) return sendResponse(res, 'Invalid Credentials');
			else if (result.length == 0)
				return sendResponse(res, 'Invalid Credentials');
			else {
				resultVal = await bcrypt.compare(
					req.body.password,
					result.password
				);

				if (!resultVal)
					return sendResponse(res, 'Invalid Passowrd');
				else {
					req.session.email = req.body.email;
					req.session.name = result.name;
					req.session.logged_in = true;
					req.session.save(() => {
						return sendResponse(res, result);
					});
				}
			}
		} else {
			console.log(req.session);
			return sendResponse(res, 'Already Logged In');
		}
	} catch (e) {
		console.log(e);
		return sendResponse(res, e);
	}
}

async function logout(req, res) {
	// console.log(req.session);

	await req.session.destroy();
	// console.log(req.session);
	return sendResponse(res, 'Logged Out Successfully');
}

module.exports = {
	register,
	login,
	logout,
};
