const mongoose = require('mongoose');
var imaging_manifestSchema = new mongoose.Schema({
    resourceType: {
        type: String,
    },
    identifier: {
        type: String,
    },
    patient: {
        type: String,
    },
    authoringTime: {
        type: Date,
    },
    author: {
        type: String,
    },
    description: {
        type: String,
    },
    study: [{
       uid :{
           type: String,
       },
       imagingStudy:{
           type: String,
       }, 
       endpoint:{
           type: String,
       },
       series:[{
           uid:{
               type: String,
           },
           endpoint:{
               type: String,
           },
           instance:[{
               sopClass:{
                   type: String,
               },
               uid:{
                   type: String,
               },
           }],
       }],
            
    }],
});
mongoose.model('Imaging_manifest',imaging_manifestSchema);