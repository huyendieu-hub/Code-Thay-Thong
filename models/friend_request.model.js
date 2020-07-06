const mongoose = require('mongoose');
var friend_requestSchema = new mongoose.Schema({
    resourceType: {
        type: String,
    },
    identifier: {
        type: String,
    },
    connectors: {
        type: String,
    },
    status: {
        type: String,
    },
    description: {
        type: String,
    },
    start: {
        type: String,
    },
    end: {
        type: String,
    },
    comment: {
        type: String,
    },
});
mongoose.model('Friend_request',friend_requestSchema);