const mongoose = require('mongoose');
var referenceSchema = new mongoose.Schema({
    reference:{
        type: String,
    },
    identifier:{
        type: String,
    },
    display:{
        type: String,
    },
});
mongoose.model('Reference',referenceSchema);