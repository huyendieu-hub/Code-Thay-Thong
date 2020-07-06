const mongoose = require('mongoose');
var practitionerSchema = new mongoose.Schema({
    resourceType:{
        type : String,
    },
    identifier:{
        type: String,
    },
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'  
    },
    active:{
        type: Boolean,
    },
    name:{
        type: String,
    },
    telecom:{
        type: String,
    },
    address:{
        type: String,
    },
    gender:{
        type : String, // male | female | other | unknown
    },
    birthDate:{
        type: String,
    },
    photo:{
        type: String,
    },
    qualification: [{
        identifier:{
            type : String,
        },
        code:{
            type: String,
        },
        period:{
            type: String,
        },
        issuer:{
            type: String,
        },
    }],
    communication:{
        type: String,
    },
});
mongoose.model('Practitioner',practitionerSchema);
