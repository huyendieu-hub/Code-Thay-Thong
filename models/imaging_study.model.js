const mongoose = require('mongoose');
var imaging_studySchema = new mongoose.Schema({
    resourceType:{
        type: String,
        default: 'imaging_study'
    },
    uid :{
        type: String,
    },
    disease_injures: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Disease_injures'
    },
    diagnose_machine: {
        type: Object,
    },
    disease_selected: {
        type: String  
    },
    accession:{
        type: String,
    },
    identifier:{
        type: String,
    },
    availability:{
        type: String,
    },
    modalityList:{
        type: String,
    },
    patient:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient'
        //type: String,
    },
    context:{
        type: String,
    },
    started:{
        type: Date,
    },
    basedOn:{
        type: String,
    },
    referrer:{
        type: String,
    },
    interpreter:{
        type: String,
    },
    endpoint:{
        type: String,
    },
    numberOfSeries:{
        type: String,
    },
    numberOfInstances:{
        type: String,
    },
    procedureReference:{
        type: String,
    },
    procedureCode:{
        type: String,
    },
    reason:{
        type: String,
    },
    description:{
        type: String,
    },
    series:[{
        uid:{
            type: String,
        },
        number:{
            type: String,
        },
        modality:{
            type: String,
        },
        description:{
            type: String,
        },
        numberOfInstances:{
            type: String,
        },
        availability:{
            type: String,
        },
        endpoint:{
            type: String,
        },
        bodySite:{
            type : String,
        },
        laterality:{
            type: String,
        },
        started:{
            type: Date,
        },
        performer:{
            type: String,
        },
        instance: [{
            uid:{
                type: String,
            },
            number:{
                type: String,
            },
            sopClass:{
                type: String,
            },
            title:{
                type: String,
            },
        }],

    }],
});
mongoose.model('Imaging_study',imaging_studySchema);