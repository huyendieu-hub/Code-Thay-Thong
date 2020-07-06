const mongoose = require ('mongoose');
var connector_requestSchema = new mongoose.Schema ({
    resourceType : {
        type : String,
    },
    identifier : {
        type : String,
    },
    status : {
        type : String,
    },
    serviceType : {
        type : String,
    },
    reason : {
        type : String,
    },
    description : {
        type : String,
    },
    start : {
        type : String,
    },
    end : {
        type : String,
    },
    comment : {
        type : String,
    },
});
mongoose.model('Connector_request',connector_requestSchema);