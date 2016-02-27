var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RefreshTokenSchema = new Schema({
  userId: { type: String, required: true },
  refresh_token: { type: String, required: true }
});

module.exports = mongoose.model('RefreshToken', RefreshTokenSchema);
