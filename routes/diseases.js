var express = require('express');
var router = express.Router();
const auth = require('../middlewares/auth');
var diseases_controller = require('../controllers/diseasesController');

router.get('/list', auth, function(req, res, next) {
  diseases_controller.listDiseases(req, res, next);
});

router.get('/create', auth, function(req, res, next){
  res.render('diseases/create_edit', { title: 'Tạo mới', isEdit: false, userName: req.session.userName });
});
router.post('/store', function(req, res, next) {
  diseases_controller.insertRecord(req, res, next); 
});
router.get('/delete/:id',function(req, res, next){
  diseases_controller.deleteRecord(req, res, next)
})
router.get('/edit/:id', auth, function(req, res, next){
  diseases_controller.editDiseases(req, res, next);
});
router.post('/update', function(req, res, next) {
    diseases_controller.updateRecord(req, res, next);
});
module.exports = router;