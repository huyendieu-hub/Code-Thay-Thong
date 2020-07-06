var express = require('express');
var router = express.Router();
var friendlist_controller = require('../controllers/friendlistController');
const auth = require('../middlewares/auth');
router.get('/', auth, function(req, res, next) {
  friendlist_controller.listFriendList(req, res);
});
router.get('/create', function(req, res, next) {
    friendlist_controller.NewFriendList(req,res,next);
});

router.get('/edit/:id', function(req, res) {
    friendlist_controller.editFriendList(req,res);
      
});
router.post('/', function(req, res, next) {
    friendlist_controller.FriendListSave (req, res,next);
});
router.post('/store', function(req, res, next) {
    friendlist_controller.insertRecord(req, res, next);
});

router.post('/update', function(req, res, next) {
    friendlist_controller.updateRecord(req, res, next);
});

router.get('/delete/:id', (req, res) => {
    friendlist_controller.deleteRecord(req, res);
});
module.exports = router;