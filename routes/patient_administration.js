var express = require('express');
var router = express.Router();
var patient_controller = require('../controllers/patientController');
const auth = require('../middlewares/auth');


router.get('/delete/:id', function(req,res,next){
  patient_controller.deleteRecordPatientAdmin(req, res, next)
})

module.exports = router;
