const mongoose = require('mongoose');
var connectorSchema = new mongoose.Schema ({
    resourceType:{
        type: String,
    },
    identifier:{
        type: String,
    },
    connectors:{
        type: String,
    },
    serviceType:{
        type: String,
    },
    priority:{
        type: String,
    },
    description:{
        type: String,
    },
    start:{
        type: String,
    },
    end:{
        type: String,
    },
});
mongoose.model('Connector',connectorSchema);