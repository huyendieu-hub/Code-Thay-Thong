const mongoose = require('mongoose');
// var Address = mongooe.model('Address');
var organizationSchema = new mongoose.Schema({
    resourceType:{
        type: String,
    },
    identifier:{
        type: String,
        //required:"This field is required",
    },
    active:{
        type: Boolean,
    },
    type:{
        type: String,
    },
    name:{
        type: String,
        //required:"This field is required",
    },
    alias:{
        type: String,
    },
    telecom:[{
        type: String,
        //required:"This field is required",
    }],
    address:{
//         type: Schema.ObjectId , ref : "Address",
            type : String,
    },
    partOf:{
        type: String,
    },
    contact:{
        purpose:{
            type: String,
        },
        name:{
            type: String,
        },
        telecom:{
            type: String,
        },
        address:{
            type: String,
        },
    },
    endpoint:{
        type: String,
    },
});
/*organizationSchema.path('telecom').validate((val) => {
    return /[0-9]{10,12}/.test(val); 
}, 'Invalid telecom');*/
mongoose.model('Organization',organizationSchema);