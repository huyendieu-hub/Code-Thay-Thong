const mongoose = require('mongoose');
require ('../models/address.model');
var locationSchema = new mongoose.Schema({
    resourceType:{
        type: String,
    },
    identifier:{
        type: String,
        required: 'this field is required'
    },
    status:{
        type: String,
    },
    operationalStatus:{
        type: String,
    },
    name:{
        type: String,
        required: 'this field is required'
    },
    alias:{
        type: String,
    },
    description:{
        type: String,
    },
    mode:{
        type: String,
    },
    type:{
        type: String,
    },
    telecom:{
        type: String,
        required: 'this field is required'
    },
    address:[{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Address'
    }],
    physicalType:{
        type: String,
    },
    position:[{
        longitude:{
            type: String,
        },
        latitude:{
            type: String,
        },
        altitude:{
            type:String,
        },
    }],
    managingOrganization:{
        type: String,
    },
    partOf:{
        type: String,
    },
    endpoint:{
        type: String,
    },
});
locationSchema.path('telecom').validate((val) => {
    return /[0-9]{10,12}/.test(val); 
}, 'Invalid telecom');
mongoose.model('Location',locationSchema);