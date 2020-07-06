const mongoose = require('mongoose');
var diagnostic_reportSchema = new mongoose.Schema({
    resourceType:{
        type : String,
    },
    identifier:{
        type : String,
    },
    basedOn:{
        type: String,
    },
    status:{
        type: String,
    },
    category:{
        type: String,
    },
    code:{
        type: String,
    },
    subject:{
        type: String,
    },
    context:{
        type: String,
    },
    effectiveDateTime:{
        type: Date,
    },
    effectivePeriod:{
        type: String,
    },
    issued:{
        type: String,
    },
    performer:[{
        role:{
            type: String,
        },
        actor:{
            type: String,
        },
    }],
    specimen:{
        type: String,
    },
    result:{
        type: String,
    },
    imagingStudy:{
        type: String,
    },
    image: [{
        comment: {
          type: String,  
        },
        link:{
          type: String 
        },
    }],
  
    conclusion:{
        type: String,
    },
    codedDiagnosis:{
        type: String,
    },
    presentedForm:{
        type: String,
    },
});
mongoose.model('Diagnostic_report', diagnostic_reportSchema);