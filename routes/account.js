var express = require('express');
var router = express.Router();
var account_controller = require('../controllers/accountController');
var user_controller = require('../controllers/userController');
/* GET home page. */
router.get('/login', function(req, res, next) {
  console.log("here");
  res.render('login', { title: 'Login', layout: false});
});
//
router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Register', layout: false});
});
//
router.post('/test', function(req, res, next){
  user_controller.insertRecordUserFB(req,res,next);
});
router.post('/login', function(req, res, next) {
    account_controller.accountLogin(req, res, next);
});
//
router.post('/register', function(req, res) {
    account_controller.accountRegister(req, res);
});

router.get('/logout', function(req, res, next){
  req.session.destroy();
  res.redirect('/accounts/login');
});

module.exports = router;
