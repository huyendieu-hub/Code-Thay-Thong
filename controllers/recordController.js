const express = require('express');
const mongoose = require('mongoose');
const moment = require('moment');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Patient = mongoose.model('Patient');
const PatientAdmin = mongoose.model('Patient_adminitration');
const RecordContainer = mongoose.model('Record_container');
const ProcedureRequest = mongoose.model('Procedure_request');
const Record = mongoose.model('Record');
const Practitioner = mongoose.model('Practitioner');
const Disease_injures = mongoose.model('Disease_injures');
const Imaging_study = mongoose.model('Imaging_study');
const curl = new (require( 'curl-request' ))();
const Treatment_advises = mongoose.model('Treatment_advises');
const List_diseases = mongoose.model('List_diseases');

exports.create = function(req, res, next){
    RecordContainer.find({patientAdminitration: req.params.id}).exec(function(err, doc_recordcontainer){
        isEdit = false;
        console.log(doc_recordcontainer.length);
        if(doc_recordcontainer.length > 0){
            isEdit = true;
        }else{
            isEdit = false;
        }
        PatientAdmin.findOne({_id: req.params.id}).populate({path: 'patient', model: "Patient", select: '_id name'}).exec(function(err, doc_patientadmin) {
            if (!err) {
                if(isEdit == true){
                    Record.findOne({recordContainer: doc_recordcontainer[0]._id})
                        .populate({path: 'disease_injures', model: "Disease_injures", select: '_id'})
                        .populate({path: 'imaging_study', model: "Imaging_study"})
                        .populate({path: 'disease_selected', model: "List_diseases"})
                        //.populate({path: 'patient', model: "Patient", select: '_id name'})
                        //.populate({path: 'record_containers', model: "Record_container"})
                        //.populate({path: 'record', model: "Record"})
                        .exec(function(err, doc_record) {
                        if (!err) {
                            //console.log(doc_record);
                            Disease_injures.find({records: doc_record._id})
                               .populate({path: 'images', model: "Imaging_study"})
                               .exec((err_inj, docs_inj)=>{
                               if(!err_inj){
                                   //console.log(docs_inj);
                                   var infor_treatment = [];
                                   //console.log(docs_inj[0].images);

                                   for(var key in docs_inj[0].images){
                                        var image = docs_inj[0].images[key];
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
                                   List_diseases.find({}).exec((err, listdiseases)=> {
                                       //console.log(infor_treatment);
                                       Treatment_advises.find({code: {$in: infor_treatment}}).exec((err_treat, treatmentadvises)=>{
                                            if(!err_treat){
                                                res.render("records/create_edit",{
                                                    title: 'Nhập thông tin triệu chứng',
                                                    record: doc_record,
                                                    patientadmin: doc_patientadmin,
                                                    isEdit: isEdit,
                                                    images: docs_inj[0].images,
                                                    disease_injures: docs_inj._id,
                                                    patientListRegisterSlideBarActive: true,
                                                    userName: req.session.userName,
                                                    userType: req.session.userType,
                                                    treatmentadvises: treatmentadvises,
                                                    listdiseases: listdiseases,
                                               });
                                            }else{
                                                res.render("records/create_edit",{
                                                    title: 'Nhập thông tin triệu chứng',
                                                    record: doc_record,
                                                    patientadmin: doc_patientadmin,
                                                    isEdit: isEdit,
                                                    images: docs_inj[0].images,
                                                    disease_injures: docs_inj._id,
                                                    patientListRegisterSlideBarActive: true,
                                                    userName: req.session.userName,
                                                    userType: req.session.userType,
                                                    listdiseases: listdiseases,
                                               });
                                            }
                                       });
                                   });
                               } else{
                                   List_diseases.find({}).exec((err, listdiseases)=> {
                                       res.render("records/create_edit",{
                                            title: 'Nhập thông tin triệu chứng',
                                            record: doc_record,
                                            patientadmin: doc_patientadmin,
                                            isEdit: isEdit,
                                            patientListRegisterSlideBarActive: true,
                                            userName: req.session.userName,
                                            userType: req.session.userType,
                                            listdiseases: listdiseases,
                                       });
                                   });
                               }
                            });
                            
                        } else {
                            console.log(err);
                            console.log("ERROR");
                        }
                    });
                }else{
                    List_diseases.find({}).exec((err, listdiseases)=> {
                        res.render("records/create_edit",{
                            title: 'Nhập thông tin triệu chứng',
                            record: {},
                            listdiseases: listdiseases,
                            patientadmin: doc_patientadmin,
                            isEdit: isEdit,
                            patientListRegisterSlideBarActive: true,
                        }); 
                    });
                }
            }
        });
    });  
} 
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  destination: './uploads',
  filename: function(req, file, fn) {
    //callback(null, Date.now() + path.extname(file.originalname));
    fn(null, Date.now() + path.extname(file.originalname));
  }
});
//
//var upload = multer({ storage : storage }).array('img[]', 10);
const uploadImage = multer({
    storage: storage,
    limits: {
        fileSize: 20000000
    },
    fileFilter: function(req, file, callback) {
        validateFile(file, callback);
    }
}).array('img[]', 10);
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
//
exports.store = function(req, res, next){
    uploadImage(req, res, function(err) {
        var record = new Record();
        var recordcontainer = new RecordContainer();
        var procedurerequest = new ProcedureRequest();
        var userId =  req.session.userId;
        var patient_id = req.body.patient_id;
        var patientadmin_id = req.body.patientadmin_id;
        Practitioner.findOne({account: userId}).populate({path: 'account', model: "Account", select: '_id'}).exec(function(err, doc) {
            if (!err) {
                var doctor_id =  doc._id;
                console.log(doctor_id);
                procedurerequest.practitioner = doc.id;
                procedurerequest.patient_adinistration = patientadmin_id;

                procedurerequest.save(async (errproce, proce) => {
                    if(!errproce){
                        recordcontainer.createTime = Date.now();
                        recordcontainer.patientAdminitration = patientadmin_id;
                        recordcontainer.patient = patient_id;
                        //recordcontainer.status = ;
                        await recordcontainer.save((errcontainer, container) =>{
                            if(!errcontainer){
                                record.recordContainer = container._id;
                                record.patient = patient_id;
                                record.comingReason = req.body.comingReason;
                                record.disease = {
                                    diseaseDescription: req.body.diseaseDescription,
                                    diseaseHistory: req.body.diseaseHistory,
                                    familyHistory: req.body.familyHistory
                                } 
                                //
                                record.diagnosis = {
                                    body:{
                                        angio: req.body.angio,
                                        temperature: req.body.temperature,
                                        blood_pressure: req.body.blood_pressure,
                                        weight: req.body.weight
                                    },
                                    dentaldisease: {
                                        description: req.body.description
                                    }
                                }
                                //
                                record.prediction = req.body.prediction;
                                //record.disease_selected = req.body.disease_selected;
                                record.treatment = req.body.treatment;
                                record.conclusionDate = req.body.conclusionDate;
                                record.doctor = doctor_id;
                                record.save(async (err_record, reco) =>{
                                    if(!err_record){
                                        var disease_injures = new Disease_injures();
                                        disease_injures.records = reco._id;
                                        disease_injures.save(async (err_inj, doc_inj)=>{
                                            if(!err_inj){
                                                //console.log(req.files);
                                                if(req.files.length > 0){
                                                    var array_imgs = [];
                                                    var disease_selected = req.body.disease_selected;
                                                    for(i = 0; i < req.files.length; i++){
                                                        array_imgs.push({
                                                            context: req.files[i].filename, 
                                                            disease_injures: doc_inj._id,
                                                            disease_selected: disease_selected[i]
                                                        });
                                                    }
                                                    //console.log(array_imgs);
                                                    Imaging_study.collection.insert(array_imgs, async (err_img, docs_img) =>{
                                                        if(!err_img){
                                                            //console.log(docs_img);
                                                            var ids_img = [];
                                                            const objectArray = Object.entries(docs_img.insertedIds);

                                                            objectArray.forEach(([key, value]) => {
                                                              console.log(key); // 'one'
                                                              console.log(value); // 1
                                                              ids_img.push(value);
                                                            })
                                                            //console.log(ids_img);
                                                            Disease_injures.findOneAndUpdate({_id: doc_inj._id},{
                                                                images: ids_img
                                                            },{},
                                                            function(err_update, doc_update) {
                                                                if (!err_update) {
                                                                    console.log("Completed");
        
                                                                }else {
                                                                    console.log("ERROR update inj");

                                                                }
                                                            });
                                                        }else{
                                                            console.log("ERROR insert image");

                                                        }
                                                    });
                                                }else{

                                                }
                                            }
                                        });
                                        
                                        if(req.body.method_storage == 2){
                                            PatientAdmin.findOneAndUpdate(
                                                { _id: patientadmin_id }, 
                                                { leaving:{ leavingTime: Date.now(), leavingStatus: '1' }} , 
                                                { runValidators: true }, 
                                                function(err, doc) {
                                                    if (!err) {

                                                    }else {

                                                    }
                                                });
                                        }
                                        res.redirect('/patients/list');
                                    }else{
                                        console.log(err_record);
                                        console.log('ERROR3');
                                    }
                                });
                            }else{
                                console.log("ERROR2");
                            }
                        });
                    } else{
                        console.log("ERROR1");
                    }
                });
                //procedurerequest

                //record
            } else {
                console.log("ERROR");
            }
        });   
    }); 
}

