const mongoose = require('mongoose');
var guidance_responseSchema = new mongoose.Schema({
    resourceType:{
        type : String,
    },
    requestId:{
        type: String,
    },
    identifier:{
        type: String,
    },
    module:{
        type: String,
    },
    status:{
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
    performer:{
        type: String,
    },
    reasonCodeableConcept:{
        type: String,
    },
    reasonReference:{
        type: String,
    },
    note:{
        type: String,
    },
    evaluationMessage:{
        type: String,
    },
    outputParameters:{
        type: String,
    },
    result:{
        type: String,
    },
    dataRequirement:{
        type: String,
    },
});
mongoose.model('Guidance_response',guidance_responseSchema);