const express =require ('express');
const mongoose = require ('mongoose');
const Activitydefinition = mongoose.model('Activitydefinition');
exports.ActivitydefinitionSave = function (req,res,next) {
    var activitydefinition = new Activitydefinition();
    activitydefinition.resourceType = "activitydefinition";
    activitydefinition.url = req.body.url;
    activitydefinition.identifier = req.body.identifier;
    activitydefinition.version = req.body.version;
    activitydefinition.name = req.body.name;
    activitydefinition.title= req.body.title;
    activitydefinition.status = req.body.status;
    activitydefinition.experimental= req.body.experimental;
    activitydefinition.date = req.body.date;
    activitydefinition.publisher = req.body.publisher;
    activitydefinition.description = req.body.description;
    activitydefinition.purpose= req.body.purpose;
    activitydefinition.usage= req.body.usage;
    activitydefinition.approvalDate=req.body.approvalDate;
    activitydefinition.lastReviewDate= req.body.lastReviewDate;
    activitydefinition.effectivePeriod = req.body.effectivePeriod;
    activitydefinition.useContext = req.body.useContext;
    activitydefinition.jurisdiction = req.body.jurisdiction;
    activitydefinition.topic = req.body.topic;
    activitydefinition.contributor= req.body.contributor;
    activitydefinition.contact = req.body.contact;
    activitydefinition.copyright = req.body.copyright;
    activitydefinition.relatedArtifact = req.body.relatedArtifact;
    activitydefinition.library = req.body.library;
    activitydefinition.kind = req.body.kind;
    activitydefinition.code = req.body.code;
    activitydefinition.timingTiming = req.body.timingTiming;
    activitydefinition.timingDateTime = req.body.timingDateTime;
    activitydefinition.timingPeriod = req.body.timingPeriod;
    activitydefinition.timingRange = req.body.TimingRange;
    activitydefinition.location = req.body.location;
    activitydefinition.participant = {
        type : req.body.type,
        role : req.body.role
    };
    activitydefinition.productReference= req.body.productReference;
    activitydefinition.productCodeableConcept= req.body.productCodeableConcept;
    activitydefinition.quantity = req.body.quantity;
    activitydefinition.dosage = req.body.dosage;
    activitydefinition.bodySite = req.body.bodySite;
    activitydefinition.transform = req.body.transform;
    activitydefinition.dynamicValue= {
        description : req.body.description,
        path : req.body.path,
        language : req.body.language,
        expresstion : req.body.expresstion
    };
    console.log(req.body)
    activitydefinition.save((err, doc) => {
            if (!err){
               console.log(doc);
                return res.redirect('/activitydefinition/list');//list
            }
            
            else {
                console.log(err)
                console.log(doc)
                if (err.name == 'ValidationError') {
                    handleValidationError(err, req.body);
                    res.render("activitydefinition/create_edit", {
                        viewTitle: 'activitydefinition',
                        activitydefinition : req.body
                    });
                    console.log(req.body)
                }
                else
                    console.log('Error during record insertion : ' + err);
            }
    });
}

