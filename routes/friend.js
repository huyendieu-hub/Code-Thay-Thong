var express = require('express');
var router = express.Router();
var friend_controller = require('../controllers/friendController');
const auth = require('../middlewares/auth');
router.get('/', auth, function(req, res, next) {
  friend_controller.listFriend(req, res);
});
router.get('/create', function(req, res, next) {
    friend_controller.NewFriend(req,res,next);
});
//router.get('/list', function(req, res, next) {
//    friend_controller.listLocation(req,res);
//});

router.get('/edit/:id', function(req, res) {
    friend_controller.editFriend(req,res);
      
});
router.post('/', function(req, res, next) {
    friend_controller.FriendSave (req, res,next);
});
router.post('/store', function(req, res, next) {
    friend_controller.insertRecord(req, res, next);
});

router.post('/update', function(req, res, next) {
    friend_controller.updateRecord(req, res, next);
});

router.get('/delete/:id', (req, res) => {
    friend_controller.deleteRecord(req, res);
});
module.exports = router;