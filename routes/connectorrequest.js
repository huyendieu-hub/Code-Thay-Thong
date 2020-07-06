var express = require('express');
var router = express.Router();
var connectorrequest_controller = require('../controllers/connectorrequestController');
const auth = require('../middlewares/auth');
router.get('/list', function(req, res, next) {
  connectorrequest_controller.listConnectorRequest(req, res);
});

router.get('/create', function(req, res, next) {
    connectorrequest_controller.NewConnectorRequest(req,res,next);
});
router.get('/edit/:id', function(req, res) {
    connectorrequest_controller.editConnectorRequest(req,res); 
});
// router.post('/', function(req, res, next) {
//     connectorrequest_controller.AddressSave (req, res,next);
// });
router.post('/store', function(req, res, next) {
    connectorrequest_controller.insertRecord(req, res, next);
});

router.post('/update', function(req, res, next) {
    connectorrequest_controller.updateRecord(req, res, next);
});

router.get('/delete/:id', (req, res) => {
    connectorrequest_controller.deleteRecord(req, res);
});

module.exports = router;