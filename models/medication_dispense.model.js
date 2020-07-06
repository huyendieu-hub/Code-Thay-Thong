const mongoose = require('mongoose');
var medication_dispenseSchema = new mongoose.Schema({
    resourceType:{
        type: String,
    },
    identifier:{
        type: String,
    },
    partOf:{
        type: String,
    },
    status:{
        type: String,
    },
    category:{
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
    performer:[{
        actor:{
            type: String,
        },
        onBehalfOf:{
            type: String,
        },
    }],
    authorizingPrescription:{
        type: String,
    },
    type:{
        type: String,
    },
    quantity:{
        type: String,
    },
    daysSupply:{
        type: String,
    },
    whenPrepared:{
        type: Date,
    },
    whenHandedOver:{
        type: Date,
    },
    destination:{
        type: String,
    },
    receiver:{
        type: String,
    },
    note:{
        type: String,
    },
    dosageInstruction:{
        type: String,
    },
    substitution:{
        wasSubstituted:{
            type: Boolean,
        },
        type:{
            type: String,
        },
        reason:{
            type: String,
        },
        responsibleParty:{
            type: String,
        },
    },
    detectedIssue:{
        type: String,
    },
    notDone:{
        type: Boolean,
    },
    notDoneReasonCodeableConcept:{
        type: String,
    },
    notDoneReasonReference:{
        type: String,
    },
    eventHistory:{
        type: String,
    },
});
mongoose.model('Medication_dispense',medication_dispenseSchema);