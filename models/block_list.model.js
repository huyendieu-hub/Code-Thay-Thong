const mongoose = require('mongoose');
var block_listSchema = new mongoose.Schema({
   resourceType: {
       type: String,
   },
   identifier: {
       type: String,
   },
   period: {
       type: String,
   },
   update: {
       type: Date,
   },
   banUsers: {
       type: String,
   }
});mongoose.model('Block_list',block_listSchema);