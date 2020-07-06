var express = require('express');
var router = express.Router();
var user_controller = require('../controllers/userController');
const auth = require('../middlewares/auth');

/* GET users listing. */
router.get('/list', function(req, res, next) {
  user_controller.listUsers(req, res, next);
  //res.send('respond with a resource 1 2');

});
router.post('/search', function(req, res, next) {
  user_controller.searchUsers(req, res, next);
  //res.send('respond with a resource 1 2');

});
router.get('/list/result', function(req, res, next) {
  user_controller.searchResults(req, res, next);
  //res.send('respond with a resource 1 2');

});
router.get('/create', auth, function(req, res, next){
  res.render('users/create_edit', { title: 'Create new user', isEdit: false });
});

router.get('/addOrEdit', auth, (req, res) => {
    res.render("users/addOrEdit", {
        viewTitle: "Insert Employee"
    });
});
router.get('/details/:id', function(req, res, next){
  user_controller.detailsUser(req,res,next);
});

router.post('/store', function(req, res, next) {
    user_controller.insertRecord(req, res, next);
});

router.post('/update', function(req, res, next) {
    user_controller.updateRecord(req, res, next);
});

router.get('/:id', (req, res) => {
    user_controller.editUser(req, res);
});
router.get('/delete/:id', (req, res) => {
    user_controller.deleteRecord(req, res);
});

module.exports = router;
