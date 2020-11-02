const User = require('../models/user');
const Picture = require('../models/picture');

exports.cleanUpDatabase = async function() {
  await Promise.all([
    User.deleteMany(),
    Picture.deleteMany()
  ]);
};
