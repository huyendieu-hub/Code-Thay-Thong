var express = require('express');
var router = express.Router();
const auth = require('../middlewares/auth');
var treatmentadvises_controllder = require('../controllers/treatmentadvisesControllder.js');
router.get('/list', auth, function(req, res, next) {
  treatmentadvises_controllder.listTreatment(req, res, next);
});

router.get('/create', auth, function(req, res, next){
  treatmentadvises_controllder.create(req, res, next);
});
router.post('/store', function(req, res, next) {
  treatmentadvises_controllder.insertRecord(req, res, next); 
});
router.get('/delete/:id',function(req, res, next){
  treatmentadvises_controllder.deleteRecord(req, res, next)
})
router.get('/edit/:id', auth, function(req, res, next){
  treatmentadvises_controllder.editTreatment(req, res, next);
});
router.post('/update', function(req, res, next) {
    treatmentadvises_controllder.updateRecord(req, res, next);
});
module.exports = router;