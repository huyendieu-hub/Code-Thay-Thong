const express = require('express');
const mongoose = require('mongoose');
const Friend = mongoose.model('Friend');
exports.FriendSave = function(req, res){
    var friend = new Friend();
    friend.resoourceType = "Friend";
    friend.id = req.body.id;
    friend.connector = req.body.connector;
    friend.type = req.body.type;
    friend.status = req.body.status;
    friend.save((err, doc) => {
         if (!err)
            res.redirect('/');
            else {
                if (err.name == 'ValidationError') {
                    handleValidationError(err, req.body);
                    res.render("create_edit", {
                        viewTitle: 'Friend',
                        friend : req.body
                    });
                }
                else
                    console.log('Error during record insertion : ' + err);
            }
        });
}
exports.FriendFind = function(req,res,next){
    params = req.body;
    Friend.findOne({ name : params.name}) 
    .exec(function(err,friend){
        console.log(friend);
          if (err) {
            return callback(err)
          } else if (!friend) {
            var err = new Error('User not found.');
            console.log('User not found');
            err.status = 401;
            return callback(err);
          }else if (!err){
                res.redirect('/accounts/login');
          }
    });
}
exports.editFriend = function(req, res){
    
    Friend.findById(req.params.id, (err, doc) => {
        if (!err) {
            console.log(req.params.id)
            console.log(doc)
            res.render("friend/create_edit", {
                title: "Edit Friend",
                isEdit: true,
                friend: doc
            });
        }
    });
};
exports.listFriend = function(req, res) {
    return Friend.find(function(err,docs){
        if(!err){
            res.render('./friend/index',{
                title : 'list friend' ,
                list : docs,
                isClick2: true,           
            })
        }
         else {
            console.log('Error in retrieving user list :' + err);
        }
    });
};
exports.deleteRecord = function(req, res){
    Friend.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/friend/');
        }
        else { console.log('Error in user delete :' + err); }
    });
}
exports.updateRecord = function updateRecord(req, res) {       
    Friend.findOneAndUpdate( {_id :req.body._id} , req.body  , { runValidators: true }, 
    function(err, doc) {
        if (!err) {
           console.log(doc);
            res.redirect('/friend/');
            }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                console.log(req.body)
                res.render("friend/create_edit", {
                    viewTitle: 'Update Friend',
                    friend: req.body,
                    isEdit:true,
                });
            }
            else
                console.log(req.body)
                console.log('Error during record update : ' + err);
        }
    });
}
exports.insertRecord = function(req, res, next) {
    var friend = new Friend();
    friend.resoourceType = "Friend";
    friend.id = req.body.id;
    friend.connector = req.body.connector;
    friend.type = req.body.type;
    friend.status = req.body.status;
    friend.save((err, doc) => {
            if (!err)
                return res.redirect('/friend/');
            else {
                if (err.name == 'ValidationError') {
                    handleValidationError(err, req.body);
                    res.render("friend/create_edit", {
                        viewTitle: 'Friend',
                        friend : req.body
                    });
                    console.log(req.body)
                }
                else
                    console.log('Error during record insertion : ' + err);
            }
        });
    }
    exports.NewFriend = function(req,res,next){       
            res.render("friend/create_edit", {
                title: "Edit Friend",
                isEdit: false,                
            });
        }
        function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'id':
                body['IdError'] = err.errors[field].message;
                break;
            case 'connector':
                body['ConnectorError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}