var express 		= require('express');
var router 			= express.Router();
var auth 			= require('../middleware/auth');
var UserController 	= require('../controllers/user');

router.post('/login', UserController.login);
router.post('/register', UserController.register);
router.get('/all', UserController.getAll);
router.get('/', auth.ensureAuthenticated, UserController.get);
router.put('/', auth.ensureAuthenticated, UserController.update);
router.delete('/', auth.ensureAuthenticated, UserController.delete);


module.exports = router;