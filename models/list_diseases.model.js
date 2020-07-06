const mongoose = require('mongoose');
var listdiseasesSchema = new mongoose.Schema({
  resourceType: {
      type: String,
      default: 'list_diseases'
  },
  identifier : {
      type: String
  }, // Identifiers assigned to this resourceType
  disease:{//RKML, SR, VL, SMBT, VQC
      type: String   
  }, 
  link_predict: {
      type: String
  },
  server_machine: {
    type: String
  },
  name: {// tên bênh viết đầy đủ
      type: String
  }, 
  description: { // mô tả bệnh
      type: String
  },
  priority: {//1, 2, 3, 4, 5
      type: Number
  }, 
  note: {
      type: String
  },
  status: {//active | expired
      type: Number
  }
});

mongoose.model('List_diseases', listdiseasesSchema);