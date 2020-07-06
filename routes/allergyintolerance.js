var express = require('express');
var router = express.Router();
var allergyintolerance_controller = require('../controllers/allergyintoleranceController');
const auth = require('../middlewares/auth');
router.get('/list', function(req, res) {
  allergyintolerance_controller.listAllergyIntolerance(req, res);
});

router.get('/create', function(req, res, next) {
    allergyintolerance_controller.NewAllergyIntolerance(req,res,next);
});

router.get('/edit/:id', function(req, res) {
    allergyintolerance_controller.editAllergyIntolerance(req,res);
  
});
router.post('/', function(req, res, next) {
    allergyintolerance_controller.AllergyIntoleranceSave (req, res,next);
});
router.post('/store', function(req, res, next) {
    allergyintolerance_controller.insertRecord(req, res, next);
});

router.post('/update', function(req, res, next) {
    allergyintolerance_controller.updateRecord(req, res, next);
});

router.get('/delete/:id', (req, res) => {
    allergyintolerance_controller.deleteRecord(req, res);
});

module.exports = router;