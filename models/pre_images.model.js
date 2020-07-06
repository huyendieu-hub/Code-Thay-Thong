const mongoose = require('mongoose');
var imagesSchema = new mongoose.Schema({
    resourceType:{
        type: String,
        default: 'Images'
    },
    identifier:{
       type: String, //id 
       //required :
    },
    pre_diagnose_request : { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PreDiagnoseRequests'
        //Reference(pre_diagnose_request) 
    }, 
    path: {
        type: String
    },
    /*images: [{ // Each study has one or more images
        id_number: {// Numeric identifier of this image
            type: Number
        },
        description: {
            type: String
        }, // (không làm luôn)
        path: {
            type: String
        } 
    }],*/
    note:{// Comments  (không làm luôn)
        type: String
    }
});

mongoose.model('PreImages', imagesSchema);