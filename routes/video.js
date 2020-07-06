var express = require('express');
var router = express.Router();
var video_controller = require('../controllers/videoController');

router.get('/list',function(req,res,next){
    res.render('videos/video',{title : 'test video',layout :false,})
})
module.exports = router;
