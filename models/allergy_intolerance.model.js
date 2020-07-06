const mongoose = require('mongoose');
var allergy_intoleranceSchema = new mongoose.Schema({
    resourceType:{
        type: String,
    },
    identifier :{
        type: String
    },
    clinicalStatus :{
        type: String,
    },
    verificationStatus:{
        type: String,
    },
    type :{
        type: String,
    },
    category :{
        type: String,
    },
    criticality :{
        type: String,
    },
    code :{
        type: String,
    },
    patient :{
        type: String,
    },
    onsetDateTime:{
//         type : Date,
            type:String,
    }, 
    onsetAge :{
        type: String,
    },
    onsetPeriod :{
        type: String,
    },
    onsetRange :{
        type: String,
    },
    onsetString :{
        type: String,
    },
    assertedDate :{
//         type: Date,
            type: String,
    },
    recorder :{
        type: String,
    },
    asserter :{
        type: String,
    },
    lastOccurrence:{
//         type: Date,
            type: String,
    }, 
    note :{
        type: String,
    },
    reaction:[{
        substance:{
            type: String,  
        },
        manifestation:{
            type:String,  
        },
        description:{
            type: String,
        },
        onset: {
//             type: Date,
                type: String,
        },
        severity: {
            type  : String,
        },
        exposureRoute:{
            type: String,
        },
        note: {
            type: String,  
        }
    }],
});
mongoose.model('Allergy_intolerance',allergy_intoleranceSchema);