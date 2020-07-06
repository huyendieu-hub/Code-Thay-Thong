const mongoose = require('mongoose');
var treatmentadvisesSchema = new mongoose.Schema({
    resourceType: {
        type: String,
        default: "treatment_advises"
    },
  
    identifier: { // Identifiers assigned to this resourceType
        type: String 
    }, 
    disease: { //RKML, SR, VL, SMBT, VQC
        type: mongoose.Schema.Types.ObjectId,
        ref: 'List_diseases' 
    }, 
    /*priority: {//1, 2, 3, 4, 5
        type: Number
    },*/
    code: {//1, 2, 3, 4, 5
      type: String
    },
    /*
    advises: [{ 
        type: {// 1, 2, 3 phân loại mức độ quan trọng - defalt=1
            type: Number
        }, 
        description: {
            type: String
        }
    }], // mô tả các lời khuyên*/
    description: {
      type: String
    },
    note: {
        type: String
    }, //
    status: {//active | expired
        type: Number
    }
});

mongoose.model('Treatment_advises', treatmentadvisesSchema);