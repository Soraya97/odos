const {
  expect
} = require('chai');
const supertest = require('supertest');
const mongoose = require('mongoose');
const {
  cleanUpDatabase
} = require('./utils');
const jwt = require('jsonwebtoken');

const app = require('../app');
const User = require('../models/user');
const Picture = require('../models/picture');
const List = require('../models/picture');
const config = require('../config');

after(mongoose.disconnect);
beforeEach(cleanUpDatabase);

// Creation of a list
describe('POST /users/:userId/lists', function() {
  let user;
  beforeEach(async function() {
    // Create 2 users before retrieving the list.
    user = await (
      User.create({
        username: 'Pomme',
        email: 'gateau@gmail.com',
        password: 'Tre$B0n'
      })
    );
  });

  let picture;
  beforeEach(async function() {
    // Create 2 users before retrieving the list.
    picture = await (
      Picture.create({
        description: "First picture",
        location: {
          type: "Point",
          coordinates: [48.862725, 2.287592]
        },
        picture: "https://source.unsplash.com/random"
      })
    );
  });

  it('should create a list', async function() {
    const userId = user._id;
    const pictureId = picture._id;
    const token = await generateValidToken(user);
    // Make A POST request on /users
    const res = await supertest(app)
      .post(`/users/${userId}/lists`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: "Pomme",
        picture: `${pictureId}`
      })
      .expect(201)
      .expect('Content-Type', /json/);

    // Check that the response body is a JSON object with exactly the properties we expect.
    expect(res.body).to.be.an('object');
    expect(res.body._id).to.be.a('string');
    expect(res.body.name).to.equal('Pomme');
    expect(res.body).to.have.all.keys('_id', 'name', 'creationDate', 'modificationDate', 'user', 'picture', 'public', '__v');
  });
});

// Retrieve list of pictures
// describe('GET /users/:userId/pictures', function() {
//
//   let user;
//   beforeEach(async function() {
//     // Create 2 users before retrieving the list.
//     user = await (
//       User.create({
//         username: 'Pomme',
//         email: 'gateau@gmail.com',
//         password: 'Tre$B0ns'
//       })
//     );
//   });
//
//   let list;
//   beforeEach(async function() {
//     // Create 2 users before retrieving the list.
//     const lists = await Promise.all([
//       List.create({
//         name: "Firt list"
//       }),
//       List.create({
//         name: "Second list"
//       })
//     ]);
//
//     // Retrieve a user to authenticate as.
//     list = lists[0];
//   });
//
//   it('should retrieve the list of pictures', async function() {
//     const userId = user._id;
//     const token = await generateValidToken(user);
//
//     const res = await supertest(app)
//       .get(`/users/${userId}/pictures`)
//       .set('Authorization', `Bearer ${token}`)
//       .expect(200)
//       .expect('Content-Type', /json/);
//
//     expect(res.body).to.be.an('array');
//     expect(res.body).to.have.lengthOf(2);
//
//     expect(res.body[0]).to.be.an('object');
//     expect(res.body[0].id).to.be.a('string');
//     expect(res.body[1].name).to.equal('First list');
//     expect(res.body).to.have.all.keys('_id', 'name', 'creationDate', 'modificationDate', 'user', 'picture', 'public', '__v');
//
//     expect(res.body[1]).to.be.an('object');
//     expect(res.body[1].id).to.be.a('string');
//     expect(res.body[1].name).to.equal('Second list');
//     expect(res.body).to.have.all.keys('_id', 'name', 'creationDate', 'modificationDate', 'user', 'picture', 'public', '__v');
//   });
// });

function generateValidToken(user) {
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
