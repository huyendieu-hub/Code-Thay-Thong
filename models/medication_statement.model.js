const mongoose = require('mongoose');
var medication_statementSchema = new mongoose.Schema({
    resourceType:{
        type: String,
    },
    identifier:{
        type: String,
    },
    basedOn:{
        type: String,
    },
    partOf:{
        type: String,
    },
    context:{
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
    effectiveDateTime:{
        type: Date,
    },
    effectivePeriod:{
        type: String,
    },
    dateAsserted:{
        type: Date,
    },
    informationSource:{
        type: String,
    },
    subject:{
        type: String,
    },
    derivedFrom:{
        type: String,
    },
    taken:{
        type: String,
    },
    reasonNotTaken:{
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
    dosage:{
        type: String,
    },
});
mongoose.model('Medication_statement',medication_statementSchema);