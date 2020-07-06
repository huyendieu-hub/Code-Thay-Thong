var express = require('express');
var router = express.Router();
var supply_request_controller = require('../controllers/supply_requestController');
//const auth = require('../middlewares/auth');

router.get('/create', function(req, res, next) {
    supply_request_controller.Newsupply_request(req,res,next);
});
router.get('/list', function(req, res, next) {
    supply_request_controller.listsupply_request(req,res);
});

router.get('/:id', function(req, res) {
    supply_request_controller.editsupply_request(req,res);
      //res.render("supply_request/index",  { title: 'Create new supply_request', isEdit: false });
      
});
router.post('/store', function(req, res, next) {
    supply_request_controller.insertRecord(req, res, next);
});

router.post('/update', function(req, res, next) {
    supply_request_controller.updateRecord(req, res, next);
});

router.get('/delete/:id', (req, res) => {
    supply_request_controller.deleteRecord(req, res);
});
module.exports = router;