exports.insertRecord = function (req,res,next){
    var activitydefinition = new Activitydefinition();
        activitydefinition.resourceType = "activitydefinition";
    activitydefinition.url = req.body.url;
    activitydefinition.identifier = req.body.identifier;
    activitydefinition.version = req.body.version;
    activitydefinition.name = req.body.name;
    activitydefinition.title= req.body.title;
    activitydefinition.status = req.body.status;
    activitydefinition.experimental= req.body.experimental;
    activitydefinition.date = req.body.date;
    activitydefinition.publisher = req.body.publisher;
    activitydefinition.description = req.body.description;
    activitydefinition.purpose= req.body.purpose;
    activitydefinition.usage= req.body.usage;
    activitydefinition.approvalDate=req.body.approvalDate;
    activitydefinition.lastReviewDate= req.body.lastReviewDate;
    activitydefinition.effectivePeriod = req.body.effectivePeriod;
    activitydefinition.useContext = req.body.useContext;
    activitydefinition.jurisdiction = req.body.jurisdiction;
    activitydefinition.topic = req.body.topic;
    activitydefinition.contributor= req.body.contributor;
    activitydefinition.contact = req.body.contact;
    activitydefinition.copyright = req.body.copyright;
    activitydefinition.relatedArtifact = req.body.relatedArtifact;
    activitydefinition.library = req.body.library;
    activitydefinition.kind = req.body.kind;
    activitydefinition.code = req.body.code;
    activitydefinition.timingTiming = req.body.timingTiming;
    activitydefinition.timingDateTime = req.body.timingDateTime;
    activitydefinition.timingPeriod = req.body.timingPeriod;
    activitydefinition.timingRange = req.body.TimingRange;
    activitydefinition.location = req.body.location;
    activitydefinition.participant = {
        type : req.body.type,
        role : req.body.role
    };
    activitydefinition.productReference= req.body.productReference;
    activitydefinition.productCodeableConcept= req.body.productCodeableConcept;
    activitydefinition.quantity = req.body.quantity;
    activitydefinition.dosage = req.body.dosage;
    activitydefinition.bodySite = req.body.bodySite;
    activitydefinition.transform = req.body.transform;
    activitydefinition.dynamicValue= {
        description : req.body.description,
        path : req.body.path,
        language : req.body.language,
        expresstion : req.body.expresstion
    };
    console.log(req.body)
    activitydefinition.save((err,doc)=>{
        if(!err)
        {
            console.log(doc);
             res.redirect('/activitydefinition/list');
        }     
//         else {
//             console.log(err);
//             if ( err.name == 'ValidationError') {
//                 handleValidationError (err,req.body);
//                 res.render("activitydefinition/create_edit",{
//                     viewTitle: 'Activitydefinition Save',
//                     activitydefinition : req.body
//                 });
//                 console.log(res.body);
//             }
//             else
//                 console.log('Error during record insertion :'+err);
//         }
    });
}


// exports.insertRecord = function(req, res, next) {  
//         var activitydefinition = new Activitydefinition();       
//          organization.resourceType = "Activitydefinition";
//         organization.identifier  =req.body.identifier;
// //         organization.active = req.body.active;
//         organization.type=req.body.type;
//         organization.name=req.body.name;
//         organization.telecom=req.body.telecom;
//         organization.address=req.body.address;
//         organization.alias = req.body.alias;
//         organization.partOf = req.body.partOf;
//         organization.contact = {
//             purpose : req.body.purpose,
//             name : req.body.name,
//             telecom : req.body.telecom,
//             address : req.body.address
//         };
//         organization.endpoint =  req.body.endpoint
//             activitydefinition.resourceType = "activitydefinition";
//     activitydefinition.url = req.body.url;
//     activitydefinitio.identifier = req.body.identifier;
//     activitydefinition.version = req.body.version;
//     activitydefinition.name = req.body.name;
//     activitydefinition.title= req.body.title;
//     activitydefinition.status = req.body.status;
//     activitydefinition.experimental= req.body.experimental;
//     activitydefinition.date = req.body.date;
//     activitydefinition.publisher = req.body.publisher;
//     activitydefinition.description = req.body.description;
//     activitydefinition.purpose= req.body.purpose;
//     activitydefinition.usage= req.body.usage;
//     activitydefinition.approvalDate=req.body.approvalDate;
//     activitydefinition.lastReviewDate= req.body.lastReviewDate;
//     activitydefinition.effectivePeriod = req.body.effectivePeriod;
//     activitydefinition.useContext = req.body.useContext;
//     activitydefinition.jurisdiction = req.body.jurisdiction;
//     activitydefinition.topic = req.body.topic;
//     activitydefinition.contributor= req.body.contributor;
//     activitydefinition.contact = req.body.contact;
//     activitydefinition.copyright = req.body.copyright;
//     activitydefinition.relatedArtifact = req.body.relatedArtifact;
//     activitydefinition.library = req.body.library;
//     activitydefinition.kind = req.body.kind;
//     activitydefinition.code = req.body.code;
//     activitydefinition.timingTiming = req.body.timingTiming;
//     activitydefinition.timingDateTime = req.body.timingDateTime;
//     activitydefinition.timingPeriod = req.body.timingPeriod;
//     activitydefinition.timingRange = req.body.TimingRange;
//     activitydefinition.location = req.body.location;
// //     activitydefinition.participant = {
// //         type : req.body.type,
// //         role : req.body.role
// //     };
// //     activitydefinition.productReference= req.body.productReference;
//     activitydefinition.productCodeableConcept= req.body.productCodeableConcept;
//     activitydefinition.quantity = req.body.quantity;
//     activitydefinition.dosage = req.body.dosage;
//     activitydefinition.bodySite = req.body.bodySite;
//     activitydefinition.transform = req.body.transform;
//     activitydefinition.dynamicValue = {
//         description : req.body.description,
//         path : req.body.path,
//         language : req.body.language,
//         expresstion : req.body.expresstion
//     };
//     console.log(req.body)
//         activitydefinition.save((err, doc) => {
//             if (!err){
//               //  console.log(doc);
//                 return res.redirect('/activitydefinition/list');//list
//             }
            
