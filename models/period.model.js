const mongoose = require('mongoose');
var periodSchema = new mongoose.Schema({    
    start:{
        type: Date,
    },
    end:{
        type: Date,
    }
});
mongoose.model('Period',periodSchema);