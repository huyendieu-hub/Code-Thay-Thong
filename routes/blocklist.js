var express = require('express');
var router = express.Router();
var blocklist_controller = require('../controllers/blocklistController');
const auth = require('../middlewares/auth');
router.get('/list', function(req, res, next) {
  blocklist_controller.listBlocklist(req, res);
});

router.get('/create', function(req, res, next) {
    blocklist_controller.NewBlocklist(req,res,next);
});

router.get('/edit/:id', function(req, res) {
    blocklist_controller.editBlocklist(req,res);
});
router.post('/', function(req, res, next) {
    blocklist_controller.BlocklistSave (req, res,next);
});
router.post('/store', function(req, res, next) {
    blocklist_controller.insertRecord(req, res, next);
});

router.post('/update', function(req, res, next) {
    address_controller.updateRecord(req, res, next);
});

router.get('/delete/:id', (req, res) => {
    blocklist_controller.deleteRecord(req, res);
});

module.exports = router;