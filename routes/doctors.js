var express = require('express');
var router = express.Router();
var doctor_controller = require('../controllers/doctorController');
const auth = require('../middlewares/auth');

/* GET users listing. */
router.get('/list', auth, function(req, res, next) {
  doctor_controller.listDoctors(req, res);
});

router.get('/create', auth, function(req, res, next){
  res.render('doctors/create_edit', { title: 'Tạo bác sĩ mới' });
});
router.get('/diagnostic/form', auth, function(req, res, next){
  res.render('doctors/form', { title: 'Hỗ trợ chẩn đoán ' });
});
/*
router.get('/diagnostic/vqc', auth, function(req, res, next){
  res.render('doctors/viemquanhcuong', { title: 'Chẩn đoán - Viêm quanh cuống' });
});
router.get('/diagnostic/smbt', auth, function(req, res, next){
  res.render('doctors/sinhmenboctoan', { title: 'Chẩn đoán - Sinh men bóc toàn' });
});*/

module.exports = router;
