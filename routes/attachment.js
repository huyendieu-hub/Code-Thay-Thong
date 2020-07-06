var express = require('express');
var router = express.Router();
var attachment_controller = require('../controllers/attachmentController');
// const auth = require('../middlewares/auth');
router.get('/list', function(req, res, next) {
  attachment_controller.listAttachment(req, res);
});

router.get('/create', function(req, res, next) {
    attachment_controller.NewAttachment(req,res,next);
});
router.get('/edit/:id', function(req, res) {
    attachment_controller.editAttachment(req,res);
    
});
router.post('/', function(req, res, next) {
    attachment_controller.AttachmentSave (req, res,next);
});
router.post('/store', function(req, res, next) {
    attachment_controller.insertRecord(req, res, next);
});

router.post('/update', function(req, res, next) {
    attachment_controller.updateRecord(req, res, next);
});

router.get('/delete/:id', (req, res) => {
    attachment_controller.deleteRecord(req, res);
});

module.exports = router;