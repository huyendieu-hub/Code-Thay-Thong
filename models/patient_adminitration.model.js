const mongoose = require('mongoose');
require ('../models/patient.model');
var patient_adminitrationSchema = new mongoose.Schema({
    resourceType:{
        type: String,
    },
    identifier:{
        type: String,
    },
    patient:[{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Patient' 
    }],
    comingTime:{
        type: Date,
    },
    arrivedDepartment:{
        type: String,
    },
    comingFrom:{
        type: String,
    },
    rescueNumber:{
        type: String,
    },
    departmentComingTime:{
        type: Date,
    },
    departmentChanges:{
        type: String,
    },
    movingOrganization:{
        organization:{
            type: String,
        },
        level:{
          type: String,  
        },
    },
    leaving:{
        leavingTime:{
            type: Date,
        },
        leavingStatus:{
            type: String, //true, false
        },
    },
    stayingNumber:{
        type: String,
    },
});
mongoose.model('Patient_adminitration',patient_adminitrationSchema);