//             else {
//                 console.log(err)
//                 if (err.name == 'ValidationError') {
//                     handleValidationError(err, req.body);
//                     res.render("activitydefinition/create_edit", {
//                         viewTitle: 'activitydefinition',
//                         activitydefinition : req.body
//                     });
//                     console.log(req.body)
//                 }
//                 else
//                     console.log('Error during record insertion : ' + err);
//             }
//         });

//     }
exports.NewActivitydefinition = function(req,res,next){
    res.render("activitydefinition/create_edit",{
        title: "Edit Activitydefinition",
        isEdit: false,
    });
}

exports.editActivitydefinition = function(req, res){
    Activitydefinition.findById(req.params.id, (err, doc) => {
        if (!err) {

            res.render("activitydefinition/create_edit", {
                title: "Edit Activitydefinition",
                isEdit: true,
                activitydefinition: doc
            });
        }
    });
}
exports.updateRecord = function updateRecord (req,res,next){
    Activitydefinition.findOneAndUpdate({_id: req.body._id },req.body,{ runValidators: true},
    function(err,doc){
        if(!err){
            res.redirect('/activitydefinition/list');
             }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                console.log(req.body)
                res.render("activitydefinition/create_edit", {
                    viewTitle: 'Update Activitydefinition',
                    activitydefinition: req.body,
                    isEdit:true,
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
        });
}
// exports.updateRecord = function updateRecord(req, res) {       
//     Activitydefinition.findOneAndUpdate({ _id: req.body._id }, req.body  , { runValidators: true }, 
//     function(err, doc) {
//         if (!err) { 
            
//             res.redirect('/activitydefinition/list');

            
//              }
//         else {
//             if (err.name == 'ValidationError') {
//                 handleValidationError(err, req.body);

//                 console.log(req.body)

//                 res.render("activitydefinition/create_edit", {
//                     viewTitle: 'Update activitydefinition',
//                     address: req.body,
//                     isEdit:true,
//                 });
//             }
//             else
//                 console.log('Error during record update : ' + err);
//         }
//     });
// }
exports.deleteRecord = function(req, res){
    Activitydefinition.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/activitydefinition/list');
        }
        else { console.log('Error in user delete :' + err); }
    });
}
exports.listActivitydefinition = function(req, res) {
    return Activitydefinition.find((err, docs) => {
        if (!err) {
            res.render("activitydefinition/index", {
                title: 'list activitydefinition',
                list: docs,
                activitydefinitionSlideBarActive:true,
            });
        }
        else {
            console.log('Error in retrieving user list :' + err);
        }
    });
}
function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'name':
                body['NameError'] = err.errors[field].message;
                break;
            case 'status':
                body['StatusError'] = err.errors[field].message;
                break;
            case 'date':
                body['DateError'] = err.errors[field].message;
                break;
            case 'publisher':
                body['PublisherError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}