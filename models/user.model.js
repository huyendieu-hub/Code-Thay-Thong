const mongoose = require('mongoose');
//var bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema({
    resourceType: {
        type: String
    },
    identifier: {
        type: String , 
    },
    username:{
        type: String,
        required: 'this field is required'
    },
    password:{
        type: String,
        required: 'this field is required',
    },
    active: {
        type: Boolean,
        //required: 'this field is required'
    },
    public: {
        type: Boolean,
    },
    name: {
        type: String,
        required: 'This field is required.'
    },
    telecom: {
        type: String,
    },
    gender: {
        type: Number
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
    controlIdentifier:{
        type: String,
    },
    period: {
        type: String, //id
    },
    update : {
        type: Date,
    },
    //add more
    email: {
        type: String,
        required: 'This field is required.'
    },
    mobile: {
        type: String
    },
    city: {
        type: String
    },
});

// Custom validation for email
userSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

userSchema.path('password').validate((val) => {
    return /[a-zA-Z0-9]{6,12}/.test(val); 
}, 'Invalid password');

//authenticate input against database
userSchema.statics.authenticate = function (email, password, callback) {
  
}

//hashing a password before saving it to the database
//userSchema.pre('save', function (next) {
  //var user = this;
 // next();
  /*bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(user.password, salt, function(err, hash) {
          if (err) {
            return next(err);
          }
          user.password = hash;
          next();
      });
  });*/
//});

mongoose.model('User', userSchema);