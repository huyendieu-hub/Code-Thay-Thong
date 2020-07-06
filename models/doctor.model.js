const mongoose = require('mongoose');

var doctorSchema = new mongoose.Schema({
   name: {
        type: String,
        required: 'this field is required'
   },
   degree: {
           type: String
   },
   department: {
           type: String
   }
});
mongoose.model('Doctor', doctorSchema);