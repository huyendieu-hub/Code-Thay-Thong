const express = require('express');
const mongoose = require('mongoose');
const HealthcareService = mongoose.model('HealthcareService');
const Location = mongoose.model('Location');
var async = require('async');

exports.listHealthCareService = function(req, res) {
    HealthcareService.find().populate('location','name').exec((err, docs) => {

        if (!err) {
           // console.log(docs[0].location[0])
            res.render("healthcareservice/index", {
                title: 'List Health care services',
                list : docs,
                healthcareserviceSlideBarActive:true,
            });
        } else {
            console.log('Error in retrieving user list :' + err);
        }
    });
}
exports.editHealthCareService = function(req, res) {
    var queries = [];
    //queries.push(HealthcareService.findById(req.params._id).exec());
    //queries.push(Location.find().exec());
    queries.push(function (cb) {
        HealthcareService.findById(req.params._id).populate('location', 'name').exec(function (err, docs) {
            if (err) {
                throw cb(err);
            }
            // do some stuff with docs & pass or directly pass it
            cb(null, docs);
        });
    })    
    queries.push(function (cb) {
        Location.find().exec(function (err, docs) {
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
        res.render("healthcareservice/create_edit", {
            title: "Edit HealthcareService",
            isEdit: true,
            healthcareservice: docs[0],
            listLocation: docs[1]
        });
    })
    

}
exports.queryLocation = function(req,res){
    HealthcareService.findOne({_id: req.params._id}).populate('location','telecom').
    exec(function(err,doc){
         if (err) {
             console.log(err)
             return handleError(err);
         }
            
            res.send(doc.location[0].telecom);
            console.log(doc)
    })
}
exports.updateRecord = function(req, res) {
    HealthcareService.findOneAndUpdate({_id : req.body._id},  req.body , { runValidators: true }, (err, doc) => {
        if (!err){
            console.log(req.body._id + '????')
            console.log(doc)
            res.redirect('/healthcareservice/list');
        }else{
        if (err.name == 'ValidationError') {
            console.log(req.body)
            handleValidationError(err, req.body);
            console.log(err);
            Location.find(function(err, docs) {
                if (!err) {
                    res.render("healthcareservice/create_edit", {
                        title: "New HealthCareService",
                        isEdit: true,
                        listLocation: docs,
                        healthcareservice: req.body
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
// exports.editHealthCareService = function(req, res) {
//     HealthcareService.findById(req.params.id, (err, doc) => {
//         if(!err){
//         Location.find(function(err, docs) {
//             if (!err) {
//                 res.render("healthcareservice/create_edit", {
//                     title: "New HealthCareService",
//                     isEdit: false,
//                     listLocation: docs,
//                     healthcareservice: doc
//                 });
//             } else {
//                 console.log("ERROR");
//             }
//         });
//         }else{
//                 console.log('Error during record insertion : ' + err);

//         }
//     });
// };
exports.NewHealthCareService = function(req, res, next) {
    Location.find(function(err, docs) {
        if (!err) {
            res.render("healthcareservice/create_edit", {
                title: "New HealthCareService",
                isEdit: false,
                listLocation: docs,
            });
        } else {
            console.log(err)
            console.log("ERROR");
        }
    });
}
// exports.NewHealthCareService = function(req,res,next){       
//             res.render("healthcareservice/create_edit", {
//                 title: "Edit HealthCareService",
//                 isEdit: false,                
//             });
//         }
exports.insertRecord = function(req, res, next) {
    var healthcareservice = new HealthcareService();
    params = req.body;
    healthcareservice.resourceType = "healthcareservice";
    healthcareservice.identifier = params.identifier;
    healthcareservice.active = true;
    //     healthcareservice.providedBy = params.providedBy;
    healthcareservice.category = params.category;
    healthcareservice.type = params.type;
    healthcareservice.specialty = params.specialty;
    healthcareservice.location = req.body.location;
    healthcareservice.name = params.name;
    healthcareservice.comment = params.comment;
    healthcareservice.extraDetails = params.extraDetails;
    healthcareservice.photo = params.photo;
    healthcareservice.telecom = params.telecom;
    healthcareservice.coverageArea = params.coverageArea;
    healthcareservice.serviceProvisionCode = params.serviceProvisionCode;
    healthcareservice.eligibility = params.eligibility;
    healthcareservice.eligibilityNote = params.eligibilityNote;
    healthcareservice.programName = params.programName;
    healthcareservice.characteristic = params.characteristic;
    healthcareservice.referralMethod = params.referralMethod;
        healthcareservice.appointmentRequired = true;
        healthcareservice.availableTime = [{
            daysOfWeek: params.daysOfWeek,
    //         allDay: true,
    //         availableStartTime: params.availableStartTime,
    //         availableEndTime: params.availableEndTime,
        }];
        healthcareservice.notAvailable[{
            description: params.description,
            during: params.during,
        }];
    healthcareservice.availabilityExceptions = params.availabilityExceptions;
    healthcareservice.endpoint = params.endpoint;
    healthcareservice.idLocation = ""
    healthcareservice.save((err, doc) => {
        if (!err)
            return res.redirect('/healthcareservice/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                console.log(err);
                Location.find(function(err, docs) {
                    if (!err) {
                        res.render("healthcareservice/create_edit", {
                            title: "New HealthCareService",
                            isEdit: false,
                            listLocation: docs,
                            healthcareservice: req.body
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
exports.deleteRecord = function(req, res) {
    HealthcareService.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/healthcareservice/list');
        } else {
            console.log('Error in user delete :' + err);
        }
    });
}

function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'name':
                body['NameError'] = err.errors[field].message;
                break;
                //             case 'address':
                //                 body['AddressError'] = err.errors[field].message;
                //                 break;
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
