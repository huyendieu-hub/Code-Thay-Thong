var express = require('express');
var router = express.Router();
var organization_controller = require('../controllers/organizationController');
// const auth = require('../middlewares/auth');

//===================================================apis
router.get('/listsuggest', function(req, res, next) {
  organization_controller.listSuggestOrganizations(req, res, next);
});
//==================================================web

router.get('/list', function(req, res, next) {
  organization_controller.listOrganization(req, res, next);
});


router.get('/create', function(req, res, next) {
    organization_controller.NewOrganization(req,res,next);
});


// router.get('/', function(req, res, next) {
//     organization_controller.listOrganization(req,res);
// });

router.get('/edit/:id', function(req, res) {
    organization_controller.editOrganization(req,res);
      //res.render("location/index",  { title: 'Create new location', isEdit: false });
      
});
router.post('/', function(req, res, next) {
    organization_controller.OrganizationSave (req, res,next);
});
router.post('/store', function(req, res, next) {
    organization_controller.insertRecord(req, res, next);
});

router.post('/update', function(req, res, next) {
    organization_controller.updateRecord(req, res, next);
});

router.get('/delete/:id', (req, res) => {
    organization_controller.deleteRecord(req, res);
});



module.exports = router;
