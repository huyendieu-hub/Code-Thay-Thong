const mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;

var recordsSchema = new mongoose.Schema({
    resourceType : {
        type: String,
        default: 'record'
    },
    identifier : {
        type: String,
        default: null
    },
    recordContainer : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Record_container'
    },
    patient : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient'
    },
    comingReason : {
        type: String,
        default: null
    }, 
    // lý do vào viện
    disease : {
            diseaseDescription:{
                type: String,
                default: null
            }, // quá trình bệnh lý
            diseaseHistory: {
                type: String,
                default: null
            },   // tiền xử bệnh
            familyHistory:{
                type: String,
                default: null
            }      // tiền sử bệnh gia đình
    },
    disease_selected:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'List_diseases'
    },
    diagnosis:{
        /*body:[{
            type: ObjectId,
            ref: 'observation'
        }],*/ // chỉ số sinh tồn: mạch, nhiệt độ, huyết áp, nhịp thở, cân nặng
        body:{
            angio: {
                type: String
            },
            temperature: {
                type: String
            },
            blood_pressure:{
                type: String
            },
            weight: {
                type: String
            }
        },
        dentaldisease: {
            description: {
                type: String,
                default: null
            },
            injures:{
                //Reference (disease_injures)
                type: ObjectId,
                ref: 'disease_injures',
                default: null
            },
            summary: {
                type: String
            }
        },
        examines:[{
            //Reference(procedure_request)
            type: ObjectId,
            ref: 'Procedure_request'
        }],
        summary:{
            type: String,
            default: null
        }
    },
    // diagnosis : {
    //     type: String
    // }, // chuẩn đoán khi vào khoa điều trị/ chẩn đoán điều trị
    prediction : {
        type: String,
        default: null
    },// tiên lượng
    treatment : {
        type: String,
        default: null
    }, // hướng điều trị 
    conclusionDate : {
        type: Date,
        default: null
    },
    doctor : {
        //Reference(Practitioner)
        type: ObjectId,
        ref: 'Practitioner'
    },
    status: {
        type: String,
        default: null
    }, // active| using| expired   
})
module.exports = mongoose.model('Record', recordsSchema);