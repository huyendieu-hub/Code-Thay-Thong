const mongoose = require('mongoose');
var device_use_statementSchema = new mongoose.Shema({
    resourceType:{
        type : String,
    },
    identifier:{
        type: String,
    },
    status:{
        type: String,
    },
    subject:{
        type: String,
    },
    timingTiming:{
        type: String,
    },
    timingPeriod:{
        type: String,
    },
    timingDateTime:{
        type: Date,
    },
    recordedOn:{
        type: Date,
    },
    source:{
        type: String,
    },
    device:{
        type: String,
    },
    indication:{
        type: String,
    },
    bodySite:{
        type: String,
    },
    note:{
        type: String,
    },
});
mongoose.model('Device_use_statement',device_use_statementSchema);