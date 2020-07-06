const mongoose = require('mongoose');
var friend_request_listSchema = new mongoose.Schema({
    resourceType:{
        type: String,
    },
    id:{
        type: String,
    },
    period:{
        type: String,
    },
    update:{
        type: Date,
    },
    connectors:{
        type: String,
    },
});
mongoose.model('Friend_request_list',friend_request_listSchema);