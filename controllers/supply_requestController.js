const express = require('express');
const mongoose = require('mongoose');
const Supply_request = mongoose.model('Supply_request');
exports.supply_requestSave = function(req, res){
        var supply_request = new Supply_request();       
        supply_request.resourceType = "Supply_request";
        supply_request.identifier  =req.body.identifier;
        supply_request.status = req.body.status;
        supply_request.operationalStatus=req.body.operationalStatus;
        supply_request.name = req.body.name ;
        supply_request.alias = req.body.alias;
        supply_request.description=req.body.description;
        supply_request.mode = req.body.mode ;
        supply_request.type = req.body.type;
        supply_request.telecom = req.body.telecom ;
        supply_request.address = req.body.address;
        supply_request.physicalType = req.body.physicalType;
        supply_request.position = {
            longitude : req.body.longitude,
            latitude : req.body.latitude,
            altitude : req.body.altitude
        };
        supply_request.managingOrganization = req.body.managingOrganization 
        supply_request.partOf = req.body.partOf
        supply_request.endpoint =  req.body.endpoint
        supply_request.save((err, doc) => {
            if (!err)
                res.redirect('/');
            else {
                if (err.name == 'ValidationError') {
                    handleValidationError(err, req.body);
                    res.render("create_edit", {
                        viewTitle: 'supply_request',
                        supply_request : req.body
                    });
                }
                else
                    console.log('Error during record insertion : ' + err);
            }
        });
}
//với mảng sử dụng $elemMatch
exports.supply_requestFindListObject = function(req,res,next){
    params = req.body;
    Supply_request.findOne({ position  :{longitude: params.longitude,latitude: params.latitude,altitude: params.altitude }}) 
    .exec(function(err,supply_request){
        console.log(supply_request);
          if (err) {
            return callback(err)
          } else if (!supply_request) {
            var err = new Error('User not found.');
            console.log('User not found');
            err.status = 401;
            return callback(err);
          }else if (!err){
                res.redirect('/accounts/login');
          }
    });
 }
    exports.supply_requestFindArrayListObject = function(req,res,next){
    params = req.body;
    Supply_request.findOne({ position :{$elemMatch :{longitude: params.longitude,latitude: params.latitude,altitude: params.altitude }}}) 
    .exec(function(err,supply_request){
        console.log(supply_request);
          if (err) {
            return callback(err)
          } else if (!supply_request) {
            var err = new Error('User not found.');
            console.log('User not found');
            err.status = 401;
            return callback(err);
          }else if (!err){
                res.redirect('/accounts/login');
          }
    });
}
exports.supply_requestFind = function(req,res,next){
    params = req.body;
    supply_request.findOne({ name : params.name}) 
    .exec(function(err,supply_request){
        console.log(supply_request);
          if (err) {
            return callback(err)
          } else if (!supply_request) {
            var err = new Error('User not found.');
            console.log('User not found');
            err.status = 401;
            return callback(err);
          }else if (!err){
                res.redirect('/accounts/login');
          }
    });
}
exports.editsupply_request = function(req, res){
    Supply_request.findById(req.params.id, (err, doc) => {
        if (!err) {
            console.log(req.params.id)
            console.log(doc)
            res.render("supply_request/create_edit", {
                title: "Edit supply_request",
                isEdit: true,
                supply_request: doc
            });
        }else{
            console.log()
        }
    });
};
exports.listsupply_request = function(req, res) {
    return Supply_request.find(function(err,docs){
        if(!err){
            res.render('./supply_request/index',{
                title : 'list supply_request' ,
                list : docs,
                supply_requestSlideBarActive: true,         
            })
        }
         else {
            console.log('Error in retrieving user list :' + err);
        }
    });
};

exports.deleteRecord = function(req, res){
    Supply_request.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/supply_requests/list');
        }
        else { console.log('Error in user delete :' + err); }
    });
}
exports.updateRecord = function updateRecord(req, res) {       
    Supply_request.findOneAndUpdate( {_id :req.body._id} , req.body  , { runValidators: true }, 
    function(err, doc) {
        if (!err) {
//             console.log(req.body._id )
//             doc.position.longitude = req.body.longitude,
//             doc.position.latitude = req.body.latitude,
//             doc.position.altitude = req.body.altitude,
//             doc.save();
            console.log(doc);
            res.redirect('/supply_requests/list');
            
             }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                //console.log(req.body)
                res.render("supply_request/create_edit", {
                    viewTitle: 'Update supply_request',
                    supply_request: req.body,
                    isEdit:true,
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}
exports.insertRecord = function(req, res, next) {  
        var supply_request = new Supply_request();       
        supply_request.resourceType = "supply_request";
        supply_request.identifier  =req.body.identifier;
        supply_request.status = req.body.status;
//         supply_request.operationalStatus = req.body.operationalStatus;
//         supply_request.name = req.body.name ;
//         supply_request.alias = req.body.alias;
//         supply_request.description=req.body.description;
//         supply_request.mode = req.body.mode ;
//         supply_request.type = req.body.type;
//         supply_request.telecom = req.body.telecom ;
//         supply_request.address = req.body.address;
//         supply_request.physicalType = req.body.physicalType;
        supply_request.orderedItem = {
            quantity : req.body.quantity,
            itemCodeableConcept : req.body.itemCodeableConcept,
            itemReference : req.body.itemReference
        };
        supply_request.requester = {
            agent : req.body.agent,
            onBehalfOf : req.body.onBehalfOf,
        }
        supply_request.supplier = req.body.supplier 
        supply_request.reasonCodeableConcept = req.body.reasonCodeableConcept
        supply_request.reasonReference =  req.body.reasonReference

        supply_request.save((err, doc) => {
            if (!err){
                console.log(doc)
                return res.redirect('/supply_requests/list');
            }
            else {
                if (err.name == 'ValidationError') {
                    handleValidationError(err, req.body);
                    res.render("supply_request/create_edit", {
                        viewTitle: 'supply_request',
                        supply_request : req.body
                    });
                    console.log(req.body)
                }
                else
                    console.log('Error during record insertion : ' + err);
            }
        });
    }
exports.Newsupply_request = function(req,res,next){       
            res.render("supply_request/create_edit", {
                title: "Edit supply_request",
                isEdit: false,                
            });
        }
function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'name':
                body['NameError'] = err.errors[field].message;
                break;
            case 'address':
                body['AddressError'] = err.errors[field].message;
                break;
            case 'telecom':
                body['TelecomError'] = err.errors[field].message;
                break;
            case 'identifier':
                body['IdentifierError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}