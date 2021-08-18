const router = require('express').Router();
const controller = require('../controllers/index');

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
router.get('/', controller.hello)
router.post('/register/', controller.register);
router.post('/login', controller.login);
router.post('/logout', isLoggedin, controller.logout);

module.exports = router;
