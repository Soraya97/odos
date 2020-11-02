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
const config = require('../config');

after(mongoose.disconnect);
beforeEach(cleanUpDatabase);

describe('POST /users/:userId/pictures', function() {
  let user;
  beforeEach(async function() {
    // Create 2 users before retrieving the list.
    const users = await Promise.all([
      User.create({
        username: 'Pomme1',
        email: 'gateau1@gmail.com',
        password: 'Tre$B0n'
      }),
      User.create({
        username: 'Pomme2',
        email: 'gateau2@gmail.com',
        password: 'Tre$B0n'
      })
    ]);

    // Retrieve a user to authenticate as.
    user = users[0];
  });

  it('should create a picture', async function() {

    // Make A POST request on /users
    const res = await supertest(app)
      .post('/users/:userId/pictures')
      .set('userId', user)
      .send({
        description: "First picture",
        location:
        {
             type: "Point",
             coordinates: [ 48.862725, 2.287592 ]
        },
         picture: "https://source.unsplash.com/random",
      })
      .expect(200)
      .expect('Content-Type', /json/);

    // Check that the response body is a JSON object with exactly the properties we expect.
    expect(res.body).to.be.an('object');
    expect(res.body._id).to.be.a('string');
    expect(res.body.description).to.equal('First picture');
    expect(res.body.location.type).to.equal('Point');
    expect(res.body.location.coordinates).to.equal('[ 48.862725, 2.287592 ]');
    expect(res.body.picture).to.equal('https://source.unsplash.com/random');
    expect(res.body).to.have.all.keys('_id', 'description', 'location', 'picture', 'creation_date', 'last_mod_date', 'userId');
  });
});

// describe('GET /users', function() {
//   let user;
//   beforeEach(async function() {
//     // Create 2 users before retrieving the list.
//     const users = await Promise.all([
//       User.create({
//         username: 'Pomme1',
//         email: 'gateau1@gmail.com',
//         password: 'Tre$B0n'
//       }),
//       User.create({
//         username: 'Pomme2',
//         email: 'gateau2@gmail.com',
//         password: 'Tre$B0n'
//       })
//     ]);
//
//     // Retrieve a user to authenticate as.
//     user = users[0];
//   });
//
//   it('should retrieve the list of users', async function() {
//
//     const token = await generateValidToken(user);
//
//     const res = await supertest(app)
//       .get('/users')
//       .set('Authorization', `Bearer ${token}`)
//       .expect(200)
//       .expect('Content-Type', /json/);
//
//     expect(res.body).to.be.an('array');
//     expect(res.body).to.have.lengthOf(2);
//
//     expect(res.body[0]).to.be.an('object');
//     expect(res.body[0]._id).to.be.a('string');
//     expect(res.body[0].username).to.equal('Pomme1');
//     expect(res.body[0].email).to.equal('gateau1@gmail.com');
//     expect(res.body[0]).to.have.all.keys('_id', 'username', 'email', 'registrationDate');
//
//     expect(res.body[1]).to.be.an('object');
//     expect(res.body[1]._id).to.be.a('string');
//     expect(res.body[1].username).to.equal('Pomme2');
//     expect(res.body[1].email).to.equal('gateau2@gmail.com');
//     expect(res.body[1]).to.have.all.keys('_id', 'username', 'email', 'registrationDate');
//   });
// });
//
// function generateValidToken(user) {
//   const exp = (new Date().getTime() + 7 * 24 * 3600 * 1000) / 1000;
//   const payload = {
//     sub: user._id.toString(),
//     exp: exp
//   };
//   return new Promise((resolve, reject) => {
//     jwt.sign(payload, config.secretKey, function(err, token) {
//       if (err) {
//         return reject(err);
//       }
//       resolve(token);
//     });
//   })
// }
