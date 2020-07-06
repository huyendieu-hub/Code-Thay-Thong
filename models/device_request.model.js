const mongoose = requrie('mongoose');
var device_requestSchema = new mongoose.Schema({
    resourceType:{
        type: String,
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
    priorRequest:{
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
    priority:{
        type: String,
    },
    codeReference:{
        type: String,
    },
    codeCodeableConcept:{
        type: String,
    },
    subject:{
        type: String,
    },
    context:{
        type: String,
    },
    occurrenceDateTime:{
        type: Date,
    },
    occurrencePeriod:{
        type: String,
    },
    occurrenceTiming:{
        type: String,
    },
    authoredOn:{
        type: Date,
    },
    requester:{
        agent:{
          type: String,  
        },
        onBehalfOf:{
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
    note:{
        type: String,
    },
    relevantHistory:{
        type: String,
    },
});
mongoose.model('Device_request',device_requestSchema);