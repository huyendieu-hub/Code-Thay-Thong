const mongoose = require('mongoose');

var patientSchema = new mongoose.Schema({
  resourceType: {
          type: String
  },
  //identifier : [{ Identifier }], // An identifier for this patient
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account'
  },
  patient_adminitration: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient_adminitration'
  }],
  generalPractitioner: {// Patient's nominated primary care provider
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Practitioner'
  }, 
  active :{
          type: Boolean
  }, // Whether this patient's record is in active use
  //name: [{ HumanName }], // A name associated with the patient
  name: {
        type: String,
        required: 'This field is required.'
  },
  mobile: {
    type: String
  },
  email: {
    type: String
  },
  //telecom: [{ ContactPoint }], // A contact detail for the individual
  gender:{
          type: String //"<code>"// male | female | other | unknown
  } , 
  birthDate:{
          type: Date //"<date>", // The date of birth for the individual
  }, 
  age: {
      type: String
  },
  foreigner:{
          type: Boolean //"<boolean>"
  },
  jobAddress:{
          type: String //"<string>"
  },
  // vietnamesses requirements
  storageNumber:{
          type: String //"<string>"
  },
  medicalCode:{
        type: String       
  },
  // deceased[x]: Indicates if the individual is deceased or not. One of these 2:
  deceasedBoolean:{
          type: Boolean
  },
  deceasedDateTime:{
          type: Date //"<dateTime>"
  },
  address:{
    type: String,
  },
  maritalStatus:{
    type: String,
  },
  multipleBirth:{
    type: String,
  },
  multipleBirthBoolean:{
    type: Boolean,
  },
  multipleBirthInteger:{
    type: Number,
  },
  photo:{
    type: String,
  },
  communication:[{
    language:{
      type: String
    },
    preferred:{
      type: Boolean,
    },    
  }],
  managingOrganization:{
    type: String,
  },
  //address: [{ Address }], // Addresses for the individual
  //"maritalStatus" : { CodeableConcept }, // Marital (civil) status of a patient
  // multipleBirth[x]: Whether patient is part of a multiple birth. One of these 2:
  //"multipleBirthBoolean" : <boolean>,
  //"multipleBirthInteger" : <integer>,
  //photo: [{ Attachment }], // Image of the patient
  //"communication" : [{ // A list of Languages which may be used to communicate with the patient about his or her health
    //"language" : { CodeableConcept }, // R!  The language which can be used to communicate with the patient about his or her health
    //"preferred" : <boolean> // Language preference indicator
  //}],
  
  //"managingOrganization" : { Reference(Organization) }, // Organization that is the custodian of the patient record
  
});
mongoose.model('Patient', patientSchema);