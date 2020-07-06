var express = require('express');
var router = express.Router();
const auth = require('../middlewares/auth');
var suggestorganization_controllder = require('../controllers/suggestorganizationController.js');
router.get('/list', auth, function(req, res, next) {
  console.log("here");
  suggestorganization_controllder.listOrganization(req, res, next);
});

router.get('/create', auth, function(req, res, next){
  suggestorganization_controllder.create(req, res, next);
});
router.post('/store', function(req, res, next) {
  suggestorganization_controllder.insertRecord(req, res, next); 
});
router.get('/delete/:id',function(req, res, next){
  suggestorganization_controllder.deleteRecord(req, res, next)
})
router.get('/edit/:id', auth, function(req, res, next){
  suggestorganization_controllder.editSuggest(req, res, next);
});
router.post('/update', function(req, res, next) {
    suggestorganization_controllder.updateRecord(req, res, next);
});
module.exports = router;