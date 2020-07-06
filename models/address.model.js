const mongoose = require('mongoose');
var addressSchema = new mongoose.Schema({
    resourceType: {
        type: String,
    },
    use:{
        type : String,
    },
    type : {
        type: String,
    },
    text:{
        type: String,
    },
    line: {
        type: String,
    },
    city:{
        type: String,
    },
    district:{
        type: String,
    },
    state:{
        type: String,
    },
    postalCode: {
        type: String,
    },
    country:{
        type: String,
    },
    period: {
        type: String
    }
});
mongoose.model('Address',addressSchema);