const express = require ('express');
const mongoose = require ('mongoose');
const Appointment = mongoose.model('Appointment');
const AppointmentResponse = mongoose.model('Appointment_response')
var async = require ('async');
exports.AppointmentResponseSave=function(req,res){
    var appointmentresponse = new AppointmentResponse();
    appointmentresponse.resourceType="AppointmentResponse";
    appointmentresponse.identifier=req.body.identifier;
    appointmentresponse.appointment=req.body.appointment;
    appointmentresponse.start=req.body.start;
    appointmentresponse.end=req.body.end;
    appointmentresponse.participantType=req.body.participantType;
    appointmentresponse.actor=req.body.actor;
    appointmentresponse.participantStatus=req.body.participantStatus;
    appointmentresponse.comment=req.body.comment;
    appointmentresponse.save ((err,doc)=>{
        if (!err)
            res.redirect('/list');
        else {
            if  (err.name == 'ValidationError'){
                handleValidationError (err,req.body);
                res.render ("create_edit",{
                    viewTitle: 'Appointmentresponse',
                    appointmentresponse : res.body
                });
            }
            else
                console.log ('Error during record insertion '+err);
        }
    });
}

exports.ListAppointmentResponse = function (req,res){
    AppointmentResponse.find().populate('appointment','identifier').exec((err, docs) => {

        if (!err) {
            res.render("appointmentresponse/index", {
                title: 'List AppointmentResponse',
                list : docs,
                appointmentresponseSlideBarActive:true,
            });
        } else {
            console.log('Error in retrieving user list :' + err);
        }
    });
}
exports.queryAppointment = function(req,res){
    AppointmentResponse.findOne({_id: req.params._id}).populate('appointment','identifier').
    exec(function(err,doc){
         if (err) {
             console.log(err)
             return handleError(err);
         }
            
            res.send(doc.appointment[0].use);
            console.log(doc)
    })
}
exports.editAppointmentResponse = function (req,res){
   
var queries = [];
    
    queries.push(function (cb) {
        AppointmentResponse.findById(req.params.id).populate('appointmentresponse', 'identifier').exec(function (err, docs) {
            if (err) {
                throw cb(err);
            }
            // do some stuff with docs & pass or directly pass it
            cb(null, docs);
        });
    })    
    queries.push(function (cb) {
        Appointment.find().exec(function (err, docs) {
            if (err) {
                throw cb(err);
            }

            // do some stuff with docs & pass or directly pass it
            cb(null, docs);
        });
    })    
    async.parallel(queries, function(err, docs){
        res.render("appointmentresponse/create_edit", {
            title: "Edit AppointmentResponse",
            isEdit: true,
            appointmentresponse: docs[0],
            listAppointment: docs[1]
        });
    })
}
exports.deleteRecord = function(req, res){
    AppointmentResponse.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/appointmentresponse/list');
        }
       else { console.log('Error in user delete :' + err); }
    });
}
exports.updateRecord = function updateRecord(req, res) {       
     AppointmentResponse.findOneAndUpdate({_id : req.body._id},  req.body , { runValidators: true }, (err, doc) => {
        if (!err){
            console.log(req.body._id + '????')

            doc.save();
            console.log(doc);
            res.redirect('/appointmentresponse/list');
        }else{
        if (err.name == 'ValidationError') {
            console.log(req.body)
            handleValidationError(err, req.body);
            console.log(err);
            Appointment.find(function(err, docs) {
                if (!err) {
                    res.render("appointmentresponse/create_edit", {
                        title: "update AppointmentResponse",
                        isEdit: true,
                        listAppointment: docs,
                        appointmentresponse: req.body
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
        var appointmentresponse = new AppointmentResponse();
    appointmentresponse.resourceType="AppointmentResponse";
    appointmentresponse.identifier=req.body.identifier;
    appointmentresponse.appointment=req.body.appointment;
    appointmentresponse.start=req.body.start;
    appointmentresponse.end=req.body.end;
    appointmentresponse.participantType=req.body.participantType;
    appointmentresponse.actor=req.body.actor;
    appointmentresponse.participantStatus=req.body.participantStatus;
    appointmentresponse.comment=req.body.comment;
        
console.log(req.body)
        appointmentresponse.save((err, doc) => {
        if (!err)
            return res.redirect('/appointmentresponse/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                console.log(err);
                Appointment.find(function(err, docs) {
                    if (!err) {
                        res.render("appointmentresponse/create_edit", {
                            title: "New AppointmentResponse",
                            isEdit: false,
                            listAppointment: docs,
                            appointmentresponse: req.body
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
exports.NewAppointmentResponse = function(req,res,next){       
    Appointment.find(function(err, docs) {
        if (!err) {
            res.render("appointmentresponse/create_edit", {
                title: "New AppointmentResponse",
                isEdit: false,
                listAppointment: docs,
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
            case 'identifier':
                body['IdentifierError'] = err.errors[field].message;
                break;
            case 'appointment':
                body['AppointmentError'] = err.errors[field].message;
                break;
            case 'actor':
                body['ActorError'] = err.errors[field].message;
                break;
            case 'comment':
                body['CommentError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

