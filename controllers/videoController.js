const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs');


const storageEngine = multer.diskStorage({
    destination: './public/video',
    filename: function(req, file, fn) {
        fn(null, new Date().getTime().toString() + '-' + file.fieldname + path.extname(file.originalname));
        //     console.log(file)
    }
});
const uploadPhoto = multer({
    storage: storageEngine,
    limits: {
        fileSize: 200000000
    },
    fileFilter: function(req, file, callback) {
        validateFile(file, callback);
    }
}).single('photo');
var validateFile = function(file, cb) {
    allowedFileTypes = /mp4|WebM|Ogg/;
    const extension = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = allowedFileTypes.test(file.mimetype);
    if (extension && mimeType) {
        return cb(null, true);
    } else {
        cb("Invalid file type. Only JPEG, PNG and GIF file are allowed.")
    }
}