const express = require('express');
const mongoose = require('mongoose');
const FriendList = mongoose.model('Friend_list');
exports.FriendSave = function(req, res){
    var friendlist = new FriendList();
    friendlist.resoourceType = "FriendList";
    friendlist.id = req.body.id;
    friendlist.peroid = req.body.peroid;
    friendlist.update = req.body.status;
    friendlist.connectors = req.body.connectors;
    friendlist.save((err, doc) => {
         if (!err)
            res.redirect('/');
            else {
                if (err.name == 'ValidationError') {
                    handleValidationError(err, req.body);
                    res.render("create_edit", {
                        viewTitle: 'FriendList',
                        friendlist : req.body
                    });
                }
                else
                    console.log('Error during record insertion : ' + err);
            }
        });
}

exports.editFriendList = function(req, res){
    
    FriendList.findById(req.params.id, (err, doc) => {
        if (!err) {
            console.log(req.params.id)
            console.log(doc)
            res.render("friendlist/create_edit", {
                title: "Edit FriendList",
                isEdit: true,
                friendlist: doc
            });
        }
    });
};
exports.listFriendList = function(req, res) {
    return FriendList.find(function(err,docs){
        if(!err){
            res.render('./friendlist/index',{
                title : 'list friendlist' ,
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
    FriendList.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/friendlist/');
        }
        else { console.log('Error in user delete :' + err); }
    });
}
exports.updateRecord = function updateRecord(req, res) {       
    FriendList.findOneAndUpdate( {_id :req.body._id} , req.body  , { runValidators: true }, 
    function(err, doc) {
        if (!err) {
           console.log(doc);
            res.redirect('/friendlist/');
            }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                console.log(req.body)
                res.render("friendlist/create_edit", {
                    viewTitle: 'Update FriendList',
                    friendlist: req.body,
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
    var friendlist = new FriendList();
    friendlist.resoourceType = "FriendList";
    friendlist.id = req.body.id;
    friendlist.period = req.body.type;
    friendlist.update = req.body.update;
    friendlist.connectors = req.body.connectors;
    friendlist.save((err, doc) => {
            if (!err)
                return res.redirect('/friendlist/');
            else {
                if (err.name == 'ValidationError') {
                    handleValidationError(err, req.body);
                    res.render("friendlist/create_edit", {
                        viewTitle: 'FriendList',
                        friendlist : req.body
                    });
                    console.log(req.body)
                }
                else
                    console.log('Error during record insertion : ' + err);
            }
        });
    }
    exports.NewFriendList = function(req,res,next){       
            res.render("friendlist/create_edit", {
                title: "Edit FriendList",
                isEdit: false,                
            });
        }
        
        function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'id':
                body['IdError'] = err.errors[field].message;
                break;
            case 'Period':
                body['PeriodError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}