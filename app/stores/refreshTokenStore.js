var RefreshToken = require('../models/RefreshToken.js');

var refreshTokenStore = {};

refreshTokenStore.addPair = function( newPair ) {
  return new RefreshToken(newPair).save();
};




refreshTokenStore.removePair = function(userId, refreshToken) {
  return RefreshToken.remove({
    userId: usedId,
    refresh_token: refreshToken
  });
}

refreshTokenStore.updateRefreshTokenPair = function( query, newPair ) {
  console.log("Interschimb", query, newPair)
  return RefreshToken.findOneAndUpdate(query, newPair);
}

refreshTokenStore.findRefreshTokenPair = function( pair ) {
  return RefreshToken.findOne(pair);
};


module.exports = refreshTokenStore;
