const express = require('express');
const mongoose = require('mongoose');
const User = mongoose.model('Account');
const Patient = mongoose.model('Patient');
const Doctor = mongoose.model('Practitioner');

exports.accountLogin = function(req, res, next){
     var params = req.body;
     console.log(req.body)
     var type_user = req.body.type_user;
     if(type_user == 1){//bacsy
        /*Doctor.findOne({})
            .populate({path: 'account', model: 'Account', match:{ email: req.body.email, password: req.body.password}})
            .exec(async function (err, doctor) {
              /*if (err) {
                return callback(err)
              } else if (!user) {
                var err = new Error('User not found.');
                err.status = 401;
                return callback(err);
              }*/
              /*bcrypt.compare(password, user.password, function (err, result) {
                if (result === true) {
                  return callback(null, user);
                } else {
                  return callback();
                }
              })*/
              /*console.log(doctor);
              if(doctor){
                  req.session.userId = doctor.account._id;
                  req.session.userType = doctor.account.type;
                  req.session.userName = doctor.account.name;
                  req.session.doctorId = doctor._id;
                  return res.redirect('/');
              }
              res.redirect('/accounts/login');
        });*/
        User.findOne({ email: req.body.email, password: req.body.password }).then(function(user){   
               console.log(user);
               if(user){
                        req.session.userId = user._id;
                        req.session.userType = user.type;
                        req.session.userName = user.name;

                        Doctor.findOne({account: user._id}).then(function(doctor){
                                console.log(doctor);
                                if(doctor){
                                        req.session.doctorId = doctor._id;
                                }
                                return res.redirect('/');
                        });
                }else{
                        return res.redirect('/');
                }
        });
     }else if(type_user == 2){ 
        User.findOne({ email: req.body.email, password: req.body.password })
            .exec(async function (err, user) {
              /*if (err) {
                return callback(err)
              } else if (!user) {
                var err = new Error('User not found.');
                err.status = 401;
                return callback(err);
              }*/
              /*bcrypt.compare(password, user.password, function (err, result) {
                if (result === true) {
                  return callback(null, user);
                } else {
                  return callback();
                }
              })*/
              if(user){
                  req.session.userId = user._id;
                  req.session.userType = user.type;
                  req.session.userName = user.name;
                  return res.redirect('/');   
              }
              res.redirect('/accounts/login');
        });
     }else{
        Patient.findOne().exec(function (err, patient){
            
        });
     }
     
}

exports.accountRegister = function(req, res){
     if (req.body.email && req.body.fullname && req.body.password && req.body.repassword) {
        console.log(req.body);
        var user = new User();
        user.fullname = req.body.fullname;
        user.email = req.body.email;
        user.password = req.body.password;
        user.username = req.body.username;
        user.type = 4;
        console.log(user);
        user.save((err, doc) => {
            if (!err)
                res.redirect('/accounts/login');
            else {
                if (err.name == 'ValidationError') {
                    handleValidationError(err, req.body);
                    res.render("register", {
                        viewTitle: 'Register',
                        user: req.body,
                        layout: false,
                    });
                }
                else
                    console.log('Error during record insertion : ' + err);
            }
        });
     }
}

function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullname':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}