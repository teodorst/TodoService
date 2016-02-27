var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RefreshTokenSchema = new Schema({
  userId: { type: String, required: true },
  refreshToken: { type: String, required: true }
});

module.exports = mongoose.model('RefreshToken', RefreshTokenSchema);
