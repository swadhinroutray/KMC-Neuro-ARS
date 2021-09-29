const router = require('express').Router();
const controller = require('../controllers/index');
const test = require('../utils/cronJobs');
function isLoggedin(req, res, next) {
	if (req.session) {
		if (req.session.logged_in == true) {
			next();
		} else {
			return res.send({
				success: true,
				data: 'User Not Logged in',
			});
		}
	} else {
		return res.send({ success: true, data: 'User Not Logged in' });
	}
}

//* Auth Routes
router.get('/', controller.hello);

router.get('/test', test.checkAndSendSMS);

router.post('/register/', controller.register);
router.post('/login', controller.login);
router.post('/logout', isLoggedin, controller.logout);

//* Registration of Patients
router.post('/patient', isLoggedin, controller.createEntry);

router.get('/getpatients', isLoggedin, controller.getPatients);

//* Appointment Cancellation
router.post('/cancel', isLoggedin, controller.cancelAppointment);

module.exports = router;
