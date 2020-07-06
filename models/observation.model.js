const mongoose = require('mongoose');
var observationSchema = new mongoose.Schema({
    resourceType:{
        type: String,
    },
    identifier:{
        type: String,
    },
    basedOn:{
        type: String,
    },
    status:{
        type: String,
    },
    category:{
        type: String,
    },
    code:{
        type: String,
    },
    subject:{
        type; String,
    },
    context:{
        type: String,
    },
    effectiveDateTime:{
        type: Date,
    },
    effectivePeriod:{
        type: String,
    },
    issued:{
        type: String,
    },
    performer:{
        type: String,
    },
    valueQuantity:{
        type: String,
    },
    valueCodeableConcept:{
        type: String,
    },
    valueString:{
        type: String,
    },
    valueBoolean:{
        type: Boolean,
    },
    valueRange:{
        type: String,
    },
    valueRatio:{
        type: String,
    },
    valueSampledData:{
        type: String,
    },
    valueAttachment:{
        type :String,
    },
    valueTime:{
        type: String,
    },
    valueDateTime:{
        type: Date,
    },
    valuePeriod:{
        type: String,
    },
    dataAbsentReason:{
        type: String,
    },
    interpretation:{
        type: String,
    },
    comment:{
        type: String,
    },
    bodySite:{
        type :String,
    },
    method:{
        type: String,
    },
    specimen:{
        type: String,
    },
    device:{
        type: String,
    },
    referenceRange:[{
        low:{
            type: String,
        },
        high:{
            type: String,
        },
        type:{
            type: String,
        },
        appliesTo:{
            type: String,
        },
        age:{
            type: String,
        },
        text:{
            type :String,
        },
    }],
    related:[{
        type:{
            type: String,
        },
        target:{
            type: String,
        },
    }],
    component:[{
        code:{
            type: String,
        },
        valueQuantity:{
            type: String,
        },
        valueCodeableConcept:{
            type: String,
        },
        valueString:{
            type: String,
        },
        valueRange:{
            type: String,
        },
        valueRatio:{
            type: String,
        },
        valueSampledData:{
            type: String,
        },
        valueAttachment:{
            type: String,
        },
        valueTime:{
            type: String,
        },
        valueDateTime:{
            type: Date,
        },
        valuePeriod:{
            type: String,
        },
        dataAbsentReason:{
            type; String,
        },
        interpretation:{
            type: String,
        },
        referenceRange:{
            type: String,
        },
    }],
});

mongoose.model('Observation', observationSchema);