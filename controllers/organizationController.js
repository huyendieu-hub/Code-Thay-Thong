const express = require('express');
const mongoose = require('mongoose');
const Organization = mongoose.model('Organization');

exports.listOrganization = function(req, res) {
    return Organization.find((err,docs)=>{
        if (!err) {
            res.render("organization/index", {
                title: 'Organization',
                list: docs,
                organizationSlideBarActive: true,
            });
        } else {
            console.log('Error in retrieving user list :' + err);
        }
    }
    );
}

exports.OrganizationSave = function(req, res) {
    var organization = new Organization();
    organization.resourceType = "Organization";
    organization.identifier = req.body.identifier;
    //         organization.active = req.body.active;
    organization.type = req.body.type;
    organization.name = req.body.name;
    organization.telecome = req.body.telecom;
    //         organization.telecom = {
    //             telecom: req.body.telecom,

    //         };
    organization.address = req.body.address;
    organization.alias = req.body.alias;
    organization.partOf = req.body.partOf;
    /*organization.contact = {
        purpose: req.body.purpose,
        name: req.body.name,
        telecom: req.body.telecom,
        address: req.body.address
    };
    organization.endpoint = req.body.endpoint
    for (var i = 0; i < 3; i++) {
        organization.telecom[i] = {
            telecom: req.body.telecom,
        }
    }*/

    organization.save((err,doc)=>{
        if (!err)
            res.redirect('/organization/');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("create_edit", {
                    viewTitle: 'Organization',
                    organization: req.body
                });
            } else
                console.log('Error during record insertion : ' + err);
        }
    }
    );
}
//với mảng sử dụng $elemMatch
exports.OrganizationFindListObject = function(req, res, next) {
    params = req.body;
    Organization.findOne({
        contact: {
            purpose: params.purpose,
            name: params.name,
            telecom: params.telecom,
            address: params.address
        }
    }).exec(function(err, organization) {
        console.log(organization);
        if (err) {
            return callback(err)
        } else if (!organization) {
            var err = new Error('User not found.');
            console.log('User not found');
            err.status = 401;
            return callback(err);
        } else if (!err) {
            res.redirect('/accounts/login');
        }
    });
}
exports.OrganizationFindArrayListObject = function(req, res, next) {
    params = req.body;
    Organization.findOne({
        contact: {
            purpose: params.purpose,
            nameame: params.name,
            telecom: params.telecom,
            address: params.address
        }
    }).exec(function(err, organization) {
        console.log(organization);
        if (err) {
            return callback(err)
        } else if (!organization) {
            var err = new Error('User not found.');
            console.log('User not found');
            err.status = 401;
            return callback(err);
        } else if (!err) {
            res.redirect('/accounts/login');
        }
    });
}
exports.OrganizationFind = function(req, res, next) {
    params = req.body;
    Organization.findOne({
        name: params.name
    }).exec(function(err, organization) {
        console.log(organization);
        if (err) {
            return callback(err)
        } else if (!organization) {
            var err = new Error('User not found.');
            console.log('User not found');
            err.status = 401;
            return callback(err);
        } else if (!err) {
            res.redirect('/accounts/login');
        }
    });

}
exports.editOrganization = function(req, res) {
    Organization.findById(req.params.id, (err,doc)=>{
        if (!err) {

            res.render("organization/create_edit", {
                title: "Edit Organization",
                isEdit: true,
                organization: doc
            });
        }
    }
    );
}
;

exports.deleteRecord = function(req, res) {
    Organization.findByIdAndRemove(req.params.id, (err,doc)=>{
        if (!err) {
            res.redirect('/organization/');
        } else {
            console.log('Error in user delete :' + err);
        }
    }
    );
}
exports.updateRecord = function updateRecord(req, res) {
    Organization.findOneAndUpdate({
        _id: req.body._id
    }, req.body, {
        runValidators: true
    }, function(err, doc) {
        if (!err) {
            doc.contact.purpose = req.body.purpose,
            doc.contact.name = req.body.name,
            doc.contact.telecom = req.body.telecom,
            //             doc.contact.address = req. body.address,
            doc.save();
            console.log(doc);
            res.redirect('/organization/');

        } else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);

                console.log(req.body)

                res.render("organization/create_edit", {
                    viewTitle: 'Update Organization',
                    organization: req.body,
                    isEdit: true,
                });
            } else
                console.log('Error during record update : ' + err);
        }
    });
}

exports.insertRecord = function(req, res, next) {
    var organization = new Organization();
    organization.resourceType = "Organization";
    organization.identifier = req.body.identifier;
    //         organization.active = req.body.active;
    organization.type = req.body.type;
    organization.name = req.body.name;
    //         organization.telecom=req.body.telecom;
    organization.address = req.body.address;
    organization.alias = req.body.alias;
    organization.partOf = req.body.partOf;
    organization.contact = {
        purpose: req.body.purpose,
        name: req.body.name,
        telecom: req.body.telecom,
        address: req.body.address
    };
    organization.endpoint = req.body.endpoint
    /*for (var i = 0; i < 3; i++) {
        organization.telecom[i] = {
            telecom: req.body.telecom,
        }
    }*/
    organization.telecom = req.body.telecom;

    organization.save((err,doc)=>{
        if (!err) {
            //  console.log(doc);
            return res.redirect('/organization/list');
            //list
        } else {
            console.log(err)
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("organization/create_edit", {
                    viewTitle: 'organization',
                    organization: req.body
                });
                console.log(req.body)
            } else{
                console.log('Error during record insertion : ' + err);
            }   
        }
    });

}
exports.NewOrganization = function(req, res, next) {
    res.render("organization/create_edit", {
        title: "Edit Organization",
        isEdit: false,
    });
}

function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
        case 'name':
            body['NameError'] = err.errors[field].message;
            break;
        case 'address':
            body['AddressError'] = err.errors[field].message;
            break;
        case 'telecom':
            body['TelecomError'] = err.errors[field].message;
            break;
        case 'identifier':
            body['IdentifierError'] = err.errors[field].message;
            break;
        default:
            break;
        }
    }
}
