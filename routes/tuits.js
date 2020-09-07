var express 		= require('express');
var router 			= express.Router();
var auth 			= require('../middleware/auth');
var Controller 		= require('../controllers/tuit');

router.post('/', auth.ensureAuthenticated, Controller.create);
router.get('/all', auth.ensureAuthenticated, Controller.getAll);
router.get('/timeline', auth.ensureAuthenticated, Controller.getTimeline);
router.get('/user', auth.ensureAuthenticated, Controller.getAllUser);
router.get('/', auth.ensureAuthenticated, Controller.get);
router.delete('/', auth.ensureAuthenticated, Controller.delete);

router.post('/like', auth.ensureAuthenticated, Controller.like);
router.get('/likes', auth.ensureAuthenticated, Controller.getLikes);
router.get('/likes/user', auth.ensureAuthenticated, Controller.getLikesUser);
router.delete('/like', auth.ensureAuthenticated, Controller.unlike);

module.exports = router;