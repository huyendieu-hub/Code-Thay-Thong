const mongoose = require('mongoose');
var detected_issueSchema =  new mongoose.Schema({
    resourceType: {
        type : String,
    },
    identifier: {
        type: String,
    },
    status: {
        type: String,
    },
    category: {
        type: String,
    },
    severity: {
        type: String,
    },
    patient: {
        type: String,
    },
    date: {
        type: Date,
    },
    author: {
        type: String,
    },
    implicated: {
        type: String, 
    },
    detail: {
        type: String,
    },
    reference: {
        type: String,
    },
    mitigation: [{
        action :{
            type: String,
        },
        date :{
            type: Date,
        },
        author:{
            type: String,
        },
    }]
});
mongoose.model('Detected_issue',detected_issueSchema);