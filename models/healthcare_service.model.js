require('../models/location.model');
require('../models/identifier.model')
require('../models/organization.model')
const mongoose = require('mongoose');
var healthcare_serviceSchema = new mongoose.Schema({
    resourceType:{
        type : String,
    },
    identifier:[{
//         type: mongoose.Schema.Types.ObjectId,
//         ref : 'Identifier'
        type: String,
        required:'This field is required'
    }],
    active:{
        type: Boolean,
    },
    providedBy:{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Organization'
        type: String,
    },
    category:{
        type: String,
    },
    type:{
        type: String,
    },
    specialty:{
        type: String,
    },
    location:[{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Location'
    }],
    name:{
        type: String,
        required: 'This field is required'
    },
    comment:{
        type: String,
    },
    extraDetails:{
        type: String,
    },
    photo:{
        type: String,
    },
    telecom:{
        type: String,
        required: 'This filed is required'
    },
    coverageArea:{
        type: String,
    },
    serviceProvisionCode:{
        type: String,
    },
    eligibility:{
        type: String,
    },
    eligibilityNote:{
        type: String,
    },
    programName:{
        type: String,
    },
    characteristic:{
        type: String,
    },
    referralMethod:{
        type: String,
    },
    appointmentRequired:{
        type: Boolean,
    },
    availableTime:[{
        daysOfWeek:{
            type: String,
        },
        allDay:{
            type: Boolean,
        },
        availableStartTime:{
            type: Date,
        },
        availableEndTime:{
            type: Date,
        },
    }],
    notAvailable: [{
        description:{
            type: String,
        },
        during:{
            type: String,
        },
    }],
    availabilityExceptions:{
        type:String,  
    },
    endpoint: {
        type: String,
    },
});
healthcare_serviceSchema.path('telecom').validate((val) => {
    return /[0-9]{10,12}/.test(val); 
}, 'Invalid telecom');
mongoose.model('HealthcareService',healthcare_serviceSchema);