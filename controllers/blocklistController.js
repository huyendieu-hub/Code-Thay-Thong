const express =require ('express');
const mongoose = require ('mongoose');
const Blocklist = mongoose.model ('Block_list');
exports.listBlocklist = function(req, res) {
    return Blocklist.find(function(err,docs){
        if(!err){
            res.render('./blocklist/index',{
                title : 'list blocklist' ,
                list : docs,
                blocklistSlideBarActive: true,           
            })
        }
         else {
            console.log('Error in retrieving user list :' + err);
        }
    });
}


exports.BlocklistSave = function(req, res){
        var blocklist = new Blocklist();       
        blocklist.resourceType = "blockList";
        blocklist.identifier  =req.body.identifier;
        blocklist.period = req.body.period;
        blocklist.update = req.body.update;
        blocklist.banUsers=req.body.banUsers;
        blocklist.save((err, doc) => {
            if (!err)
                    console.log(doc)
            else {
                if (err.name == 'ValidationError') {
                    handleValidationError(err, req.body);
                    res.render("create_edit", {
                        viewTitle: 'Blocklist',
                        blocklist : req.body
                    });
                }
                else
                    console.log('Error during record insertion : ' + err);
            }
        });
}

exports.editBlocklist = function(req, res){
    Blocklist.findById(req.params.id, (err, doc) => {
        if (!err) {

            res.render("blocklist/create_edit", {
                title: "Edit Blocklist",
                isEdit: true,
                blocklist: doc
            });
        }
    });
}


exports.deleteRecord = function(req, res){
    Blocklist.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/blocklist/list');
        }
       else { console.log('Error in user delete :' + err); }
    });
}
exports.updateRecord = function updateRecord(req, res) {       
    Blocklist.findOneAndUpdate({ _id: req.body._id }, req.body  , { runValidators: true }, 
    function(err, doc) {
        if (!err) { 
            doc.update = req.body.update,
            doc.save();
            console.log(doc);
            res.redirect('/blocklist/list');
             }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);

                console.log(req.body)

                res.render("blocklist/create_edit", {
                    viewTitle: 'Update Blocklist',
                    blocklist: req.body,
                    isEdit:true,
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}

exports.insertRecord = function(req, res, next) {  
        var blocklist = new Blocklist();       
        blocklist.resourceType = "blockList";
        blocklist.identifier  =req.body.identifier;
        blocklist.period = req.body.period;
        blocklist.update = req.body.update;
        blocklist.banUsers=req.body.banUsers;
        blocklist.save((err, doc) => {
            if (!err){
               console.log(doc);
                return res.redirect('/blocklist/list');
            }
            
            else {
                console.log(err)
                if (err.name == 'ValidationError') {
                    handleValidationError(err, req.body);
                    res.render("blocklist/create_edit", {
                        viewTitle: 'blocklist',
                        blocklist : req.body
                    });
                    console.log(req.body)
                }
                else
                    console.log('Error during record insertion : ' + err);
            }
        });

    }
exports.NewBlocklist = function(req,res,next){       
            res.render("blocklist/create_edit", {
                title: "Edit Blocklist",
                isEdit: false,                
            });
        }


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'identifier':
                body['IdentifierError'] = err.errors[field].message;
                break;
            case 'period':
                body['PeriodError'] = err.errors[field].message;
                break;
            case 'update':
                body['UpdateError'] = err.errors[field].message;
                break;
            case 'banUsers':
                body['BanUsersError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}
