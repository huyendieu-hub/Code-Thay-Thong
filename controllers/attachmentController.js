const mongoose = require ('mongoose');
const express = require ('express');
const Attachment = mongoose.model('Attachment')
exports.listAttachment = function(req, res) {
    return Attachment.find(function(err,docs){
        if(!err){
            res.render('./attachment/index',{
                title : 'list attachment' ,
                list : docs,
                attachmentSlideBarActive: true,           
            })
        }
         else {
            console.log('Error in retrieving user list :' + err);
        }
    });
}


exports.AttachmentSave = function(req, res){
        var attachment = new Attachment();       
        attachment.contentType = req.body.contentType;
        attachment.language  =req.body.language;
        attachment.data = req.body.data;
        attachment.url = req.body.url;
        attachment.size=req.body.size;
        attachment.hash=req.body.hash;
        attachment.title=req.body.title;
        attachment.creation=req.body.creation;
        attachment.save((err, doc) => {
            if (!err)
                    console.log(doc)
            else {
                if (err.name == 'ValidationError') {
                    handleValidationError(err, req.body);
                    res.render("create_edit", {
                        viewTitle: 'Attachment',
                        attachment : req.body
                    });
                }
                else
                    console.log('Error during record insertion : ' + err);
            }
        });
}


exports.editAttachment = function(req, res){
    Attachment.findById(req.params.id, (err, doc) => {
        if (!err) {

            res.render("attachment/create_edit", {
                title: "Edit Attachment",
                isEdit: true,
                attachment: doc
            });
        }
    });
}


exports.deleteRecord = function(req, res){
    Attachment.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/attachment/list');
        }
       else { console.log('Error in user delete :' + err); }
    });
}
exports.updateRecord = function updateRecord(req, res) {       
    Attachment.findOneAndUpdate({ _id: req.body._id }, req.body  , { runValidators: true }, 
    function(err, doc) {
        if (!err) { 
            doc.contentType = req.body.contentType;
            doc.save();
            console.log(doc);
            res.redirect('/attachment/list');
             }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                console.log(req.body)
                res.render("attachment/create_edit", {
                    viewTitle: 'Update Attachment',
                    attachment: req.body,
                    isEdit:true,
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}

exports.insertRecord = function(req, res, next) {  
        var attachment = new Attachment();       
        attachment.contentType = req.body.contentType;
        attachment.language  = req.body.language;
        attachment.data = req.body.data;
        attachment.url = req.body.url;
        attachment.size=req.body.size;
        attachment.hash=req.body.hash;
        attachment.title=req.body.title;
        attachment.creation=req.body.creation;
        attachment.save((err, doc) => {
            if (!err){
               console.log(doc);
                return res.redirect('/attachment/list');//list
            }
            else {
                console.log(err)
                if (err.name == 'ValidationError') {
                    handleValidationError(err, req.body);
                    res.render("attachment/create_edit", {
                        viewTitle: 'Attachment',
                        attachment : req.body
                    });
                    console.log(req.body)
                }
                else
                    console.log('Error during record insertion : ' + err);
            }
        });

    }
exports.NewAttachment = function(req,res,next){       
            res.render("attachment/create_edit", {
                title: "Edit Attachment",
                isEdit: false,                
            });
        }


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'contentType':
                body['ontentTypeError'] = err.errors[field].message;
                break;
            case 'creation':
                body['CreationError'] = err.errors[field].message;
                break;
            case 'hash':
                body['HashError'] = err.errors[field].message;
                break;
            case 'language':
                body['languageError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}
