const mongoose = require('mongoose');
const {records_Conclusions} = require('./record_conclusion.model.js')
var ObjectId = mongoose.Schema.Types.ObjectId

var record_ContainerSchema = new mongoose.Schema({
    resourceType : {
        type: String,
        default: 'record_container'
    },
    identifier : {
        //Identifier 
        type: String,
        default: null
    },
    patientAdminitration : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient_adminitration'
    },
    patient : {
        // Reference(Patient)
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient'
    },
    /*record:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Record'
    }],*/
    createTime : {
        type: Date
    }, // Time it is created
    status: {
        type: String,
        default: null
    }, // active| using| expired
    //records_conclusion: records_Conclusions
    records_conclusion : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Record_conclusion'
    }
});
module.exports = mongoose.model('Record_container', record_ContainerSchema);
