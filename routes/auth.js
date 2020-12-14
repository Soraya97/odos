const express = require('express');
const router = express.Router();

// ------ REQUIRE ------
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');

// ------ MODELS ------
const User = require('../models/user');

/**
 * @api {post} /login Login of users
 * @apiName Login
 * @apiGroup LoginUser
 * @apiVersion 1.0.0
 * @apiDescription Login of users
 *
 * @apiParam (Request body) {String{/^[a-zA-Z0-9]+$/}} username The username of the user
 * @apiParam (Request body) {String} The password of the user  (that is hashed in db)
 *
 * @apiSuccess (Response body) {String} token The token of the user of the session (last 1 week)
 *
 * @apiError {Object} 401/Unauthorized
 * @apiErrorExample {json} 401 Unauthorized
 *     HTTP/1.1 401 Unauthorized
 *     Content-Type: text/plain
 *
 *     Unauthorized
 *
 * @apiExample Example
 *     POST /login HTTP/1.1
 *     Content-Type: application/json
 *
 *    {
 *       "username": "Pomme",
 *       "password": "Tre$B0n"
 *    }
 *
 * @apiSuccessExample 200 OK
 *     HTTP/1.1 200 OK
 *     Content-Type: application/json
 *
 *    {
 *      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1Zjk4MWU2NGVlYWMzMDQyYjBlMjdiODYiLCJleHAiOjE2MDUyNzM5ODUuNDk5LCJpYXQiOjE2MDQ2NjkxODV9.HpC2MibTEzGBh2s21Otc6eAQZ2KGwbkqvO3XssHFhNA"
 *    }
 */
router.post('/', function(req, res, next) {

  User.findOne({
    username: req.body.username
  }).exec(function(err, user) {
    if (err) {
      return next(err);
    } else if (!user) {
      return res.sendStatus(401);
    }

    bcrypt.compare(req.body.password, user.password, function(err, valid) {

      if (err) {
        return next(err);
      } else if (!valid) {
        return res.sendStatus(401);
      }

      // Generate a valid JWT which expires in 7 days.
      // An authentication token allows a user to authenticate to a server without sending his or her credentials at every request.
      // When a user authenticate, a token is given to him/her
      const exp = (new Date().getTime() + 7 * 24 * 3600 * 1000) / 1000;
      const payload = {
        sub: user._id.toString(),
        exp: exp,
        user: user
      };
      jwt.sign(payload, config.secretKey, function(err, token) {
        if (err) {
          return next(err);
        }
        // Send the token to the client.
        res.send({
          token: token,
          user: user
        });
      });

    });

  })

});

module.exports = router;
