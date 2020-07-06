const mongoose = require('mongoose');
var librarySchema = new mongoose.Schema({
    resourceType:{
        type : String,
    },
    url:{
        type: String,
    },
    identifier:{
        type: String,
    },
    version:{
        type: String,
    },
    name:{
        type: String,
    },
    title:{
        type: String,
    },
    status:{
        type: String,
    },
    experimental:{
        type: Boolean,
    },
    type:{
        type: String,
    },
    date:{
        type: Date,
    },
    publisher:{
        type: String,
    },
    description:{
        type: String,
    },
    purpose:{
        type: String,
    },
    usage:{
        type: String,
    },
    approvalDate:{
        type: String,
    },
    lastReviewDate:{
        type: String,
    },
    effectivePeriod:{
        type: String,
    },
    useContext:{
        type: String,
    },
    jurisdiction:{
        type: String,
    },
    topic:{
        type: String,
    },
    contributor:{
        type: String,
    },
    contact:{
        type: String,
    },
    copyright:{
        type: String,
    },
    relatedArtifact:{
        type: String,
    },
    parameter:{
        type: String,
    },
    dataRequirement:{
        type: String,
    },
    content:{
        type: String,
    },
});
mongoose.model('Library',librarySchema)