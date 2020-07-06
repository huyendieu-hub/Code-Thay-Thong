const mongoose = require('mongoose');
var prediagnoserequestsSchema = new mongoose.Schema({
  resourceType: {
      type: String,
      default: "PreDiagnoseRequests"
  },
  identifier: { 
      type: String
  }, // Identifiers assigned to this resourceType
  account: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account'
    //Reference(account) 
  }, 
  status: {
      type: Number,// active | suspended | completed | entered-in-error | cancelled

  }, 
  doNotPerform: {// True if request should not be performed
      type: Number
  }, 
  disease: { //RKML, SR, VL, SMBT, VQC
    type: Number
  }, // 
  requestDateTime: {
      type: Date
  },
  occurrenceDateTime: {
      type: Date
  },
  note : {// Comments  (không làm luôn)
      type: Date
  } 
});

mongoose.model('PreDiagnoseRequests', prediagnoserequestsSchema);