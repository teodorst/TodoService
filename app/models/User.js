var mongoose = require('mongoose');
var bcrypt  = require('bcrypt-nodejs');
var Schema   = mongoose.Schema;


var userSchema = new Schema({
	firstName: { type: String },
	lastName: { type: String },
	birthDate: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createOn: { type: Number, required: true },
  lastModified: { type: Number, required: true },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
	profilePictureUrl: String
});

userSchema.pre('save', function(next) {
  var user = this;
  var SALT_FACTOR = 5;
  if( !user.isModified('password') ) return next();

  bcrypt.genSalt (SALT_FACTOR, function(err, salt) {
    if(err) next(err);
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if( err ) return next(err);
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function( candidatePassword ) {
  var _that = this;
  return new Promise(function(resolve, reject) {
    bcrypt.compare( candidatePassword, _that.password, function(err, isMatch) {
      if( err ) {
        reject(err);
      }
      else
        if( isMatch !== undefined ) {
          resolve(isMatch);
        }
    });
  });

};


module.exports = mongoose.model('User', userSchema);
