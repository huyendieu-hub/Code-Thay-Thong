const mongoose = require('mongoose');
var care_planSchema = new mongoose.Schema({
    resourceType:{
        type: String,
    },
    identifier:{
        type: String,
    },
    definition:{
        type: String,
    },
    basedOn:{
        type: String,
    },
    replaces:{
        type: String,
    },
    partOf:{
        type: String,
    },
    status:{
        type: String,
    },
    intent:{
        type: String,
    },
    category:{
        type: String,
    },
    title:{
        type: String,
    },
    description:{
        type: String,
    },
    subject:{
        type: String,
    },
    context:{
        type: String,
    },
    period:{
        type: String,
    },
    author:{
        type: String,
    },
    careTeam:{
        type: String,
    },
    addresses:{
        type: String,
    },
    supportingInfo:{
        type: String,
    },
    goal:{
        type: String,
    },
    activity:[{
        outcomeCodeableConcept:{
            type: String,
        },
        outcomeReference:{
            type: String,
        },
        progress:{
            type: String,
        },
        reference:{
            type: String,
        },
        detail: {
            category:{
                type:String,
            },    
            definition:{
                type:String,
            },  
            code:{
                type:String,
            },
            reasonCode:{
                type:String,
            },
            reasonReference:{
                type:String,
            },
            goal:{
                type:String,
            },
            status:{
                type:String,
            },
            statusReason:{
                type:String,
            },
            prohibited:{
                type:String,
            },
            scheduledTiming:{
                type:String,
            },
            scheduledPeriod:{
                type:String,
            },
            scheduledString:{
                type:String,
            },
            location:{
                type:String,
            },
            performer:{
                type:String,
            },
            productCodeableConcept:{
                type:String,
            },
            productReference:{
                type:String,
            },
            dailyAmount:{
                type:String,
            },
            quantity:{
                type:String,
            },
            description:{
                type:String,
            },
        },
    }],
    note:{
        type: String
    }
});

mongoose.model('Care_plan',care_planSchema);