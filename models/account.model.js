const mongoose = require('mongoose');

var accountSchema = mongoose.Schema({
  resourceType: {
      type: String
  },
  identifier: {
      type: String , 
  },
  username: {
      type : String,
      required: 'this field is required'
  },
  password: {
      type : String,
      required: 'this field is required',
  },
  email: {
      type: String
  },
  active: {
      type: Boolean,
  },
  public: {
      type: Boolean,
  },
  name :{
      type: String,
      required: 'This field is required.'
  },
  telecom: {
      type: String,
  },
  gender: {
      type: String,
  },
  birthDate: {
      type: Date,
  },
  image: {
      type: String,
  },
  type: {
      type: Number // patient | doctor | technician | admin
  },
  controlIdentifier:[{
      type: mongoose.Schema.Types.ObjectId,
      ref : 'Account'
  }],
  period: {
      type: String, //id
  },
  update : {
      type: Date,
  }
});

mongoose.model('Account',accountSchema);