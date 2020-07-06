var express = require('express');
var router = express.Router();
var healthcareservice_controller = require('../controllers/healthcareserviceController');
// const auth = require('../middlewares/auth');

router.get('/list', function(req, res, next) {
   healthcareservice_controller.listHealthCareService(req, res);
});
router.get('/hhh/:_id', function(req, res, next) {
//   healthcareservice_controller.listHealthCareService(req, res);
    healthcareservice_controller.queryLocation(req,res);
});
router.get('/create',function(req,res,next){
  healthcareservice_controller.NewHealthCareService(req,res,next);
});
router.get('/:_id',function(req,res,next){
  healthcareservice_controller.editHealthCareService(req,res);
});

router.post('/update',function(req,res,next){
  healthcareservice_controller.updateRecord(req,res);
});
router.post('/store',function(req,res,next){
  healthcareservice_controller.insertRecord(req,res,next)
});
router.get('/delete/:id', (req, res) => {
    healthcareservice_controller.deleteRecord(req, res);
});

module.exports = router;