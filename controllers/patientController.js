const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Account = mongoose.model('Account');
const Patient = mongoose.model('Patient');
const PatientAdmin = mongoose.model('Patient_adminitration');
const RecordContainer = mongoose.model('Record_container');
const ProcedureRequest = mongoose.model('Procedure_request');
const Record = mongoose.model('Record');
const Practitioner = mongoose.model('Practitioner');
const Disease_injures = mongoose.model('Disease_injures');
const Treatment_advises = mongoose.model('Treatment_advises');
const Imaging_study = mongoose.model('Imaging_study');
const List_diseases = mongoose.model('List_diseases');
const limitPage = 10;

const moment = require('moment');
//
exports.patientadministration = function(req, res, next){
    var condition = {};
    //
    if(req.session.userType == 1 || req.session.userType == 2){
        
    }
    //
    else if(req.session.userType == 3){
        condition.generalPractitioner = req.session.doctorId;
    }else{

    }
    Patient.find(condition).exec(function(err, docs) {
        if (!err) {
            res.render("patients/patientadministration",{
                title: 'Đăng ký điều tri',
                patients: docs,
                patientRegisterSlideBarActive: true,
                userName: req.session.userName,
                userType: req.session.userType
            })
        } else {
            console.log(err)
            console.log("ERROR");
        }
    }); 
} 
//
exports.procedureRequest = function(req, res, next){
    res.render("patients/procedurerequest", {
        title: 'procedure request',
        userName: req.session.userName,
        userType: req.session.userType
    });
}
//
exports.listPatients = function(req, res) {
    var page = 1;
    if(req.query.page){
        page = req.query.page;
    }
    var queryParams = '';
    var orcondition = [];
    if(req.query.queryParams){
        orcondition.push({"medicalCode": {$regex: new RegExp(req.query.queryParams, "i")}});
        orcondition.push({"name": {$regex: new RegExp(req.query.queryParams, "i")}});
    }
    var condition = {};
    //
    if(req.session.userType == 1 || req.session.userType == 2){        
    }
    //
    else if(req.session.userType == 3){
        condition.generalPractitioner = req.session.doctorId;
    }else{
    }
    var countPatient = Patient.count(condition);
    if(orcondition.length > 0){
        countPatient.or(orcondition);
    }
    countPatient.exec(( err, count) => { 
        var rowPatient = Patient.find(condition);
        if(orcondition.length > 0){
            rowPatient.or(orcondition);
        }
        return rowPatient.skip(limitPage *(page-1)).limit(limitPage).exec((err, docs) => {
            if (!err) {
                var newdocs=docs.map(function(doc){
                    let formattedDate=moment(doc.birthDate).format("DD-MM-YYYY");
                    doc.birthDateFormat=formattedDate;
                    return doc;
                });
                res.render("patients/index", {
                    title: 'Danh sách bệnh nhân',
                    list: newdocs,
                    userName: req.session.userName,
                    userType: req.session.userType,
                    patientSlideBarActive:true,
                    pagination: { 
                        page: parseInt(page), 
                        limit: limitPage, 
                        totalRows: count, 
                        queryParams: '' 
                    }
                });
            } else {
                console.log('Error in retrieving user list :' + err);
            }
        });
     });
}
//
exports.listPatientAdmin = function(req, res, next){
    var page = 1;
    var queryParams = null;
    if(req.query.page){
        page = req.query.page;
    }
    if(req.query.queryParams){
        queryParams = req.query.queryParams;
    }
    var condition = {};
    //
    if(req.session.userType == 1 || req.session.userType == 2){
        
    }
    //
    else if(req.session.userType == 3){
        condition.generalPractitioner = req.session.doctorId;
    }else{

    }
    Patient.find(condition).exec((er_patient, patients)=>{
        var array_patients = [];
        for(var k in patients){
            array_patients.push(patients[k]._id);
        }
        PatientAdmin.count({patient: { "$in" : array_patients} }, function( err, count){ 
            return PatientAdmin.find({leaving: {$exists: false}, patient: { "$in" : array_patients}})
            .populate({path: 'patient', model: "Patient"})
            .skip(limitPage *(page-1)).limit(limitPage).exec((err, docs) =>{
                var newdocs = docs.map(function(doc){
                    let formattedDate=moment(doc.comingTime).format("DD-MM-YYYY");
                    doc.comingTime=formattedDate;
                    return doc;
                });
                res.render("patients/index_patientadmin", {
                    title: 'Danh sách đăng ký',
                    list: newdocs,
                    userName: req.session.userName,
                    userType: req.session.userType,
                    patientListRegisterSlideBarActive:true,
                    pagination: { 
                        page: parseInt(page), 
                        limit: limitPage, 
                        totalRows: count, 
                        queryParams: '' 
                    }
                });
            });
        });
   });
}
//
exports.editPatient = function(req, res, next) {
    Patient.findById(req.params.id, (err, doc) => {
        if (!err) {
            console.log(doc)    
            let formattedDate=moment(doc.birthDate).format("DD-MM-YYYY");
            doc.birthDate=formattedDate;
            res.render("patients/create_edit", {
                title: "Chỉnh sửa thông tin bệnh nhân",
                isEdit: true,
                userType: req.session.userType,
                patient: doc
            });
        }
    });
}
//
// exports.uploadPhoto(req,res,(err)=>{
//      console.log(req.file);
// })
exports.detailsPatient = function(req, res, next) {
    Patient.findById(req.params.id, async (err, doc) => {
        if (!err) {
            var date = new Date(doc.birthDate);
            var date1 = new Date(Date.now())
            var age = parseInt(date1.getFullYear()) - parseInt(date.getFullYear());
            Record.find({patient: req.params.id})
                .populate({path: 'recordContainer', model: "Record_container", 
                    populate: {path: 'patientAdminitration', model: "Patient_adminitration", 
                        populate: {path: 'patients', model: "Patient"}}})
                .exec((err_record, doc_record)=>{
                if(!err_record){
                    var id_records = []
                    for (i = 0; i < doc_record.length; i++){
                        id_records.push(doc_record[i]._id);
                    }
                    Disease_injures.find({records:{ "$in" : id_records}})
                        .populate({path: 'images', model: "Imaging_study"})
                        .exec((err_img, doc_img)=>{
                        console.log(doc_img);
                        if(!err_img){

                            for (i = 0; i < doc_record.length; i++){
                                for(j = 0; j < doc_img.length; j++){
                                    console.log(doc_record[i]._id + "-" + doc_img[j].records);
                                    if(doc_record[i]._id.equals(doc_img[j].records)){
                                        doc_record[i].images = doc_img[j].images;
                                    }
                                }
                            }

                            var infor_treatment = [];
                            //console.log(docs_inj[0].images);

                            for(var key in doc_img[0].images){
                                var image = doc_img[0].images[key];
                                console.log(image);
                                if(image.diagnose_machine){
                                    if(image.diagnose_machine.predictions.length > 0){
                                        for(var key1 in image.diagnose_machine.predictions){
                                            if(image.diagnose_machine.predictions[key1].length > 0){
                                                var loca_treat = image.diagnose_machine.predictions[key1];
                                                infor_treatment.push(loca_treat[0]);
                                            }
                                        }
                                    }else{

                                    }
                                }
                            }
                            Treatment_advises.find({code: {$in: infor_treatment}}).exec((err_treat, treatmentadvises)=>{
                                if(!err_treat){
                                    res.render("patients/details", {
                                        title: "Thông tin bệnh nhân ",
                                        isEdit: true,
                                        record: doc_record,
                                        patient: doc,
                                        treatmentadvises: treatmentadvises,
                                        userName: req.session.userName,
                                        userType: req.session.userType,
                                        birthDate: date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear(),
                                        Age: age,
                                    });
                                }else{
                                    res.render("patients/details", {
                                        title: "Thông tin bệnh nhân ",
                                        isEdit: true,
                                        record: doc_record,
                                        patient: doc,
                                        userName: req.session.userName,
                                        userType: req.session.userType,
                                        birthDate: date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear(),
                                        Age: age,
                                    });
                                }
                                
                            });
                            
                        }else{
                            res.render("patients/details", {
                                title: "Thông tin bệnh nhân ",
                                isEdit: true,
                                record: doc_record,
                                patient: doc,
                                userName: req.session.userName,
                                userType: req.session.userType,
                                birthDate: date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear(),
                                Age: age,
                            });
                        }
                    })
                }else{
                    res.render("patients/details", {
                        title: "Thông tin bệnh nhân ",
                        isEdit: true,
                        patient: doc,
                        userName: req.session.userName,
                        userType: req.session.userType,
                        birthDate: date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear(),
                        Age: age,
                    });
                }
            });
        }
    });
}
//thêm enctype="multipart/form-data" vào thẻ form trong create_edit để có thể upload files
const storageEngine = multer.diskStorage({
    destination: './public/files',
    filename: function(req, file, fn) {
        fn(null, new Date().getTime().toString() + '-' + file.fieldname + path.extname(file.originalname));
        //     console.log(file)
    }
});
const uploadPhoto = multer({
    storage: storageEngine,
    limits: {
        fileSize: 2000000
    },
    fileFilter: function(req, file, callback) {
        validateFile(file, callback);
    }
}).single('photo');
var validateFile = function(file, cb) {
    allowedFileTypes = /jpeg|jpg|png|gif/;
    const extension = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = allowedFileTypes.test(file.mimetype);
    if (extension && mimeType) {
        return cb(null, true);
    } else {
        cb("Invalid file type. Only JPEG, PNG and GIF file are allowed.")
    }
}
exports.insertRecord = function(req, res, next) {
    uploadPhoto(req, res, (error) => {
        if (error) {
            console.log("Error 1");
        } else {
            var patient = new Patient();
            var account = new Account();
            account.resourceType = "account";
            account.name = req.body.name;
            account.gender = req.body.gender;
            account.type = 4;//patient type
            account.username = Date.now();
            account.password = Date.now();

            patient.resourceType = "patients"
            patient.name = req.body.name;
            patient.age = req.body.age;
            patient.gender = req.body.gender;
            patient.birthDate = req.body.birthDate;
            patient.medicalCode = req.body.medicalCode;
            patient.jobAddress = req.body.jobAddress;
            patient.deceasedDateTime = req.body.deceasedDateTime;
            patient.mobile = req.body.mobile;
            patient.email = req.body.email;
            patient.communication = [{
                language: req.body.language,
                preferred: req.body.preferred,
            }];
            //console.log(req.session.doctorId);
            patient.address = req.body.address;
            patient.generalPractitioner = req.session.doctorId;

            //     patient.resourceType = 'Patient';
            //     patient.foreigner = req.body
            //     patient.active = req.body
            //     patient.storageNumber = req.body
            //     patient.deceasedBoolean = req.body
            //     patient.maritalStatus = req.body
            //     patient.multipleBirthInteger = req.body
            //     patient.multipleBirth = req.body
            //     patient.multipleBirthBoolean = req.body

            //     patient.generalPractitioner = req.body
            //     patient.managingOrganization= req.body
            
            if (req.file == undefined) {
                patient.photo = "files/avatar.png";
                account.image = "files/avatar.png";
            } else {
                var fullPath = "files/" + req.file.filename;
                patient.photo = fullPath;
                account.iamge = fullPath;
            }
            account.save((err_account, doc_account)=>{
                if(!err_account){
                    patient.account =  account._id;
                    patient.save((err, doc) => {
                        if (!err) {
                            if(req.body.select_action == 1){
                                return res.redirect('/patients/list');
                            }else{
                                patients = [];
                                patients.push(doc);
                                res.render("patients/patientadministration",{
                                    title: 'Register for medical treatment',
                                    patients: patients,
                                    patientRegisterSlideBarActive: true,
                                    userName: req.session.userName,
                                    userType: req.session.userType
                                });
                            }
                                
                        } else {
                            if (err.name == 'ValidationError') {
                                handleValidationError(err, req.body);
                                console.log(req.body)
                                res.render("patients/create_edit", {
                                    viewTitle: "Thêm bệnh nhân",
                                    isEdit: false,
                                    userName: req.session.userName,
                                    userType: req.session.userType,
                                    patient: req.body
                                });
                            } else
                                console.log('Error during record insertion : ' + err);
                        }
                    }); 
                }else{
                    if (err.name == 'ValidationError') {
                        handleValidationError(err, req.body);
                        console.log(req.body)
                        res.render("patients/create_edit", {
                            viewTitle: "Thêm bệnh nhân",
                            isEdit: false,
                            userName: req.session.userName,
                            userType: req.session.userType,
                            patient: req.body
                        });
                    } else
                        console.log('Error during record insertion : ' + err);
                }
                   
            });
        }
    });

}
//
exports.insertRecordPatientAdministration = function(req, res, next){
    var patientadministration = new PatientAdmin();
    patientadministration.resourceType = "patient_administrations";
    patientadministration.patient = req.body.patient;
    patientadministration.comingTime = req.body.comingTime;
    patientadministration.arrivedDepartment = req.body.arrivedDepartment;
    patientadministration.comingFrom = req.body.comingFrom;
    patientadministration.rescueNumber = req.body.rescueNumber;
    patientadministration.departmentComingTime = req.body.departmentComingTime;
    
    patientadministration.save((err, doc) => {
        if(!err){
            if(req.body.select_action == 1){
                return res.redirect('/patients/listpatientadmin');
            }else{
                PatientAdmin.findOne({_id: doc._id}).populate({path: 'patient', model: "Patient", select: '_id name'}).exec(function(err, doc_patientadmin) {
                    if (!err) {
                        List_diseases.find({}).exec((err, listdiseases)=> {
                            res.render("records/create_edit",{
                                title: 'Nhập thông tin triệu chứng',
                                record: {},
                                patientadmin: doc_patientadmin,
                                isEdit: false,
                                patientRegisterSlideBarActive: true,
                                listdiseases: listdiseases,
                            })
                        });
                    }
                });
                
            }
        } else{
            if(err.name == 'ValidationError'){
                handleValidationError(err, req.body);
                console.log(req.body)
                res.render("patients/patientadministration", {
                    viewTitle: "Thêm thông tin bệnh nhân",
                    isEdit: false,
                    userName: req.session.userName,
                    userType: req.session.userType,
                    patientadmin: req.body
                });
            }else{
                console.log('Error during record insertion : ' + err);
            }
        }
    });
       
}
//editPatientAdministration
exports.editPatientAdministration = function(req, res, next){
    var condition = {};
    //
    if(req.session.userType == 1 || req.session.userType == 2){
        
    }
    //
    else if(req.session.userType == 3){
        condition.generalPractitioner = req.session.doctorId;
    }else{

    }
    //
    PatientAdmin.findOne({_id: req.params.id})
        .populate({path: 'patient', model: "Patient"})
        .exec(function(err, doc_patientadmin) {
        if (!err) {
            res.render("patients/patientadministration",{
                title: 'Đăng ký điều trị',
                patients: doc_patientadmin.patient,
                patientadmin: doc_patientadmin,
                isEdit: true,
                patientRegisterSlideBarActive: true,
                userName: req.session.userName,
                userType: req.session.userType
            });
        }else{
            
        }
    });
}
exports.updatePatientAdmin = function(req, res, next){
    PatientAdmin.findOneAndUpdate({
        _id: req.body._id
    }, {
        patient: req.body.patient,
        comingTime: req.body.comingTime,
        arrivedDepartment: req.body.arrivedDepartment,
        comingFrom: req.body.comingFrom,
        rescueNumber: req.body.rescueNumber,
        departmentComingTime: req.body.departmentComingTime
    }, {
        runValidators: true
    }, (err, doc) => {
        if(!err){
            return res.redirect('/patients/listpatientadmin');
        }else{
            PatientAdmin.findOne({_id: req.body._id})
                .populate({path: 'patient', model: "Patient"})
                .exec(function(err, doc_patientadmin) {
                if (!err) {
                    res.render("patients/patientadministration",{
                        title: 'Đăng ký điều trị',
                        patients: doc_patientadmin.patient,
                        patientadmin: doc_patientadmin,
                        isEdit: true,
                        patientRegisterSlideBarActive: true,
                        userName: req.session.userName,
                        userType: req.session.userType
                    })
                }else{
                    
                }
            });
        }
    });
}
//
exports.updateRecord = function updateRecord(req, res) {

    uploadPhoto(req, res, (error) => {
        if (error) {
            console.log('Error 1');
        } else {
            Patient.findOneAndUpdate({
                _id: req.body._id
            }, req.body, {
                runValidators: true
            }, (err, doc) => {
                if (!err) {

                    console.log(doc)
                    if (req.file == undefined) {} else {
                        var fullPath = "./public/" + doc.photo
                        if (fullPath != "./public/files/avatar.png") {
                            fs.unlink(fullPath, (error) => {
                                if (error) {
                                    console.error(error)
                                    return
                                }
                            })
                        }
                        var fullPath1 = "files/" + req.file.filename;
                        doc.photo = fullPath1;
                    }
                    console.log(req.file)
                    doc.communication[0].language =req.body.language
                    doc.save();
                    res.redirect('/patients/list');
                } else {
                    if (err.name == 'ValidationError') {
                        handleValidationError(err, req.body);
                        res.render("/patients/create_edit", {
                            viewTitle: 'Cập nhật thông tin bệnh nhân',
                            isEdit: true,
                            patient: req.body,
                            userName: req.session.userName,
                            userType: req.session.userType,
                        });
                    } else
                        console.log('Error during record update : ' + err);
                }
            });
        }
    });
}
//
exports.deleteRecord = function(req, res) {
    Patient.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/patients/list');
            var fullPath = "./public/" + doc.photo
            if (fullPath != "./public/files/avatar.png") {
                fs.unlink(fullPath, (err) => {
                    if (err) {
                        console.error(err)
                        return
                    }
                })
            }
        } else {
            console.log('Error in user delete :' + err);
        }
    });
}
//
exports.deleteRecordPatientAdmin = function(req, res, next){
    PatientAdmin.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/patients/listpatientadmin');
        } else {
            console.log('Error in user delete :' + err);
        }
    });
}
//

function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'name':
                body['nameError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}
function handleValidationErrorPatientAdministration(err, body){    
}