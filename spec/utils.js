const User = require('../models/user');
const Picture = require('../models/picture');
const List = require('../models/list');

exports.cleanUpDatabase = async function() {
  await Promise.all([
    User.deleteMany(),
    Picture.deleteMany(),
    List.deleteMany()
  ]);
};
