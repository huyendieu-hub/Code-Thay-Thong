const express = require('express');
const mongoose = require('mongoose');
const SuggestOrganizations = mongoose.model('SuggestOrganizations');
const limitPage = 10;
exports.listOrganization = function(req, res) {
    var page = 1;
    if(req.query.page){
        page = req.query.page;
    }
    SuggestOrganizations.count({}, function( err, count){ 
        return SuggestOrganizations.find({})
            .skip(limitPage *(page-1)).limit(limitPage).exec((err, docs) => {
            if (!err) {
                res.render("suggestorganizations/index", {
                    title: 'Suggest Organizations',
                    list: docs,
                    suggestorganizationSlideBarActive: true,
                    pagination: { 
                        page: page, 
                        limit: limitPage, 
                        totalRows: count, 
                        queryParams: '' 
                    }
                });
            } else {
                console.log('Error in retrieving list :' + err);
            }
        });
    });
    
}
//
exports.create = function(req, res, next){
     res.render('suggestorganizations/create_edit', 
            { 
                title: 'Tạo mới', 
                isEdit: false, 
                userName: req.session.userName,
                suggestorganizationSlideBarActive: true
            });
}
//
exports.insertRecord = function(req, res, next) {
    var suggest = new SuggestOrganizations();
    suggest.name = req.body.name;
    suggest.telecom = req.body.telecom;
    suggest.address = req.body.address;
    suggest.save((err,doc)=>{
        if (!err)
            res.redirect('/suggestorganization/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("suggestorganizations/create_edit", {
                    viewTitle: 'Tạo mới',
                    suggest: req.body
                });
            } else
                console.log('Error during record insertion : ' + err);
        }
    });

}
exports.editSuggest = function(req, res, next) {
     SuggestOrganizations.findById(req.params.id, (err,doc)=>{
        if (!err) {
             res.render("suggestorganizations/create_edit", {
                title: "Chỉnh sửa",
                isEdit: true,
                suggest: doc,
                suggestorganizationSlideBarActive: true
            });
        }else{
            console.log(err);
        }
    });
}
;
exports.updateRecord = function updateRecord(req, res, next) {
    SuggestOrganizations.findOneAndUpdate({
        _id: req.body._id
    }, req.body, {
        runValidators: true
    }, function(err, doc) {
        if (!err) {
            res.redirect('/suggestorganization/list');

        } else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);

                console.log(req.body)

                res.render("suggestorganizations/create_edit", {
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
    SuggestOrganizations.findByIdAndRemove(req.params.id, (err,doc)=>{
        if (!err) {
            res.redirect('/suggestorganization/list');
        } else {
            console.log('Error in user delete :' + err);
        }
    }
    );
}