exports.update = function(req, res, next){
    uploadImage(req, res, function(err) {
        var record = new Record();
        var recordcontainer = new RecordContainer();
        var procedurerequest = new ProcedureRequest();
        var userId =  req.session.userId;
        var patient_id = req.body.patient_id;
        var patientadmin_id = req.body.patientadmin_id;
        Record.findOneAndUpdate(
            {_id: req.body.record_id},
            {
                comingReason: req.body.comingReason,
                //disease_selected: req.body.disease_selected,
                disease: {
                    diseaseDescription: req.body.diseaseDescription,
                    diseaseHistory: req.body.diseaseHistory,
                    familyHistory: req.body.familyHistory
                },
                diagnosis: {
                    //body: req.body.body,
                    body:{
                        angio: req.body.angio,
                        temperature: req.body.temperature,
                        blood_pressure: req.body.blood_pressure,
                        weight: req.body.weight
                    },
                    dentaldisease: {
                        description: req.body.description
                    }
                },
                prediction: req.body.prediction,
                treatment: req.body.treatment,
                conclusionDate: req.body.conclusionDate,
            },
            async (err_record, reco) =>{
            if(!err_record){
                Disease_injures.findOne({records: req.body.record_id}).exec(async (err_inj, doc_inj)=>{
                    if(!err_inj){
                        //console.log(req.files);
                        if(req.files.length > 0){
                            var array_imgs = [];
                            var disease_selected = req.body.disease_selected;
                            for(i = 0; i < req.files.length; i++){
                                array_imgs.push({
                                    context: req.files[i].filename, 
                                    disease_injures: doc_inj._id,
                                    disease_selected: disease_selected[i]
                                });
                            }
                            //console.log(array_imgs);
                            Imaging_study.collection.insert(array_imgs, async (err_img, docs_img) =>{
                                if(!err_img){
                                    //console.log(docs_img);
                                    if(req.body.img_exist){
                                        var ids_img = req.body.img_exist;
                                    }else{
                                        var ids_img = [];
                                    }
                                    
                                    const objectArray = Object.entries(docs_img.insertedIds);

                                    objectArray.forEach(([key, value]) => {
                                      //console.log(key); // 'one'
                                      //console.log(value); // 1
                                      ids_img.push(value);
                                    })
                                    //console.log(ids_img);
                                    Disease_injures.findOneAndUpdate({_id: doc_inj._id},{
                                        images: ids_img
                                    },{},
                                    function(err_update, doc_update) {
                                        if (!err_update) {
                                            console.log("Completed");

                                        }else {
                                            console.log("ERROR update inj");

                                        }
                                    });
                                }else{
                                    console.log("ERROR insert image");

                                }
                            });
                        }else{
                            Disease_injures.findOneAndUpdate({_id: doc_inj._id},{
                                images: req.body.img_exist
                            },{},
                            function(err_update, doc_update) {
                                if (!err_update) {
                                    console.log("Completed");

                                }else {
                                    console.log("ERROR update inj");

                                }
                            });
                }
                    }
                });

                if(req.body.method_storage == 2){
                    PatientAdmin.findOneAndUpdate(
                        { _id: patientadmin_id }, 
                        { leaving:{ leavingTime: Date.now(), leavingStatus: '1' }} , 
                        { runValidators: true }, 
                        function(err, doc) {
                            if (!err) {

                            }else {

                            }
                        });
                }
                if(req.body.method_storage == 2){
                    res.redirect('/patients/list');
                }else{
                    //res.redirect('/patients/listpatientadmin');
                    res.redirect('back');
                }
            }else{
                console.log(err_record);
                console.log('ERROR3');
            }
        });
    }); 
}
exports.predict4Image = function(req, res, next){
    // File upload
    console.log(req.body.url);
    console.log(req.body.id_image);
    console.log(req.body.link_predict);
    console.log(req.body.code);
    var type_model = 0;
    if(req.body.code == 'RK'){
        type_model = 0;
    }
    else if(req.body.code == 'VQC'){
        type_model = 1;
    }
    else if(req.body.code == 'SMBT'){
        type_model = 2;
    }
    else if(req.body.code == 'SR'){
        type_model = 3;
    }
    else if(req.body.code == 'VL'){
        type_model = 4;
    }
    curl
    .setHeaders([
        'Content-Type: multipart/form-data'//;Content-Length: 960559;Access-Control-Allow-Origin: *;Connection: keep-alive'
    ])
    .setMultipartBody([{
      name: 'type_data',
      contents: '2'
    },{
        name: 'type_model',
        contents: ''+type_model
    }, {
      name: 'image',
      file: req.body.url,
      type: 'image/jpg'
    }])
    .post(req.body.link_predict/*'http://112.137.141.15:5000/predict'*/)
    .then(async ({statusCode, body, headers}) => {
        //await console.log(statusCode);
        await console.log(body);
        //await console.log(headers);
        console.log(body.success);
        if(body.success == true){
            //update data
            Imaging_study.findOneAndUpdate({_id: req.body.id_image},
            {
                diagnose_machine: body,//JSON.stringify(body),
                disease_selected: req.body.disease_selected
            }, async (err, image) =>{
                if(!err){
                    return res.status(200).send(body);
                }else{
                    return res.status(200).send(body);
                }
            });

        }else{
            
        }
        return res.status(200).send(body);
    })
    .catch((e) => {
        console.log(e);
    });
}  
function handleValidationError(err, body) {
    for (field in err.errors) {

    }
}