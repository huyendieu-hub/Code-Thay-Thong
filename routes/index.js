var express = require('express');
var router = express.Router();
const auth = require('../middlewares/auth');
const path = require('path');
const fs = require('fs');
/* GET home page. */
router.get('/', auth, function(req, res, next) {
  res.render('index', { title: 'Dashboard', indexSlideBarActive: true, userName: req.session.userName });
});

module.exports = router;
