const mongoose = require('mongoose');
var taskSchema = new mongoose.Schema({
  resourceType :{
      type: String,
  },
  identifier : {
      type: String,
  },
  definitionUri :  {
      type: String,
  },
  definitionReference : {
      type: String,
  }, 
  basedOn :  {
      type: String,
  },
  groupIdentifier :  {
      type: String,
  },
  partOf : {
      type: String,
  },
  status :  {
      type: String,
  },
  statusReason : {
      type: String,
  },
  businessStatus :  {
      type: String,
  },
  intent :  {
      type: String,
  },
  priority :  {
      type: String,
  },
  code : {
      type: String,
  },
  description : {
      type: String,
  }, 
  focus :  {
      type: String,
  },
  for :  {
      type: String,
  },
  context : {
      type: String,
  },
  executionPeriod : {
      type: String,
  }, 
  authoredOn :  {
      type: Date,
  },
  lastModified :  {
      type: Date,
  },
  requester :{ 
    agent :   {
        type: String,
    },
    onBehalfOf :  {
        type: String,
    },
  },
  performerType :  {
      type: String,
  },
  owner :  {
      type: String,
  },
  reason :  {
      type: String,
  },
  note: {
      type: String,
  },
  relevantHistory : {
      type: String,
  },
  restriction :{ 
    repetitions :  {
        type: String,
    },
    period : {
        type: String,
    },
    recipient :  {
        type: String,
    },
  },
  input : [{ 
    type : {
        type: String,
    },
    valueInteger : {
        type: String,
    },
    valueDecimal :  {
        type: String,
    },
    valueDateTime :  {
        type: String,
    },
    valueDate:  {
        type: String,
    },
    valueInstant :  {
        type: String,
    },
    valueString :  {
        type: String,
    },
    valueUri :  {
        type: String,
    },
    valueBoolean : {
        type:Boolean,
    },
    valueCode : {
        type: String,
    },
    valueBase64Binary : {
        type: String,
    }, 
    valueCoding :  {
        type: String,
    },
    valueCodeableConcept : {
        type: String,
    }, 
    valueAttachment : {
        type: String,
    },
    valueIdentifier : {
        type: String,
    },
    valueQuantity :  {
        type: String,
    },
    valueRange :  {
        type: String,
    },
    valuePeriod: {
        type: String,
    },
    valueRatio :  {
        type: String,
    },
    valueHumanName :  {
        type: String,
    },
    valueAddress :  {
        type: String,
    },
    valueContactPoint: {
        type: String,
    },
    valueSchedule :  {
        type: String,
    },
    valueReference : {
        type: String,
    },
  }],
  output : [{ 
    type :  {
        type: String,
    },
    valueInteger : {
        type: String,
    }, 
    valueDecimal :  {
        type: String,
    },
    valueDateTime :  {
        type: String,
    },
    valueDate :  {
        type: String,
    },
    valueInstant :  {
        type: String,
    },
    valueString :  {
        type: String,
    },
    valueUri : {
        type: String,
    },
    valueBoolean : {
        type: Boolean,
    }, 
    valueCode :  {
        type: String,
    },
    valueBase64Binary : {
        type: String,
    }, 
    valueCoding :  {
        type: String,
    },
    valueCodeableConcept :  {
        type: String,
    },
    valueAttachment :  {
        type: String,
    },
    valueIdentifier :  {
        type: String,
    },
    valueQuantity :  {
        type: String,
    },
    valueRange :  {
        type: String,
    },
    valuePeriod : {
        type: String,
    },
    valueRatio : {
        type: String,
    },
    valueHumanName : {
        type: String,
    },
    valueAddress : {
        type: String,
    },
    valueContactPoint : {
        type: String,
    }, 
    valueSchedule : {
        type: String,
    },
    valueReference :  {
        type: String,
    },
  }],       
});
mongoose.model('Task',taskSchema);