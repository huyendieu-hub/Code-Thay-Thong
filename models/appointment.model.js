const mongoose = require('mongoose')
var appointmentSchema = new mongoose.Schema({
    resourceType:{
        type : String,
    },
    identifier:{
        type : String,
    },
    status:{
        type: String,
    },
    serviceCategory:{
        type: String,
    },
    serviceType:{
        type: String,
    },
    specialty:{
        type: String,
    },
    appointmentType:{
        type: String,
    },
    reason:{
        type: String,
    },
    indication:{
        type: String,
    },
    priority:{
        type: String,
    },
    description:{
        type: String,
    },
    supportingInformation:{
        type: String,
    },
    start:{
        type: String,
    },
    end:{
        type: String,
    },
//     a : [{
//         start:{
//         type: Boolean,
//     },
//         end:{
//         type: Boolean,
//     },
//     }],
    minutesDuration:{
        type: String,
    },
    slot:{
        type: String,
    },
    created:{
        type: Date,
    },
    comment:{
        type: String,
    },
    incomingReferral:{
        type: String,
    },
    participant:[{
        type:{
            type: String,
        },
        actor:{
            type: String,
        },
        required : {
            type: String,
        },
        status:{
            type: String,
        },
    }],
    requestedPeriod:{
        type:String,
    }
});
mongoose.model('Appointment',appointmentSchema);