const express = require('express');
const mongoose = require('mongoose');
const limitPage = 10;
const moment = require('moment');
const List_diseases = mongoose.model('List_diseases');

exports.listDiseases = function(req, res, next) {
    var page = 1;
    if(req.query.page){
        page = req.query.page;
    }
    List_diseases.count({}, function( err, count){ 
        return List_diseases.find({}).skip(limitPage *(page-1)).limit(limitPage).exec((err, docs) => {
            if (!err) {
                res.render("diseases/index", {
                    title: 'Danh sách bệnh',
                    list: docs,
                    userName: req.session.userName,
                    userType: req.session.userType,
                    diseasesSlideBarActive:true,
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
exports.insertRecord = function(req, res, next) {
    var list_diseases = new List_diseases();
    list_diseases.disease = req.body.disease;
    list_diseases.name = req.body.name;
    list_diseases.description = req.body.description;
    list_diseases.save((err,doc)=>{
        if (!err)
            res.redirect('/listdiseases/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("create_edit", {
                    viewTitle: 'Danh sách bệnh',
                    diseases: req.body
                });
            } else
                console.log('Error during record insertion : ' + err);
        }
    });

}
exports.editDiseases = function(req, res, next) {
    List_diseases.findById(req.params.id, (err,doc)=>{
        if (!err) {
             res.render("diseases/create_edit", {
                title: "Chỉnh sửa",
                isEdit: true,
                diseases: doc
            });
        }else{
            console.log(err);
        }
    }
    );
}
;
exports.updateRecord = function updateRecord(req, res, next) {
    List_diseases.findOneAndUpdate({
        _id: req.body._id
    }, req.body, {
        runValidators: true
    }, function(err, doc) {
        if (!err) {
            res.redirect('/listdiseases/list');

        } else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);

                console.log(req.body)

                res.render("diseases/create_edit", {
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
    List_diseases.findByIdAndRemove(req.params.id, (err,doc)=>{
        if (!err) {
            res.redirect('/listdiseases/list');
        } else {
            console.log('Error in user delete :' + err);
        }
    }
    );
}