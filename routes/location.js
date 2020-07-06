var express = require('express');
var router = express.Router();
var location_controller = require('../controllers/locationController');
// const auth = require('../middlewares/auth');


router.get('/list', function(req, res, next) {
   location_controller.listLocation(req, res);
});
router.get('/hhh/:_id', function(req, res, next) {
//   healthcareservice_controller.listHealthCareService(req, res);
    location_controller.queryAddress(req,res);
});
router.get('/create',function(req,res,next){
  location_controller.NewLocation(req,res,next);
});
router.get('/edit/:id',function(req,res,next){
  location_controller.editLocation(req,res);
});
router.post('/', function(req, res, next) {
    organization_controller.LocationSave (req, res,next);
});
router.post('/update',function(req,res,next){
  location_controller.updateRecord(req,res);
});
router.post('/store',function(req,res,next){
  location_controller.insertRecord(req,res,next)
});
router.get('/delete/:id', (req, res) => {
    location_controller.deleteRecord(req, res);
});
module.exports = router;
