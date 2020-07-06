const mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId

var records_ConclusionsSchema = new mongoose.Schema({
//exports.records_Conclusions = {
    resourceType : {
        type: String
    },
    identifier : {
        type: String,
        default: null
    },
    // patientAdminitration : {
    //     //Reference(patient_adminitration)
    //     type: ObjectId,
    //     ref: 'Patient_adminitration'
    // },
    // patient : {
    //     //Reference(Patient)
    //     type: ObjectId,
    //     ref: 'Patient'
    // },
    diseaseDescription : {
        type: String,
        default: null
    }, // quá trình bệnh lý và diễn biến lâm sàng
    examDescription : {
        type: String,
        default: null
    }, // tóm tắt kết quả xét nghiệm cận lâm sàng có giá trị trong chẩn đoán
    treatment : {
        type: String,
        default: null
    }, // phương pháp điều trị
    leavingStatus : {
        type: String,
        default: null
    }, // Ra viện | xin về|  bỏ về | đưa về
    continuousTreatment : {
        type: String,
        default: null
    }, // hướng điều trị và các chế độ tiếp theo
    conclusionDate : {
        type: Date,
        default: null
    },
    // doctor : {
    //     //Reference(Practitioner)
    //     type: ObjectId,
    //     ref: 'Practitioner'
    // },
    status: {
        type: String,
        default: null
    } // active| using| expired
})
module.exports = mongoose.model('Records_Conclusion', records_ConclusionsSchema);
