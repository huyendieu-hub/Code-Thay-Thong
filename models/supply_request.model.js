const mongoose = require('mongoose');
var supply_requestSchema = new mongoose.Schema({
    resourceType:{
        type: String,
    },
    identifier:{
        type: String,
    },
    status:{
        type: String,
    },
    category:{
        type: String,
    },
    priority:{
        type: String,
    },
    orderedItem:{
        quantity:{
            type: String,
        },
        itemCodeableConcept:{
            type: String,
        },
        itemReference:{
            type: String,
        },
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
        type:Date,
    },
    requester:{
        agent:{
            type: String,
        },
        onBehalfOf:{
            type: String,
        },
    },
    supplier:{
        type: String,
    },
    reasonCodeableConcept:{
        type: String,
    },
    reasonReference:{
        type: String,
    },
    deliverFrom:{
        type: String,
    },
    deliverTo:{
        type: String,
    },
});
mongoose.model('Supply_request',supply_requestSchema);