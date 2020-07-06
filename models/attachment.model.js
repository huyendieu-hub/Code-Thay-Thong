const mongoose = require('mongoose');
var attachmentSchema = new mongoose.Schema({
    contentType: {
        type: String,
    },
    language: {
        type: String,
    },
    data: {
        type: String,
    },
    url: {
        type: String,
    },
    size: {
        type: String,
    },
    hash: {
        type: String,
    },
    title: {
        type: String,
    },
    creation: {
        type: Date,
    }
});
mongoose.model('Attachment',attachmentSchema);