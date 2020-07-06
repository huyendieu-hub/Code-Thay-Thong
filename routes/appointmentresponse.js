var express = require('express');
var router = express.Router();
var appointmentresponse_controller = require('../controllers/appointmentresponseController');
const auth = require('../middlewares/auth');
router.get('/list', function(req, res, next) {
  appointmentresponse_controller.ListAppointmentResponse(req, res);
});

router.get('/create', function(req, res, next) {
    appointmentresponse_controller.NewAppointmentResponse(req,res,next);
});

router.get('/edit/:id', function(req, res) {
    appointmentresponse_controller.editAppointmentResponse(req,res);
  
});
router.post('/', function(req, res, next) {
    appointmentresponse_controller.AppointmentResponseSave (req, res,next);
});
router.post('/store', function(req, res, next) {
    appointmentresponse_controller.insertRecord(req, res, next);
});

router.post('/update', function(req, res, next) {
    appointmentresponse_controller.updateRecord(req, res, next);
});

router.get('/delete/:id', (req, res) => {
    appointmentresponse_controller.deleteRecord(req, res);
});

module.exports = router;