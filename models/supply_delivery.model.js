const mongoose = require('mongoose');
var supply_deliverySchema = new mongoose.Schema({
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
    status:{
        type: String,
    },
    patient:{
        type: String,
    },
    type:{
        type: String,
    },
    suppliedItem:{
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
    supplier:{
        type: String,
    },
    destination:{
        type: String,
    },
    receiver:{
        type: String,
    },
});
mongoose.model('Supply_delivery',supply_deliverySchema);