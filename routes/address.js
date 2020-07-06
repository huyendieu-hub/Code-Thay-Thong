var express = require('express');
var router = express.Router();
var address_controller = require('../controllers/addressController');
const auth = require('../middlewares/auth');
router.get('/list', function(req, res, next) {
  address_controller.listAddress(req, res);
});

router.get('/create', function(req, res, next) {
    address_controller.NewAddress(req,res,next);
});

// router.get('/', function(req, res, next) {
//     organization_controller.listOrganization(req,res);
// });

router.get('/edit/:id', function(req, res) {
    address_controller.editAddress(req,res);
      //res.render("location/index",  { title: 'Create new location', isEdit: false });
      
});
router.post('/', function(req, res, next) {
    address_controller.AddressSave (req, res,next);
});
router.post('/store', function(req, res, next) {
    address_controller.insertRecord(req, res, next);
});

router.post('/update', function(req, res, next) {
    address_controller.updateRecord(req, res, next);
});

router.get('/delete/:id', (req, res) => {
    address_controller.deleteRecord(req, res);
});

module.exports = router;