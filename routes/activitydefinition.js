var express = require('express');
var router = express.Router();
var activitydefinition_controller = require('../controllers/activitydefinitionController');
const auth = require('../middlewares/auth');
router.get('/list', function(req, res, next) {
  activitydefinition_controller.listActivitydefinition(req, res,next);
});

router.get('/create', function(req, res, next) {
    activitydefinition_controller.NewActivitydefinition(req,res,next);
});

router.get('/edit/:id', function(req, res) {
    activitydefinition_controller.editActivitydefinition(req,res);
      
});
router.post('/', function(req, res, next) {
    activitydefinition_controller.ActivitydefinitionSave (req, res,next);
});
router.post('/store', function(req, res, next) {
    activitydefinition_controller.insertRecord(req, res,next);
});

router.post('/update', function(req, res, next) {
    activitydefinition_controller.updateRecord(req, res, next);
});

router.get('/delete/:id', (req, res) => {
    activitydefinition_controller.deleteRecord(req, res);
});

module.exports = router;