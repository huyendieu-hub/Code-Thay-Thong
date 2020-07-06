const mongoose = require('mongoose');
var friend_listSchema = new mongoose.Schema({
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
mongoose.model('Friend_list',friend_listSchema);