var express = require('express');
var router = express.Router();
var patient_controller = require('../controllers/patientController');
const auth = require('../middlewares/auth');

/* GET patent listing. */
router.get('/list', auth, function(req, res, next) {
  patient_controller.listPatients(req, res);

});

router.get('/create', auth, function(req, res, next){
  res.render('patients/create_edit', { title: 'Create new patient', isEdit: false, userName: req.session.userName });
});
router.post('/store', function(req, res, next) {
  patient_controller.insertRecord(req, res, next); 
});
router.get('/delete/:id',function(req,res,next){
  patient_controller.deleteRecord(req,res)
})
router.get('/details/:id', function(req, res, next){
  patient_controller.detailsPatient(req,res,next);
});

router.get('/edit/:id', auth, function(req, res, next){
  patient_controller.editPatient(req, res, next);
});
router.post('/update', function(req, res, next) {
    patient_controller.updateRecord(req, res, next);
});
router.get('/delete/:id', auth, function(req, res, next){
  patient_controller.deleteRecord(req, res, next);
});
router.get('/patientadministration', auth, function(req, res, next){
  patient_controller.patientadministration(req, res, next);
});
router.get('/patientadmin/edit/:id', auth, function(req, res, next){
  patient_controller.editPatientAdministration(req, res, next);
});
router.get('/listpatientadmin', auth, function(req, res, next){
  patient_controller.listPatientAdmin(req, res, next);
});
router.post('/store_administration', function(req, res, next){
  patient_controller.insertRecordPatientAdministration(req, res, next);
});
router.post('/update_administration', function(req, res, next){
  patient_controller.updatePatientAdmin(req, res, next);
});
router.get('/procedurerequest', auth, function(req, res, next){
  patient_controller.procedureRequest(req, res, next);
});

module.exports = router;
