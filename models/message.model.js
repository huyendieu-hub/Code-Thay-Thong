const mongoose = require('mongoose');
var messageSchema = new mongoose.Schema({
    resourceType:{
        type: String,
    },
    identifier:{
        type: String,
    },
    identifier:{
        type: Int32,
    },
    type:{
        type: String,
    },
    text:{
        type: String,
    },
    attachment:{
        type: String,
    },
    create:{
        type: Date,
    },
    deliver:{
        type: Date,
    },
    status:{
        type: String,
    },
});
mongoose.model('Message',messageSchema);