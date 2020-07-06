const mongoose = require('mongoose');
var prediagnoseresultSchema = new mongoose.Schema({
  resourceType: {
      type: String,
      default: "PreDiagnoseResult"
  },
  
  identifier: { // Identifiers assigned to this resourceType
      type: String 
  }, 
  pre_diagnose_request: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PreDiagnoseRequests'
  },
  predictedResult: [{ 
     disease_name: {
         type: String
     }, //
     estimation: {
         type: String
     }, // 
     description: {
         type: String
     }, //
     note: {
         type: String
     }
   
  }],
  note: {//(không làm luôn)
        type: String
  } 
});

mongoose.model('PreDiagnoseResult', prediagnoseresultSchema);