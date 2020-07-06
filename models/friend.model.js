const mongoose = require('mongoose');
var friendSchema = new mongoose.Schema({
    resourceType: {
        type : String,
    },
    id: {
        type: String,
    },
    connector: {
        type : String,
    },
    type: {
        type: String,
    },
    status: {
        type: String,
    },
});
mongoose.model('Friend',friendSchema);