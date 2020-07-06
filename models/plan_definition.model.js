const mongoose = require('mongoose');
var plan_definitionSchema = new mongoose.Schema({
  resourceType : {
      type: String,
  },
  url :{
      type: String,
  },
  identifier :{
      type: String,
  },
  version :{
      type: String,
  },
  name :{
      type: String,
  },
  title : {
      type: String,
  },
  type :{
      type: String,
  },
  status : {
      type:String,
  },
  experimental :{
      type: Boolean,
  },
  date : {
      type: Date,
  },
  publisher :{
      type: String,
  },
  description : {
      type: String,
  },
  purpose : {
      type: String,
  },
  usage : {
      type: String,
  },
  approvalDate :{
      type: String,
  },
  lastReviewDate : {
      type: String,
  },
  effectivePeriod :{
      type: String,
  },
  useContext : {
      type: String,
  },
  jurisdiction : {
      type: String,
  },
  topic :{
      type: String,
  },
  contributor :{
      type: String,
  },
  contact :{
      type: String,
  },
  copyright :{
      type: String,
  },
  relatedArtifact :{
      type: String,
  }, 
  library : {
      type: String,
  },
  goal : [{ 
    category :{
        type: String,
    },
    description :{
        type: String,
    }, 
    priority : {
        type: String,
    },
    start : {
        type: String,
    },
    addresses :{
        type: String,
    },
    documentation :{
        type: String,
    }, 
    target : [{
      measure :{
          type: String,
      },
      detailQuantity :{
          type: String,
      }, 
      detailRange :{
          type: String,
      },
      detailCodeableConcept :{
          type: String,
      },
      due : {
          type: String,
      },
    }]
  }],
  action : [{ 
    label :{
        type: String,
    },
    title :{
        type: String,
    },
    description :{
        type: String,
    }, 
    textEquivalent :{
        type: String,
    }, 
    code :{
        type: String,
    },
    reason :{
        type: String,
    },
    documentation :{
        type: String,
    }, 
    goalId :{
        type: String,
    },
    triggerDefinition :{
        type: String,
    },
    condition : [{ 
      kind :{
          type: String,
      },
      description :{
          type: String,
      }, 
      language : {
          type: String,
      },
      expression :{
          type: String,
      },
    }],
    input : {
        type: String,
    },
    output :{
        type: String,
    },
    relatedAction : [{ 
      actionId : {
          type: String,
      },
      relationship :{
          type: String,
      },
      offsetDuration :{
          type: String,
      },
      offsetRange :{
          type: String,
      },
    }],
    timingDateTime : {
        type:Date,
    },
    timingPeriod : {
        type: String,
    },
    timingDuration : {
        type: String,
    },
    timingRange :{
        type: String,
    }, 
    timingTiming :{
        type: String,
    },
    participant : [{ 
       type : {
           type: String,
       },
       role : {
           type: String,
       },
    }],
    type :{
        type: String,
    }, 
    groupingBehavior :{
        type:String,
    },
    selectionBehavior : {
        type: String,
    },
    requiredBehavior : {
        type: String,
    },
    precheckBehavior : {
        type: String,
    },
    cardinalityBehavior : {
        type: String,
    },
    definition : {
        type: String,
    },
    transform : {
        type: String,
    },
    dynamicValue : [{ 
      description :{
          type: String,
      }, 
      path : {
          type: String,
      },
      language :{
          type: String,
      }, 
      expression : {
          type: String,
      },
    }],
    action :{
        type: String,
    },
  }]
}
});
mongoose.model('Plan_definition',plan_definitionSchema);