const express = require('express');
const mongoose = require('mongoose');
const Location = mongoose.model('Location');
const Address = mongoose.model('Address');
var async = require('async');
exports.LocationSave = function(req, res){
        var location = new Location();       
        location.resourceType = "location";
        location.identifier  =req.body.identifier;
        location.status = req.body.status;
        location.operationalStatus=req.body.operationalStatus;
        location.name = req.body.name ;
        location.alias = req.body.alias;
        location.description=req.body.description;
        location.mode = req.body.mode ;
        location.type = req.body.type;
        location.telecom = req.body.telecom ;
        location.address = req.body.address;
        location.physicalType = req.body.physicalType;
        location.position = {
            longitude : req.body.longitude,
            latitude : req.body.latitude,
            altitude : req.body.altitude
        };
        location.managingOrganization = req.body.managingOrganization 
        location.partOf = req.body.partOf
        location.endpoint =  req.body.endpoint
//         location.address = ""
//         location.save((err, doc) => {
//         if (!err)
//             return res.redirect('/location/list');
//         else {
//             if (err.name == 'ValidationError') {
//                 handleValidationError(err, req.body);
//                 console.log(err);
//                 Address.find(function(err, docs) {
//                     if (!err) {
//                         res.render("location/create_edit", {
//                             title: "Location",
//                             isEdit: false,
//                             listAddress: docs,
//                             location: req.body
//                         });
//                     } else {
//                         console.log("ERROR");
//                     }
//                 });
//                 console.log(req.body)
//             } else
//                 console.log('Error during record insertion : ' + err);
//         }
//     });
// }
        location.save((err, doc) => {
            if (!err)
                res.redirect('/list');
            else {
                if (err.name == 'ValidationError') {
                    handleValidationError(err, req.body);
                    res.render("create_edit", {
                        viewTitle: 'Location Save',
                        location : req.body
                    });
                }
                else
                    console.log('Error during record insertion : ' + err);
            }
        });
}

exports.editLocation = function(req, res){

var queries = [];
    
    queries.push(function (cb) {
        Location.findById(req.params.id).populate('address', 'city').exec(function (err, docs) {
            if (err) {
                throw cb(err);
            }
            // do some stuff with docs & pass or directly pass it
            cb(null, docs);
        });
    })    
    queries.push(function (cb) {
        Address.find().exec(function (err, docs) {
            if (err) {
                throw cb(err);
            }

            // do some stuff with docs & pass or directly pass it
            cb(null, docs);
        });
    })    
    //const healthcareservice = HealthcareService.findById(req.params._id).exec();
    //const locations = Location.find().exec();
    async.parallel(queries, function(err, docs){
        res.render("location/create_edit", {
            title: "Edit Location",
            isEdit: true,
            location: docs[0],
            listAddress: docs[1]
        });
    })
}


exports.queryAddress = function(req,res){
    Location.findOne({_id: req.params._id}).populate('address','city').
    exec(function(err,doc){
         if (err) {
             console.log(err)
             return handleError(err);
         }
            
            res.send(doc.address[0].use);
            console.log(doc)
    })
}
exports.listLocation = function(req, res) {
    Location.find().populate('address','city').exec((err, docs) => {

        if (!err) {
           // console.log(docs[0].location[0])
            res.render("location/index", {
                title: 'List Location',
                list : docs,

                locationSlideBarActive:true,
            });
        } else {

            console.log('Error in retrieving user list :' + err);
        }
    });
}
// exports.listLocation = function(req, res) {
//     Location.find().populate('address','city').exec((err,docs)=>{
//         if (!err) {
//             console.log(docs[0].address[0].city)
//             res.render("location/index", {
//                 title: 'List Location',
//                 list : docs,
//                 locationSlideBarActive:true,
//             });
//         } else {
//             console.log('Error in retrieving user list :' + err);
//         }

//     });
// }





exports.deleteRecord = function(req, res){
    Location.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/location/list');
        }
        else { console.log('Error in user delete :' + err); }
    });
}

exports.updateRecord = function(req, res) {
    Location.findOneAndUpdate({_id : req.body._id},  req.body , { runValidators: true }, (err, doc) => {
        if (!err){
            console.log(req.body._id + '????')
            
//             doc.telecom = req.body.telecom ;
//             doc.address = req.body.address;
            doc.save();
            console.log(doc);
            res.redirect('/location/list');
        }else{
        if (err.name == 'ValidationError') {
            console.log(req.body)
            handleValidationError(err, req.body);
            console.log(err);
            Address.find(function(err, docs) {
                if (!err) {
                    res.render("location/create_edit", {
                        title: "update Location",
                        isEdit: true,
                        listAddress: docs,
                        location: req.body
                    });
                } else {
                    console.log("ERROR");
                }
            });
        } else {
            console.log(req.body)
            console.log('Error during record insertion : ' + err);
        }
        }
    });
}

exports.insertRecord = function(req, res, next) {  
        var location = new Location();       
        location.resourceType = "location";
        location.identifier  =req.body.identifier;
        location.status = req.body.status;
        location.operationalStatus = req.body.operationalStatus;
        location.name = req.body.name ;
        location.alias = req.body.alias;
        location.description=req.body.description;
        location.mode = req.body.mode ;
        location.type = req.body.type;
        location.telecom = req.body.telecom ;
        location.address = req.body.address;
        location.physicalType = req.body.physicalType;
        location.position = {
            longitude : req.body.longitude,
            latitude : req.body.latitude,
            altitude : req.body.altitude
        };
        location.managingOrganization = req.body.managingOrganization ;
        location.partOf = req.body.partOf;
        location.endpoint =  req.body.endpoint;

//         location.idAddress = ""
console.log(req.body)
        location.save((err, doc) => {
        if (!err)
            return res.redirect('/locations/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                console.log(err);
                Address.find(function(err, docs) {
                    if (!err) {
                        res.render("location/create_edit", {
                            title: "New Location",
                            isEdit: false,
                            listAddress: docs,
                            location: req.body
                        });
                    } else {
                        console.log("ERROR");
                    }
                });
                console.log(req.body)
            } else
                console.log('Error during record insertion : ' + err);
        }
    });


}
exports.NewLocation = function(req, res, next) {
    Address.find(function(err, docs) {
        if (!err) {
            res.render("location/create_edit", {
                title: "New Location",
                isEdit: false,
                listAddress: docs,
            });
        } else {
            console.log(err)
            console.log("ERROR");
        }
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