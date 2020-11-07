// ------ REQUIRE ------
const config = require('../config');

// ------ MODELS ------
const User = require('../models/user');
const Picture = require('../models/picture');
const List = require('../models/list');

// Empty the database
exports.cleanUpDatabase = async function() {
  await Promise.all([
    User.deleteMany(),
    Picture.deleteMany(),
    List.deleteMany()
  ]);
};

// Generate a token for authentication
exports.generateValidToken = function(user) {
  const exp = (new Date().getTime() + 7 * 24 * 3600 * 1000) / 1000;
  const payload = {
    sub: user._id.toString(),
    exp: exp
  };
  return new Promise((resolve, reject) => {
    jwt.sign(payload, config.secretKey, function(err, token) {
      if (err) {
        return reject(err);
      }
      resolve(token);
    });
  })
}
