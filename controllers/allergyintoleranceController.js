const express = require ('express');
const mongoose = require ('mongoose');
const allergy_intolerance = mongoose.model('Allergy_intolerance');
exports.listAllergyIntolerance = function (req,res){
    return allergy_intolerance.find(function(err,docs){
        if(!err){
            res.render('./allergyintolerance/index',{
                title: 'list AllergyIntolerance',
                list: docs,
                allergy_intoleranceSlideBarActive :true,
            });
        }
        else {
            console.log('Error in retrieving user list :'+err);
        }
    });
}

exports.editAllergyIntolerance = function (req,res){
    allergy_intolerance.findById(req.params.id,(err,doc)=>{
        if(!err){
            res.render("allergyintolerance/create_edit",{
                title: "edit allergy intolerance",
                isEdit: true,
                allergyintolerance: doc
        });
        }
    });
}

exports.deleteRecord = function (req,res){
    allergy_intolerance.findByIdAndRemove(req.params.id,(err,doc)=>{
        if(!err){
            res.redirect('/allergyintolerance/list');
        }
        else {
            console.log('Error in user delete :'+err);
        }
    });
}
exports.AllergyIntoleranceSave = function(req, res){
        var allergyintolerance = new allergy_intolerance();    
        allergyintolerance.resourceType= "AllergyIntolerance";
        allergyintolerance.identifier = req.body.identifier;
        allergyintolerance.clinicalStatus = req.body.clinicalStatus;
        allergyintolerance.verificationStatus = req.body.verificationStatus;
        allergyintolerance.save((err, doc) => {
            if (!err)
                    console.log(doc)
            else {
                if (err.name == 'ValidationError') {
                    handleValidationError(err, req.body);
                    res.render("create_edit", {
                        viewTitle: 'allergyintolerance',
                        allergy_intolerance : req.body
                    });
                }
                else
                    console.log('Error during record insertion : ' + err);
            }
        });
}
exports.insertRecord = function (req,res){
    var allergyintolerance = new allergy_intolerance ();
    allergyintolerance.resourceType= "AllergyIntolerance";
    allergyintolerance.identifier = req.body.identifier;
    allergyintolerance.clinicalStatus = req.body.clinicalStatus;
    allergyintolerance.verificationStatus = req.body.verificationStatus;
    allergyintolerance.type = req.body.type;
    allergyintolerance.category = req.body.category;
    allergyintolerance.criticality = req.body.criticality;
    allergyintolerance.code = req.body.code;
    allergyintolerance.patient = req.body.patient;
    allergyintolerance.onsetDateTime = req.body.onsetDateTime;
    allergyintolerance.onsetAge = req.body.onsetAge;
    allergyintolerance.onsetPeriod = req.body.onsetPeriod;
    allergyintolerance.onsetRange = req.body.onsetRange;
    allergyintolerance.onsetString = req.body.onsetString;
    allergyintolerance.assertedDate = req.body.assertedDate;
    allergyintolerance.recorder = req.body.recorder;
    allergyintolerance.asserter = req.body.asserter;
    allergyintolerance.lastOccurrence = req.body.lastOccurrence;
    allergyintolerance.note = req.body.note;
    allergyintolerance.reaction = {
        substance : req.body.substance,
        manifestation : req.body.manifestation,
        description : req.body.description,
        onset : req.body.onset,
        severity : req.body.severity,
        exposureRoute : req.body.exposureRoute,
        note : req.body.note
    }
    allergyintolerance.save((err,doc)=>{
        if(!err){
            console.log(doc);
            return res.redirect('/allergyintolerance/list');
        }
        else {
            console.log (err)
            if(err.name =='ValidationError'){
                handleValidationError(err,req.body);
                res.render("allergyintolerance/create_edit",{
                    viewTitle: 'allergyintolerance',
                    allergy_intolerance : req.body
                });
                console.log(req.body)
            }
            else 
            console.log('Error drung record insertion :'+err)
        }
    });
}
exports.NewAllergyIntolerance = function(req,res,next){       
            res.render("allergyintolerance/create_edit", {
                title: "Edit AllergyIntolerance",
                isEdit: false,                
            });
        }

exports.updateRecord = function updateRecord(req, res) {       
    allergy_intolerance.findOneAndUpdate({ _id: req.body._id }, req.body  , { runValidators: true }, 
    function(err, doc) {
        if (!err)
            res.redirect('/allergyintolerance/list')
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);

                console.log(req.body)

                res.render("allergyintolerance/create_edit", {
                    viewTitle: 'Update allergyintolerance',
                    allergy_intolerance: req.body,
                    isEdit:true,
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}
function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'onsetDateTime':
                body['OnsetDateTimeError'] = err.errors[field].message;
                break;
            case 'assertedDate':
                body['AssertedDateError'] = err.errors[field].message;
                break;
            case 'lastOccurrence':
                body['LastOccurrenceError'] = err.errors[field].message;
                break;
            case 'onset':
                body['OnsetError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}