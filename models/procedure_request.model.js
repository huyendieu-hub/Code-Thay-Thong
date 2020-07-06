const mongoose = require('mongoose');
var procedure_requestSchema = new mongoose.Schema({
    resourceType:{
        type: String,
        default: "procedure_request"
    },
    identifier:{
        type: String,
    },
    practitioner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Practitioner'  
    },
    patient_adinistration: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient_adminitration'
    },
    definition:{
        type: String,
    },
    basedOn:{
        type: String,
    },
    replaces:{
        type: String,
    },
    requisition:{
        type: String,
    },
    status:{
        type: String,
    },
    intent:{
        type: String,
    },
    priority:{
        type: String,
    },
    doNotPerform:{
        type:Boolean,
    },
    category:{
        type: String,
    },
    code:{
        type: String,
    },
    subject:{
        type: String,
    },
    context:{

    },
    occurrenceDateTime:{
        type:Date,
    },
    occurrencePeriod:{
        type: String,
    },
    occurrenceTiming:{
        type: String,
    },
    asNeededBoolean:{
        type:Boolean,
    },
    asNeededCodeableConcept:{
        type: String,
    },
    authoredOn:{
        type: Date,
    },
    requester:{
        agent: {
            type: String,
        },
        onBehalfOf: {
            type: String,
        },
    },
    performerType:{
        type: String,
    },
    performer:{
        type: String,
    },
    reasonCode:{
        type: String,
    },
    reasonReference:{
        type: String,
    },
    supportingInfo:{
        type: String,
    },
    specimen:{
        type: String,
    },
    bodySite:{
        type: String,
    },
    note:{
        type: String,
    },
    relevantHistory:{
        type: String,
    },
});
mongoose.model('Procedure_request', procedure_requestSchema);