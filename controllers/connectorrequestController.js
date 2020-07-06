const express =require ('express');
const mongoose = require ('mongoose');
const ConnectorRequest = mongoose.model ('Connector_request');
exports.listConnectorRequest = function(req, res) {
    return ConnectorRequest.find(function(err,docs){
        if(!err){
            res.render('./connectorrequest/index',{
                title : 'list address' ,
                list : docs,
                connectorrequestSlideBarActive: true,           
            })
        }
         else {
            console.log('Error in retrieving user list :' + err);
        }
    });
}

exports.insertRecord = function(req, res, next) {  
        var connectorrequest = new ConnectorRequest();       
         connectorrequest.resourceType = "ConnectorRequest";
        connectorrequest.identifier  =req.body.identifier;
        connectorrequest.status = req.body.status;
        connectorrequest.serviceType = req.body.serviceType;
        connectorrequest.reason=req.body.reason;
        connectorrequest.description=req.body.description;
        connectorrequest.start=req.body.start;
        connectorrequest.end=req.body.end;
        connectorrequest.comment = req.body.comment;
        
        connectorrequest.save((err, doc) => {
            if (!err){
               console.log(doc);
                return res.redirect('/connectorrequest/list');//list
            }
            
            else {
                console.log(err)
                if (err.name == 'ValidationError') {
                    handleValidationError(err, req.body);
                    res.render("connectorrequest/create_edit", {
                        viewTitle: 'connectorrequest',
                        connectorrequest : req.body
                    });
                    console.log(req.body)
                }
                else
                    console.log('Error during record insertion : ' + err);
            }
        });

    }
exports.editConnectorRequest = function(req, res){
    ConnectorRequest.findById(req.params.id, (err, doc) => {
        if (!err) {

            res.render("connectorrequest/create_edit", {
                title: "Edit ConnectorRequest",
                isEdit: true,
                connectorrequest: doc
            });
        }
    });
}


exports.deleteRecord = function(req, res){
    ConnectorRequest.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/connectorrequest/list');
        }
        else { console.log('Error in user delete :' + err); }
    });
}
exports.updateRecord = function updateRecord(req, res) {       
    ConnectorRequest.findOneAndUpdate({ _id: req.body._id }, req.body  , { runValidators: true }, 
    function(err, doc) {
        if (!err) { 
        doc.resourceType = "ConnectorRequest";
        doc.identifier  =req.body.identifier;
        doc.status = req.body.status;
        doc.serviceType = req.body.serviceType;
        doc.reason=req.body.reason;
        doc.description=req.body.description;
        doc.start=req.body.start;
        doc.end=req.body.end;
        doc.comment = req.body.comment;
            doc.save();
            console.log(doc);
            res.redirect('/connectorrequest/list');

            
             }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);

                console.log(req.body)

                res.render("connectorrequest/create_edit", {
                    viewTitle: 'Update ConnectorRequest',
                    connectorrequest: req.body,
                    isEdit:true,
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}
exports.NewConnectorRequest = function(req,res,next){       
            res.render("connectorrequest/create_edit", {
                title: "Edit ConnectorRequest",
                isEdit: false,                
            });
        }


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'Identifier':
                body['IdentifierError'] = err.errors[field].message;
                break;
            case 'Description':
                body['DescriptionError'] = err.errors[field].message;
                break;
            case 'Start':
                body['StartError'] = err.errors[field].message;
                break;
            case 'End':
                body['EndError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}
