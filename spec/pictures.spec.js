// ------ REQUIRE ------
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
const config = require('../config');

// ------ MODELS ------
const User = require('../models/user');
const Picture = require('../models/picture');

after(mongoose.disconnect);
beforeEach(cleanUpDatabase);

// Retrieve list of pictures of someone
describe('GET /users/:userId/pictures', function() {

  let user;
  let picture;

  beforeEach(async function() {
    // Create a user
    user = await (
      User.create({
        username: 'Pomme',
        email: 'gateau@gmail.com',
        password: 'Tre$B0ns'
      })
    );

    // Create 2 pictures
    const userId = user._id;
    const pictures = await Promise.all([
      Picture.create({
        description: "First picture",
        location: {
          type: "Point",
          coordinates: [48.862725, 2.287592]
        },
        picture: "https://source.unsplash.com/random",
        userId: `${userId}`
      }),
      Picture.create({
        description: "Second picture",
        location: {
          type: "Point",
          coordinates: [48.862726, 2.287593]
        },
        picture: "https://source.unsplash.com/random2",
        userId: `${userId}`
      })
    ]);
  });

  it('should retrieve the list of pictures', async function() {
    const userId = user._id;
    // const token = await generateValidToken(user);

    const res = await supertest(app)
      .get(`/users/${userId}/pictures`)
      // .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /json/);

    expect(res.body).to.be.an('array');
    expect(res.body).to.have.lengthOf(2);

    // Check that the response body is a JSON object with exactly the properties we expect.
    expect(res.body[0]).to.be.an('object');
    expect(res.body[0].id).to.be.a('string');
    expect(res.body[0].description).to.equal('First picture');
    expect(res.body[0].location.type).to.equal('Point');
    expect(res.body[0].location.coordinates).to.be.an('array');
    expect(res.body[0].location.coordinates[0]).to.equal(48.862725);
    expect(res.body[0].location.coordinates[1]).to.equal(2.287592);
    expect(res.body[0].picture).to.equal('https://source.unsplash.com/random');
    expect(res.body[0]).to.have.all.keys('id', 'description', 'location', 'picture', 'creation_date', 'last_mod_date', 'userId');

    expect(res.body[1]).to.be.an('object');
    expect(res.body[1].id).to.be.a('string');
    expect(res.body[1].description).to.equal('Second picture');
    expect(res.body[1].location.type).to.equal('Point');
    expect(res.body[1].location.coordinates).to.be.an('array');
    expect(res.body[1].location.coordinates[0]).to.equal(48.862726);
    expect(res.body[1].location.coordinates[1]).to.equal(2.287593);
    expect(res.body[1].picture).to.equal('https://source.unsplash.com/random2');
    expect(res.body[1]).to.have.all.keys('id', 'description', 'location', 'picture', 'creation_date', 'last_mod_date', 'userId');
  });
});

// Creation of a picture
describe('POST /users/:userId/pictures', function() {
  let user;
  beforeEach(async function() {
    // Create a user
    user = await (
      User.create({
        username: 'Pomme1',
        email: 'gateau1@gmail.com',
        password: 'Tre$B0n'
      })
    );
  });

  it('should create a picture', async function() {
    const userId = user._id;
    const token = await generateValidToken(user);
    // Make A POST request on /users
    const res = await supertest(app)
      .post(`/users/${userId}/pictures`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        description: "First picture",
        location: {
          type: "Point",
          coordinates: [100.878393, 12.930719]
        },
        picture: "https://source.unsplash.com/random"
      })
      .expect(201)
      .expect('Content-Type', /json/);

    // Check that the response body is a JSON object with exactly the properties we expect.
    expect(res.body).to.be.an('object');
    expect(res.body.id).to.be.a('string');
    expect(res.body.description).to.equal('First picture');
    expect(res.body.location.type).to.equal('Point');
    expect(res.body.location.coordinates).to.be.an('array');
    expect(res.body.location.coordinates[0]).to.equal(100.878393);
    expect(res.body.location.coordinates[1]).to.equal(12.930719);
    expect(res.body.picture).to.equal('https://source.unsplash.com/random');
    expect(res.body).to.have.all.keys('id', 'description', 'location', 'picture', 'creation_date', 'last_mod_date', 'userId');
  });
});

// Generate a token for authentication
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
