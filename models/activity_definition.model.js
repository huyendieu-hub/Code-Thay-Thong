const mongoose = require('mongoose');
var activity_definitionSchema = mongoose.Schema({
    resourceType: {
        type: String,
    },
    url: {
        type: String,
    },
    identifier: {
        type: String,
    },
    version: {
        type: String,
    },
    name:{
        type: String,
//         required: 'this field is required'
    },
    title:{
        type: String,
    },
    status:{
        type: String,
    },
    experimental:{
        type: String,
//         type: Boolean,
    },
    date:{
        type: String,
//         type: Date,
    },
    publisher:{
        type: String,
//         required: 'this field is required'
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
//         type: Date,
    },
    lastReviewDate:{
        type: String,
//         type: Date,
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
    library:{
        type: String,
    },
    kind:{
        type: String,
    },
    code:{
        type: String,
    },
    timingTiming:{
        type: String,
    },
    timingDateTime:{
        type: String,
//         type: Date,
    },
    timingPeriod:{
        type: String,
    },
    timingRange:{
        type: String,
    },
    location:{
        type: String,
    },
    participant: [{
           type: {
              type: String, 
           } ,
           role :{
              type: String,
           },    
    }],   
    productReference:{
        type: String,
    },
    productCodeableConcept:{
        type: String,
    },
    quantity:{
        type: String,
    },
    dosage:{
        type: String,
    },
    bodySite:{
        type: String,
    },
    transform:{
        type: String,
    },
    dynamicValue:[{
        description:{
           type: String,
        },
        path:{
           type: String,
        },
        language: {
           type: String,
        },
        expression: {
           type: String,
        },         
    }],

});
mongoose.model('Activitydefinition',activity_definitionSchema);