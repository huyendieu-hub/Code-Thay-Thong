const express = require('express');
const mongoose = require('mongoose');
const Appointment = mongoose.model('Appointment');
// exports.AppointmentSave = function(req, res){
//         var appointment = new Appointment();       
//         appointment.resourceType = "appointment";
//         appointment.identifier  =req.body.identifier;
//         appointment.status = req.body.status;
//         appointment.serviceCategory=req.body.serviceCategory;
//         appointment.serviceType = req.body.serviceType ;
//         appointment.specialty = req.body.specialty;
//         appointment.appointmentType=req.body.appointmentType;
//         appointment.reason = req.body.reason ;
//         appointment.indication = req.body.indication;
//         appointment.priority = req.body.priority ;
//         appointment.description = req.body.description;
//         appointment.supportingInformation = req.body.supportingInformation;
//         appointment.start = req.body.start;
//         appointment.end = req.body.end ;
//         appointment.minutesDuration = req.body.minutesDuration;
//         appointment.slot = req.body.slot;
//         appointment.created = req.body.created;
//         appointment.comment = req.body.comment;
//         appointment.incomingReferral = req.body.incomingReferral;
//         appointment.participant = {
//             type : req.body.type,
//             actor : req.body.actor,
//             required : req.body.required,
//             status : req.body.status
//         };

//         appointment.requestedPeriod = req.body.requestedPeriod 
//         appointment.save((err, doc) => {
//             if (!err)
//                 res.redirect('/list');
//             else {
//                 if (err.name == 'ValidationError') {
//                     handleValidationError(err, req.body);
//                     res.render("create_edit", {
//                         viewTitle: 'Appointment Save',
//                         appointment : req.body
//                     });
//                 }
//                 else
//                     console.log('Error during record insertion : ' + err);
//             }
//         });
// }

exports.editAppointment = function(req, res){
    Appointment.findById(req.params.id, (err, doc) => {
        if (!err) {

            res.render("appointment/create_edit", {
                title: "Edit Appointment",
                isEdit: true,
                appointment: doc
            });
        }
    });
}


exports.listAppointment = function(req, res) {
    return Appointment.find(function(err,docs){
        if(!err){
            res.render('./appointment/index',{
                title : 'list appointment' ,
                list : docs,
                appointmentSlideBarActive: true,           
            })
        }
         else {
            console.log('Error in retrieving user list :' + err);
        }
    });
}
exports.deleteRecord = function(req, res){
    Appointment.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/appointment/list');
        }
        else { console.log('Error in user delete :' + err); }
    });
}

exports.updateRecord = function updateRecord(req, res) {       
    Appointment.findOneAndUpdate({ _id: req.body._id }, req.body  , { runValidators: true }, 
    function(err, doc) {
        if (!err) { 
            res.redirect('/appointment/list');
             }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);

                console.log(req.body)

                res.render("appointment/create_edit", {
                    viewTitle: 'Update Appointment',
                    appointment: req.body,
                    isEdit:true,
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}

exports.insertRecord = function(req, res, next) {  
        var appointment = new Appointment();       
        appointment.resourceType = "appointment";
        appointment.identifier  =req.body.identifier;
        appointment.status = req.body.status;
        appointment.serviceCategory=req.body.serviceCategory;
        appointment.serviceType = req.body.serviceType ;
        appointment.specialty = req.body.specialty;
        appointment.appointmentType=req.body.appointmentType;
        appointment.reason = req.body.reason ;
        appointment.indication = req.body.indication;
        appointment.priority = req.body.priority ;
        appointment.description = req.body.description;
        appointment.supportingInformation = req.body.supportingInformation;      
        appointment.start = req.body.start;
        appointment.end = req.body.end;
        appointment.minutesDuration = req.body.minutesDuration;
        appointment.slot = req.body.slot;
        appointment.created = req.body.created;
        appointment.comment = req.body.comment;
        appointment.incomingReferral = req.body.incomingReferral;
        appointment.participant = {
            type : req.body.type,
            actor : req.body.actor,
            required : req.body.required,
            status : req.body.status
        };
                
        appointment.requestedPeriod = req.body.requestedPeriod 
console.log(req.body)
        appointment.save((err, doc) => {
             
        if (!err)
        {
           
            return res.redirect('/appointment/list');
        }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                console.log(err);
            } else
                console.log('Error during record insertion : ' + err);
        }
    });
}
exports.NewAppointment = function(req,res,next){       
            res.render("appointment/create_edit", {
                title: "Edit Appointment",
                isEdit: false,                
            });
        }

function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'identifier':
                body['IdentifierError'] = err.errors[field].message;
                break;
            case 'specialty':
                body['SpecialtyError'] = err.errors[field].message;
                break;
            case 'indication':
                body['IndicationError'] = err.errors[field].message;
                break;
            case 'priority':
                body['priorityError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}