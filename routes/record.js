var express = require('express');
var router = express.Router();
var record_controller = require('../controllers/recordController');
const auth = require('../middlewares/auth');


router.get('/create/:id', auth, function(req, res, next){
  record_controller.create(req, res, next);
});

router.post('/store', auth, function(req, res, next){
  record_controller.store(req, res, next);
});
router.post('/update', auth, function(req, res, next){
  record_controller.update(req, res, next);
});
router.post('/predict4Image', function(req, res, next){
  record_controller.predict4Image(req, res, next);
});
module.exports = router;
