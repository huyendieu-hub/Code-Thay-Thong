const mongoose = require('mongoose');
var scheduleSchema = new mongoose.Schema({
    resourceType:{
        type: String,
    },
    identifier:{
        type: String,
    },
    active:{
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
    actor:{
        type: String,
    },
    planningHorizon:{
        type: String,
    },
    comment:{
        type: String,
    },
});
mongoose.model('Schedule',scheduleSchema);