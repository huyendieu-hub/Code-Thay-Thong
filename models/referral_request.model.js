const mongoose = require('mongoose');
var referral_requestSchema = new mongoose.Schema({
    resourceType:{
        type : String,
    },
    identifier:{
        type : String,
    },
    definition:{
        type : String,
    },
    basedOn:{
        type : String,
    },
    replaces:{
        type : String,
    },
    groupIdentifier:{
        type : String,
    },
    status:{
        type : Code,
    },
    intent:{
        type : Code,
    },
    type:{
        type : String,
    },
    priority:{
        type : Code,
    },
    serviceRequested:{
        type : String,
    },
    subject:{
        type : String,
    },
    context:{
        type : String,
    },
    occurrenceDateTime:{
        type : Date,
    },
    occurrencePeriod:{
        type : String,
    },
    authoredOn:{
        type : Date,
    },
    requester:{
        agent:{
            type : String,
        },
        onBehalfOf:{
            type : String,
        },
    },
    specialty:{
        type : String,
    },
    recipient:{
        type : String,
    },
    reasonCode:{
        type : String,
    },
    reasonReference:{
        type : String,
    },
    description:{
        type : String,
    },
    supportingInfo:{
        type : String,
    },
    note:{
        type : String,
    },
    relevantHistory:{
        type : String,
    },
});
mongoose.model('Referral_request',referral_requestSchema);