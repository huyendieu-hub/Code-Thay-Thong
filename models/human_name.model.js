const mongoose = require('mongoose');
var human_nameSchema = new mongoose.Schema({
    resourceType: {
        type : String,
    },
    use: {
        type: String,
    },
    text: {
        type: String,
    },
    family: {
        type: String,
    },
    given: {
        type: String,
    },
    prefix: {
        type: String,
    },
    suffix: {
        type: String,
    },
    period: {
        type: String,
    },
});
mongoose.model('Human_name',human_nameSchema);