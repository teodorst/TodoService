var RefreshToken = require('../models/RefreshToken.js');

var refreshTokenStore = {};

refreshTokenStore.addPair = function(userId, refreshToken) {
  return new RefreshToken({
    userId: userId,
    refreshToken: refreshToken
  }).save();
};

refreshTokenStore.removePair = function(userId, refreshToken) {
  return refreshToken.remove({
    userId: usedId,
    refreshToken: refreshToken
  });
}

module.exports = refreshTokenStore;
