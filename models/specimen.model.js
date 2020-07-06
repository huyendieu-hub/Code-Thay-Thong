const mongoose = require('mongoose');
var specimenSchema = new mongoose.Schema({
    resourceType:{
        type: String,
    },
    identifier:{
        type: String,
    },
    accessionIdentifier:{
        type: String,
    },
    status:{
        type: String,
    },
    type:{
        type: String,
    },
    subject:{
        type: String,
    },
    receivedTime:{
        type:Date,
    },
    parent:{
        type: String,
    },
    request:{
        type: String,
    },
    collection:{
        collector:{
            type: String,
        },
        collectedDateTime:{
            type: Date,
        },
        collectedPeriod:{
            type: String,
        },
        quantity:{
            type: String,
        },
        method:{
            type: String,
        },
        bodySite:{
            type: String,
        },
    },
    processing:[{
        description:{
            type: String,
        },
        procedure:{
            type: String,
        },
        additive:{
            type: String,
        },
        timeDateTime:{
            type: Date,
        },
        timePeriod:{
            type: String,
        },
    }],
    container:[{
        identifier:{
            type: String,
        },
        description:{
            type: String,
        },
        type:{
            type: String,
        },
        capacit:{
            type: String,
        },
        specimenQuantity:{
            type: String,
        },
        additiveCodeableConcept:{
            type: String,
        },
        additiveReference:{
            type: String,
        },
    }],
    note:{
        type: String,
    },
});
mongoose.model('Specimen',specimenSchema);