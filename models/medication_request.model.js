const mongoose = require('mongoose');
var medication_requestSchema = new mongoose.Schema({
    resourceType:{
        type : String,
    },
    identifier:{
        type: String,
    },
    definition:{
        type: String,
    },
    basedOn:{
        type: String,
    },
    groupIdentifier:{
        type: String,
    },
    status:{
        type: String,
    },
    intent:{
        type: String,
    },
    category:{
        type: String,
    },
    priority:{
        type: String,
    },
    medicationCodeableConcept:{
        type: String,
    },
    medicationReference:{
        type: String,
    },
    subject:{
        type: String,
    },
    context:{
        type: String,        
    },
    supportingInformation:{
        type: String,
    },
    authoredOn:{
        type: Date,
    },
    requester:{
        agent:{
          type: String,  
        },
        onBehalfOf: {
          type: String,  
        },
    },
    recorder:{
        type: String,
    },
    reasonCode:{
        type: String,
    },
    reasonReference:{
        type: String,
    },
    note:{
        type: String,
    },
    dosageInstruction:{
        type: String,
    },
    dispenseRequest:{
        validityPeriod:{
            type: String,
        },
        numberOfRepeatsAllowed:{
            type: String,
        },
        quantity:{
            type: String,
        },
        expectedSupplyDuration:{
            type: String,
        },
        performer:{
            type: String,
        },
    },
    substitution:{
        allowed:{
            type: Boolean,
        },
        reason:{
            type: String,
        },
    },
    priorPrescription:{
        type: String,
    },
    detectedIssue:{
        type: String,
    },
    eventHistory:{
        type: String,
    },
});
mongoose.model('Medication_request',medication_requestSchema);