const mongoose = require('mongoose');
var conditionSchema = new mongoose.Schema({
    resourceType:{
        type: String,
    },
    identifier:{
        type: String,
    },
    clinicalStatus:{
        type: String,
    },
    verificationStatus:{
        type: String,
    },
    category:{
        type: String,
    },
    severity:{
        type: String,
    },
    code:{
        type: String,
    },
    bodySite:{
        type: String,
    },
    subject:{
        type: String,
    },
    context:{
        type: String,
    },
    onsetDateTime:{
        type: Date,
    },
    onsetAge:{
        type: String,
    },
    onsetPeriod:{
        type: String,
    },
    onsetRange:{
        type: String,
    },
    onsetString:{
        type: String,
    },
    abatementDateTime:{
        type: Date,
    },
    abatementAge:{
        type: String,
    },
    abatementBoolean:{
        type: Boolean,
    },
    abatementPeriod:{
        type: String,
    },
    abatementRange:{
        type: String,
    },
    abatementString:{
        type: String,
    },
    assertedDate:{
        type: Date,
    },
    asserter:{
        type: String,
    },
    stage:{
        summary:{
            type: String,
        },
        assessment: {
            type: String,
        }
    },
    evidence : [{
        code : {
            type: String,
        },
        detail: {
            type: String,
        },
    }],
    note : {
        type: String,
    },
});
mongoose.model('Condition',conditionSchema);