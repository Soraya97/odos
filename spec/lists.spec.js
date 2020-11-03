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
const List = require('../models/list');
const config = require('../config');

after(mongoose.disconnect);
beforeEach(cleanUpDatabase);

// Retrieve list of lists
describe('GET /users/:userId/lists', function() {

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

// Create a picture
    const userId = user._id;
    picture = await (
      Picture.create({
        description: "First picture",
        location: {
          type: "Point",
          coordinates: [48.862725, 2.287592]
        },
        picture: "https://source.unsplash.com/random",
        userId: `${userId}`
      })
    );

    // Create 2 lists
    const pictureId = picture.id;
    const lists = await Promise.all([
      List.create({
        name: "First list",
        picture: `${pictureId}`,
        user: `${userId}`
      }),
      List.create({
        name: "Second list",
        user: `${userId}`
      })
    ]);

  });

  it('should retrieve the list of lists', async function() {
    const userId = user._id;
    const token = await generateValidToken(user);

    const res = await supertest(app)
      .get(`/users/${userId}/lists`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /json/);

    expect(res.body).to.be.an('array');
    expect(res.body).to.have.lengthOf(2);

    // Check that the response body is a JSON object with exactly the properties we expect
    expect(res.body[0]).to.be.an('object');
    expect(res.body[0]._id).to.be.a('string');
    expect(res.body[0].name).to.equal('First list');
    expect(res.body[0]).to.have.all.keys('_id', 'name', 'creationDate', 'modificationDate', 'user', 'picture', 'public');

    expect(res.body[1]).to.be.an('object');
    expect(res.body[1]._id).to.be.a('string');
    expect(res.body[1].name).to.equal('Second list');
    expect(res.body[1]).to.have.all.keys('_id', 'name', 'creationDate', 'modificationDate', 'user', 'picture', 'public');
  });
});

// Creation of a list
describe('POST /users/:userId/lists', function() {
  let user;
  let picture;
  beforeEach(async function() {
    // Create a user
    user = await (
      User.create({
        username: 'Pomme',
        email: 'gateau@gmail.com',
        password: 'Tre$B0n'
      })
    );

    // Create a picture
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
    expect(res.body).to.have.all.keys('_id', 'name', 'creationDate', 'modificationDate', 'user', 'picture', 'public');
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
