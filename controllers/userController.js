const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const User = mongoose.model('Account');
const Practitioner = mongoose.model('Practitioner');
const limitPage = 10;

exports.listUsers = function(req, res,next) {
    var page = 1;
    if(req.query.page){
        page = req.query.page;
    }
    var condition = {};
     User.count(condition, function( err, count){ 
        User.find(condition).skip(limitPage *(page-1)).limit(limitPage).exec((err, docs) => {
            if (!err) {
                console.log(docs)
                res.render("users/index", {
                    title: 'Danh sách người dùng',
                    userSlideBarActive: true,
                    userType: req.session.userType,
                    list: docs,
                    pagination: { 
                        page: page, 
                        limit: limitPage, 
                        totalRows: count, 
                        queryParams: '' 
                    }
                });
    //             res.json(docs)
            } else {
                console.log('Error in retrieving user list :' + err);
            }
        });
     });
}
//
exports.searchUsers = function(req, res,next) {
    var q = req.query.q
    User.find({name:{$regex: q ,$options:'i' }},{_id:0,__v:0},(err, docs) => {
        if (!err) {
             res.json(docs)
        } else {
            console.log('Error in retrieving user list :' + err);
        }
    }).limit(5);
}
exports.searchResults = function(req,res,next){
    var q = req.query.q
    User.find({name:{$regex : q,$options:'i'}},{_id:0,__v:0},(err, docs) => {
            if (!err) {
            console.log(docs)
            res.render("users/index", {
                title: 'users',
                userSlideBarActive: true,
                list: docs,
                userType: req.session.userType,
            });
        } else {
            console.log('Error in retrieving user list :' + err);
        }
        });
}
exports.addUser = function(req, req) {
    res.render("users/Addt", {
        viewTitle: "Insert User"
    });
}
//
exports.editUser = function(req, res) {
    User.findById(req.params.id, (err, doc) => {
        if (!err) {
            console.log(doc)
            res.render("./users/create_edit", {
                title: "Edit user",
                isEdit: true,
                user: doc,
                userType: req.session.userType,
            });
        }
    });
}

const storageEngine = multer.diskStorage({
    destination: './public/account',
    filename: function(req, file, fn) {
        fn(null, new Date().getTime().toString() + '-' + file.fieldname + path.extname(file.originalname));
        //     console.log(file)
    }
});
const uploadPhoto = multer({
    storage: storageEngine,
    limits: {
        fileSize: 20000000
    },
    fileFilter: function(req, file, callback) {
        validateFile(file, callback);
    }
}).single('photo');
var validateFile = function(file, cb) {
    allowedFileTypes = /jpeg|jpg|png|gif/;
    const extension = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = allowedFileTypes.test(file.mimetype);
    if (extension && mimeType) {
        return cb(null, true);
    } else {
        cb("Invalid file type. Only JPEG, PNG and GIF file are allowed.")
    }
}
//
exports.detailsUser = function(req, res, next) {
    User.findById(req.params.id, (err, doc) => {
        if (!err) {
            console.log(doc.image)
//             var date = new Date(doc.birthDate);
//             var date1 = new Date(Date.now())
//             var age = parseInt(date1.getFullYear()) - parseInt(date.getFullYear());
            res.render("users/detail", {
                title: "Chi tiết người dùng",
                isEdit: true,
                user: doc,
                userType: req.session.userType,
//                 birthDate: date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear(),
//                 Age: age,
            });
        }
    });
}

exports.insertRecord = function(req, res, next) {
    uploadPhoto(req, res, (error) => {
        if (error) {
            console.log("Error 1");
        } else {
            var user = new User();
            user.resourceType = "users"
            user.name = req.body.name;
            user.email = req.body.email;
            user.password = req.body.password;
            user.username = req.body.username;
            user.gender = req.body.gender;
            user.mobile = req.body.mobile;
            user.city = req.body.city;
            user.type = req.body.type;
            if (req.file == undefined) {
                user.image = "account/donganh.png"
            } else {
                var fullPath = "account/" + req.file.filename;
                user.image = fullPath;
            }
            user.save(async  function(err, doc) {
                if (!err) {
                    if(req.body.type == 1 || req.body.type == 2 || req.body.type == 3){
                       var pract = new Practitioner();
                       pract.account = doc._id;
                       pract.active = true;
                       pract.name = doc.name;
                       pract.gender = doc.gender;
                       await pract.save(async function(err1, doc){
                           if(!err1){
                               return res.redirect('/users/list');
                           }else{
                               
                           }
                       });
                    }
                    
                } else {
                    if (err.name == 'ValidationError') {
                        handleValidationError(err, req.body);
                        console.log(req.body);
                        return res.render("users/create_edit", {
                            viewTitle: 'Edit user',
                            user: req.body,
                            userType: req.session.userType,
                        });
                    } else {
                        console.log('Error during record insertion : ' + err);
                    }
                }
            });
        }
    });
}
exports.insertRecordUserFB = function(req, res, next) {
     uploadPhoto(req, res, (error) => {
        if (error) {
            console.log("Error 1");
        } else {
            var user = new User();
            user.resourceType = "users"
            user.name = req.body.name;
            user.email = req.body.email;
            user.password = 1111111111;
            user.username = "donganh";
//             user.gender = req.body.gender;
//             user.mobile = req.body.mobile;
//             user.city = req.body.city;
//             user.type = req.body.type;
            if (req.file == undefined) {
                user.image = "account/donganh.png"
            } else {
                var fullPath = "account/" + req.file.filename;
                user.image = fullPath;
            }
            user.save(function(err, doc) {
                if (!err) {
                    console.log(req.body)
                    return res.redirect('/users/list');
                } else {
                    if (err.name == 'ValidationError') {
                        handleValidationError(err, req.body);
                        console.log(req.body);
                        return res.render("users/create_edit", {
                            viewTitle: 'Edit user',
                            user: req.body,
                            userType: req.session.userType,
                        });
                    } else {
                        console.log('Error during record insertion : ' + err);
                    }
                }
            });
        }
    });
}
//
exports.updateRecord = function updateRecord(req, res) {
    uploadPhoto(req, res, (error) => {
        if (error) {
            console.log('Error 1');
        } else {
            User.findOneAndUpdate({
                _id: req.body._id
            }, req.body, {
                runValidators: true
            }, (err, doc) => {
                if (!err) {
                    if (req.file == undefined) {} else {
                        var fullPath = "./public/" + doc.image
                        console.log(fullPath);
                        if (fullPath != "./public/account/donganh.png") {
                            fs.unlink(fullPath, (error) => {
                                if (error) {
                                    console.error(error)
                                    return
                                }
                            })
                        }
                        var fullPath1 = "account/" + req.file.filename;
                        console.log(fullPath1);
                        doc.image = fullPath1;
                        doc.save();
                    }
                    res.redirect('/users/list');
                } else {
                    console.log(err)
                    if (err.name == 'ValidationError') {
                        handleValidationError(err, req.body);
                        console.log(req.body);
                        return res.render("users/create_edit", {
                            viewTitle: 'Edit user',
                            user: req.body,
                            isEdit: true,
                        });
                    } else
                        console.log('Error during record insertion : ' + err);
                }
            });
        }
    });
}

exports.deleteRecord = function(req, res) {
    User.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/users/list');
        } else {
            console.log('Error in user delete :' + err);
        }
    });
}

function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'name':
                body['nameError'] = err.errors[field].message
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            case 'username':
                body['usersError'] = err.errors[field].message;
                break;
            case 'password':
                body['passwordError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}