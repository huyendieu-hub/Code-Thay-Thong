const express =require ('express');
const mongoose = require ('mongoose');
const Address = mongoose.model ('Address');
exports.listAddress = function(req, res) {
    return Address.find(function(err,docs){
        if(!err){
            res.render('./address/index',{
                title : 'list address' ,
                list : docs,
                addressSlideBarActive: true,           
            })
        }
         else {
            console.log('Error in retrieving user list :' + err);
        }
    });
}


exports.AddressSave = function(req, res){
        var address = new Address();       
        address.resourceType = "Address";
        address.use  =req.body.use;
        address.type = req.body.type;
        address.text = req.body.text;
        address.line=req.body.line;
        address.city=req.body.city;
        address.district=req.body.district;
        address.state=req.body.state;
        address.postalCode = req.body.postalCode;
        address.country = req.body.country;
        address.period =req.body.period
        address.save((err, doc) => {
            if (!err)
                    console.log(doc)
            else {
                if (err.name == 'ValidationError') {
                    handleValidationError(err, req.body);
                    res.render("create_edit", {
                        viewTitle: 'Address',
                        address : req.body
                    });
                }
                else
                    console.log('Error during record insertion : ' + err);
            }
        });
}

exportsAddressFind = function(req,res,next){
    params = req.body;
    Address.findOne({ use : params.use}) 
    .exec(function(err,address){
        console.log(address);
          if (err) {
            return callback(err)
          } else if (!address) {
            var err = new Error('User not found.');
            console.log('User not found');
            err.status = 401;
            return callback(err);
          }else if (!err){
                res.redirect('/accounts/login');
          }
    });

}
exports.editAddress = function(req, res){
    Address.findById(req.params.id, (err, doc) => {
        if (!err) {

            res.render("address/create_edit", {
                title: "Edit Address",
                isEdit: true,
                address: doc
            });
        }
    });
}


exports.deleteRecord = function(req, res){
    Address.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/address/list');
        }
       else { console.log('Error in user delete :' + err); }
    });
}
exports.updateRecord = function updateRecord(req, res) {       
    Address.findOneAndUpdate({ _id: req.body._id }, req.body  , { runValidators: true }, 
    function(err, doc) {
        if (!err) { 
            doc.city = req.body.city,
            doc.district = req.body.district,
            doc.state = req.body.state,
            doc.postalCode = req.body.postalCode,
            doc.country = req. body.country,
            doc.save();
            console.log(doc);
            res.redirect('/address/list');

            
             }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);

                console.log(req.body)

                res.render("address/create_edit", {
                    viewTitle: 'Update Address',
                    address: req.body,
                    isEdit:true,
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}

exports.insertRecord = function(req, res, next) {  
        var address = new Address();       
         address.resourceType = "Address";
        address.use  =req.body.use;
        address.type = req.body.type;
        address.text = req.body.text;
        address.line=req.body.line;
        address.city=req.body.city;
        address.district=req.body.district;
        address.state=req.body.state;
        address.postalCode = req.body.postalCode;
        address.country = req.body.country;
        address.period =req.body.period
        
        address.save((err, doc) => {
            if (!err){
               console.log(doc);
                return res.redirect('/address/list');//list
            }
            
            else {
                console.log(err)
                if (err.name == 'ValidationError') {
                    handleValidationError(err, req.body);
                    res.render("address/create_edit", {
                        viewTitle: 'address',
                        address : req.body
                    });
                    console.log(req.body)
                }
                else
                    console.log('Error during record insertion : ' + err);
            }
        });

    }
exports.NewAddress = function(req,res,next){       
            res.render("address/create_edit", {
                title: "Edit Address",
                isEdit: false,                
            });
        }


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'use':
                body['UseError'] = err.errors[field].message;
                break;
            case 'city':
                body['CityError'] = err.errors[field].message;
                break;
            case 'country':
                body['CountryError'] = err.errors[field].message;
                break;
            case 'state':
                body['StateError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}
