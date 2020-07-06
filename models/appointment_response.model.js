const mongoose = require('mongoose');
require ('../models/appointment.model');
var appointment_responseSchema = new mongoose.Schema({
    resourceType: {
        type: String,
    },
    identifier: {
        type: String,
        required: 'this field is required'
    },
    appointment: [{
       type : mongoose.Schema.Types.ObjectId,
       ref : 'Appointment' 
    }], 
    start: {
        type: Date,
    },
    end: {
        type: Date,
    },
    participantType: {
        type: String,
    },
    actor: {
        type: String,
    },
    participantStatus: {
        type: String,
    },
    comment: {
        type: String,
    }
});
mongoose.model('Appointment_response',appointment_responseSchema);