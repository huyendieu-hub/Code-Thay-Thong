const mongoose = require('mongoose');
var conversationSchema =  new mongoose.Schema({
    resourceType: {
        type: String,
    },
    identifier: {
        type: String, //id // code for a creator
    },
    creator: [{
        //type: String, // code for a creator
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Account'
    }],
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    active: {
        type: Boolean,
    },
    type: {
        type: String,
    },
    period: {
        type: String,
    },
    update: {
        type: Date,
    },
    participants: [{
        //// code for list of paticipants
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Account'
    }],
});
mongoose.model('Conversation',conversationSchema);