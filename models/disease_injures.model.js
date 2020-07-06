const mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId
var diseaseInjuresSchema = mongoose.Schema({
    resourceType : {
        type: String,
        default: null
    },//diseaseInjures
    identifier : {
        type: String,
        default: null
    },  // Identifiers assigned to this order
    records : {
        //Reference(records)
        type: ObjectId,
        ref: 'Record'
    }, 
    patient : {
        //Reference(Patient)
        type: ObjectId,
        ref: 'Patient'
    },
    status : {
        type: String,
        default: null
    },//<code>, //active | completed | expired
    occurrenceTiming : {
        type: String,
        default: null
    },//{ Timing },
    description : {
        type: String,
        default: null
    },
    images:[{
        type: ObjectId,
        ref: 'Image_study'
    }],
})

module.exports=mongoose.model('Disease_injures',diseaseInjuresSchema);