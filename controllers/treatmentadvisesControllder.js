const express = require('express');
const mongoose = require('mongoose');
const limitPage = 10;
const moment = require('moment');
const List_diseases = mongoose.model('List_diseases');
const Treatment_advises = mongoose.model('Treatment_advises');

exports.listTreatment = function(req, res, next) {
    var page = 1;
    if(req.query.page){
        page = req.query.page;
    }
    Treatment_advises.count({}, function( err, count){ 
        return Treatment_advises.find({})
            .populate({path: 'disease', model: "List_diseases", select: '_id name'})
            .skip(limitPage *(page-1)).limit(limitPage).exec((err, docs) => {
            if (!err) {
                res.render("treatmentadvises/index", {
                    title: 'Danh sách tư vấn',
                    list: docs,
                    userName: req.session.userName,
                    userType: req.session.userType,
                    treatmentSlideBarActive:true,
                    pagination: { 
                        page: page, 
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
exports.create = function(req, res, next){
    List_diseases.find({}).exec((err, diseases)=>{
        res.render('treatmentadvises/create_edit', 
            { 
                title: 'Tạo mới', 
                isEdit: false, 
                userName: req.session.userName,
                diseases: diseases
            });
    })     
}
//
exports.insertRecord = function(req, res, next) {
    var treatment_advises = new Treatment_advises();
    treatment_advises.disease = req.body.disease;
    treatment_advises.code = req.body.code;
    treatment_advises.description = req.body.description;
    treatment_advises.save((err,doc)=>{
        if (!err)
            res.redirect('/treatmentadvises/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("treatmentadvises/create_edit", {
                    viewTitle: 'Danh sách bệnh',
                    treatment: req.body
                });
            } else
                console.log('Error during record insertion : ' + err);
        }
    });

}
exports.editTreatment = function(req, res, next) {
     List_diseases.find({}).exec((err_diseases, diseases)=>{
        Treatment_advises.findById(req.params.id, (err,doc)=>{
            if (!err) {
                 res.render("treatmentadvises/create_edit", {
                    title: "Chỉnh sửa",
                    isEdit: true,
                    treatment: doc,
                    diseases: diseases
                });
            }else{
                console.log(err);
            }
        });
     })
}
;
exports.updateRecord = function updateRecord(req, res, next) {
    Treatment_advises.findOneAndUpdate({
        _id: req.body._id
    }, req.body, {
        runValidators: true
    }, function(err, doc) {
        if (!err) {
            res.redirect('/treatmentadvises/list');

        } else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);

                console.log(req.body)

                res.render("treatmentadvises/create_edit", {
                    viewTitle: 'Chỉnh sửa',
                    diseases: req.body,
                    isEdit: true,
                });
            } else
                console.log('Error during record update : ' + err);
        }
    });
}

exports.deleteRecord = function(req, res, next) {
    Treatment_advises.findByIdAndRemove(req.params.id, (err,doc)=>{
        if (!err) {
            res.redirect('/treatmentadvises/list');
        } else {
            console.log('Error in user delete :' + err);
        }
    }
    );
}