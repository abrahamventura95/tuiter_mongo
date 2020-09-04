var express 		= require('express');
var router 			= express.Router();
var auth 			= require('../middleware/auth');
var Controller 		= require('../controllers/tuit');

router.post('/', auth.ensureAuthenticated, Controller.create);
router.get('/all', auth.ensureAuthenticated, Controller.getAll);
router.get('/', auth.ensureAuthenticated, Controller.get);
router.delete('/', auth.ensureAuthenticated, Controller.delete);


module.exports = router;