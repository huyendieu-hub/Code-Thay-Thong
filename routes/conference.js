var express = require('express');
var router = express.Router();
var conference_controller = require('../controllers/conferenceController');
const auth = require('../middlewares/auth');

router.get('/', auth, function(req, res, next) {
    res.render('./conference/index', { title: 'Conference', conferenceSlideBarActive: true, layout: false });

});
router.get('/room', auth, function(req, res, next) {
    res.render('./conference/room', { title: 'Conference room', conferenceSlideBarActive: true, layout: false });

});

module.exports = router;