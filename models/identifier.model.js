const mongoose = require('mongoose');
var identifierSChema = new mongoose.Schema({
     use:{
        type :String,
     },
     type:{
        type :String,
     },
     system:{
        type :String,
     },
     value:{
        type : String,
     },
     period:{
        type : Date,
     },
     assigner:{
        type :String,
     },
});
mongoose.model('Identifier', identifierSChema);