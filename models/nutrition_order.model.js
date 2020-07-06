const mongoose = require('mongoose');
var nutrition_orderSchema = new mongoose.Schema({
    resourceType:{
        type: String,
    },
    identifier:{
        type: String,
    },
    status:{
        type: Code, 
    },
    patient:{
        type: String,
    },
    encounter:{
       type: String, 
    },
    dateTime:{
        type: Date,
    },
    orderer:{
        type: String,
    },
    allergyIntolerance:{
        type: String,
    },
    foodPreferenceModifier:{
        type: String,
    },
    excludeFoodModifier:{
        type: String,
    },
    oralDiet:{
        type:{
            type: String,
        },
        schedule:{
            type: String,
        },
        nutrient: [{
            modifier:{
                type: String,
            }, 
            amount:{
                type: String,
            },          
        }],
        texture:[{
            modifier:{
                type: String,
            },
            foodType:{
                type: String,
            },
        }],
        fluidConsistencyType:{
            type: String,
        },
        instruction:{
            type: String,
        },
    },
    supplement:[{
        type:{
            type: String,
        },
        productName:{
            type: String,
        },
        schedule:{
            type: String,
        },
        quantity:{
            type: String,
        },
        instruction:{
            type: String,
        },
    }],
    enteralFormula:{
        baseFormulaType:{
            type: String,
        },
        baseFormulaProductName:{
            type: String,
        },
        additiveType:{
            type: String,
        },
        additiveProductName:{
            type: String,
        },
        caloricDensity:{
            type: String,
        },
        routeofAdministration:{
            type: String,
        },
        administration:[{
            schedule:{
                type: String,
            },
            quantity:{
                type: String,
            },
            rateQuantity:{
                type: String,
            },
            rateRatio:{
                type: String,
            },
        }],
    },
    maxVolumeToDeliver:{
        type: String,
    },
    administrationInstruction:{
        type: String,
    },
});
mongoose.model('Nutrition_order',nutrition_orderSchema);