const express = require('express');
const mongoose = require('mongoose');
const FriendRequest = mongoose.model('Friend_request');
exports.FriendSave = function(req, res){
    var friendrequest = new FriendRequest();
    friendrequest.resoourceType = "FriendRequest";
    friendrequest.identifier = req.body.identifier;
    friendrequest.connectors = req.body.connectors;
    friendrequest.status = req.body.status;
    friendrequest.description = req.body.description;
    friendrequest.start = req.body.start;
    friendrequest.end = req.body.end;
    friendrequest.comment = req.body.comment;
    friendrequest.save((err, doc) => {
         if (!err)
            res.redirect('/');
            else {
                if (err.name == 'ValidationError') {
                    handleValidationError(err, req.body);
                    res.render("create_edit", {
                        viewTitle: 'FriendRequest',
                        friendrequest : req.body
                    });
                }
                else
                    console.log('Error during record insertion : ' + err);
            }
        });
}
// exports.FriendRequestFind = function(req,res,next){
//     params = req.body;
//     FriendRequest.findOne({ name : params.name}) 
//     .exec(function(err,friendrequest){
//         console.log(friendrequest);
//           if (err) {
//             return callback(err)
//           } else if (!friendrequest) {
//             var err = new Error('User not found.');
//             console.log('User not found');
//             err.status = 401;
//             return callback(err);
//           }else if (!err){
//                 res.redirect('/accounts/login');
//           }
//     });
// }
exports.editFriendRequest = function(req, res){
    
    FriendRequest.findById(req.params.id, (err, doc) => {
        if (!err) {
            console.log(req.params.id)
            console.log(doc)
            res.render("friendrequest/create_edit", {
                title: "Edit FriendRequest",
                isEdit: true,
                friendrequest: doc
            });
        }
    });
};
exports.listFriendRequest = function(req, res) {
    return FriendRequest.find(function(err,docs){
        if(!err){
            res.render('./friendrequest/index',{
                title : 'list friendrequest' ,
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
    FriendRequest.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/friendrequest/');
        }
        else { console.log('Error in user delete :' + err); }
    });
}
exports.updateRecord = function updateRecord(req, res) {       
    FriendRequest.findOneAndUpdate( {_id :req.body._id} , req.body  , { runValidators: true }, 
    function(err, doc) {
        if (!err) {
           console.log(doc);
            res.redirect('/friendrequest/');
            }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                console.log(req.body)
                res.render("friendrequest/create_edit", {
                    viewTitle: 'Update FriendRequest',
                    friendrequest: req.body,
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
    var friendrequest = new FriendRequest();
    friendrequest.resoourceType = "FriendRequest";
    friendrequest.identifier = req.body.identifier;
    friendrequest.connectors = req.body.connectors;
    friendrequest.status = req.body.status;
    friendrequest.description = req.body.description;
    friendrequest.start = req.body.start;
    friendrequest.end = req.body.end;
    friendrequest.comment = req.body.comment;
    friendrequest.save((err, doc) => {
            if (!err)
                return res.redirect('/friendrequest/');
            else {
                if (err.name == 'ValidationError') {
                    handleValidationError(err, req.body);
                    res.render("friendrequest/create_edit", {
                        viewTitle: 'FriendRequest',
                        friendrequest : req.body
                    });
                    console.log(req.body)
                }
                else
                    console.log('Error during record insertion : ' + err);
            }
        });
    }
    exports.NewFriendRequest = function(req,res,next){       
            res.render("friendrequest/create_edit", {
                title: "Edit FriendRequest",
                isEdit: false,                
            });
        }
        function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'id':
                body['IdError'] = err.errors[field].message;
                break;
            case 'Identifier':
                body['IdentifierError'] = err.errors[field].message;
                break;
            case 'Start':
                body['startError'] = err.errors[field].message;
                break;
            case 'End':
                body['endError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}