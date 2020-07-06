var express = require('express');
var router = express.Router();
var appointment_controller = require('../controllers/appointmentController');
// const auth = require('../middlewares/auth');


router.get('/list', function(req, res, next) {
   appointment_controller.listAppointment(req, res);
});
router.get('/create',function(req,res,next){
  appointment_controller.NewAppointment(req,res,next);
});
router.get('/edit/:id',function(req,res,next){
  appointment_controller.editAppointment(req,res);
});
// router.post('/', function(req, res, next) {
//     organization_controller.AppointmentSave (req, res,next);
// });
router.post('/update',function(req,res,next){
  appointment_controller.updateRecord(req,res);
});
router.post('/store',function(req,res,next){
  appointment_controller.insertRecord(req,res,next)
});
router.get('/delete/:id', (req, res) => {
    appointment_controller.deleteRecord(req, res);
});
module.exports = router;
