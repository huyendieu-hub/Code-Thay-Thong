const mongoose = require('mongoose');
//var bcrypt = require('bcrypt');

var accessSchema = new mongoose.Schema({
    resourceType:{
        type: String,
    },
    identifier:{
       type: String, //id 
       //required :
    },
    create: {
        type: Date,
        //required: 'this field is required'
    },
    visibleStatus: {
        type: String,
    },
    device: {
        type: String,
    },
    period: {
        type: String,
    },
});

mongoose.model('Access', accessSchema);