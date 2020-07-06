const express = require('express');
const mongoose = require('mongoose');
const Doctor = mongoose.model('Practitioner');

exports.listDoctors = function(req, res) {
     return Doctor.find((err, docs) => {
        if (!err) {
            res.render("doctors/index", {
                title: 'List Doctors',
                list: docs
            });
        }
        else {
            console.log('Error in retrieving user list :' + err);
        }
    });
}