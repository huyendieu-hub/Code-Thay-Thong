var express = require('express');
var router = express.Router();
var friendrequest_controller = require('../controllers/friendrequestController');
const auth = require('../middlewares/auth');
router.get('/', auth, function(req, res, next) {
  friendrequest_controller.listFriendRequest(req, res);
});
router.get('/create', function(req, res, next) {
    friendrequest_controller.NewFriendRequest(req,res,next);
});

router.get('/edit/:id', function(req, res) {
    friendrequest_controller.editFriendRequest(req,res);
      
});
router.post('/', function(req, res, next) {
    friendrequest_controller.FriendRequestSave (req, res,next);
});
router.post('/store', function(req, res, next) {
    friendrequest_controller.insertRecord(req, res, next);
});

router.post('/update', function(req, res, next) {
    friendrequest_controller.updateRecord(req, res, next);
});

router.get('/delete/:id', (req, res) => {
    friendrequest_controller.deleteRecord(req, res);
});
module.exports = router;