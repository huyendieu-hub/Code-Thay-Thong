const mongoose = require('mongoose');
var slotSchema = new mongoose.Schema({
    resourceType:{
        type: String,
    },
    identifier:{
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
    schedule:{
        type: String,
    },
    status:{
        type: String,
    },
    start:{
        type: String,
    },
    end:{
        type: String,
    },
    overbooked:{
        type: Boolean,
    },
    comment:{
        type: String,
    },
});
mongoose.model('Slot',slotSchema);