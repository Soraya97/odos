const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const debug = require('debug')('demo:people');

const User = require('../models/user');
const ObjectId = mongoose.Types.ObjectId;

const config = require('../config');
const utils = require('./utils');

/**
 * @api {get} /users Retrieve all users
 * @apiName RetrieveUsers
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiDescription Retrieves a list of users ordered by usernames (in alphabetical order).
 *
 * @apiUse UserInResponseBody
 * @apiUse UserIncludes
 * @apiUse UserNotFoundError
 *
 * @apiExample Example
 *     GET /users HTTP/1.1
 *
 * @apiSuccessExample 200 OK
 *     HTTP/1.1 200 OK
 *     Content-Type: application/json
 *
 *      [{
 *          "_id":"5f981e64eeac3042b0e27b86",
 *          "username":"Pomme",
 *          "email":"gateau@gmail.com",
 *          "registrationDate":"2020-10-27T13:19:32.249Z"
 *      },
 *      {
 *          "_id":"5f85a58eb731925bec4aee2d",
 *          "username":"tata",
 *          "email":"abc@hhh.ch",
 *          "registrationDate":"2020-10-13T13:03:10.304Z"
 *       }]
 */
router.get('/', function(req, res, next) {
  User
    .find()
    .sort('username')
    .exec(function(err, users) {
      if (err) {
        return next(err);
      }
      res.send(users);
    });
});

/**
 * @api {get} /users/:userId Retrieve a user
 * @apiName RetrieveUser
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiDescription Retrieve one user
 *
 * @apiUse UserIdInUrlPath
 * @apiUse UserInResponseBody
 * @apiUse UserIncludes
 * @apiUse UserNotFoundError
 *
 * @apiExample Example
 *     GET /users/5f981e64eeac3042b0e27b86 HTTP/1.1
 *
 * @apiSuccessExample 200 OK
 *     HTTP/1.1 200 OK
 *     Content-Type: application/json
 *
 *     {
 *       "_id": "5f981e64eeac3042b0e27b86",
 *       "username": "Pomme",
 *       "email": "gateau@gmail.com",
 *       "registrationDate":"2020-10-27T13:19:32.249Z"
 *      }
 */
router.get('/:userId', utils.getUser, utils.authenticate, authorization, function(req, res, next) {
    res.send(req.user);

});


/**
 * @api {post} /users Create an user
 * @apiName CreateUser
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiDescription Create a new user.
 *
 * @apiUse UserInRequestBody
 * @apiUse UserInResponseBody
 * @apiUse UserValidationError
 *
 * @apiExample Example
 *     POST /users HTTP/1.1
 *     Content-Type: application/json
 *
 *     {
 *       "username": "Pomme",
 *       "email": "gateau@gmail.com",
 *       "password": "Tre$B0n"
 *     }
 *
 * @apiSuccessExample 201 Created
 *     HTTP/1.1 201 Created
 *     Content-Type: application/json
 *     Location: https://odos-archioweb.herokuapp.com/5f981e64eeac3042b0e27b86
 *
 *     {
 *       "_id": "5f981e64eeac3042b0e27b86",
 *       "username": "Pomme",
 *       "email": "gateau@gmail.com",
 *       "registrationDate":"2020-10-27T13:19:32.249Z"
 *     }
 */
router.post('/', function(req, res, next) {
  // Get the password
  const password = req.body.password;
  const costFactor = config.bcryptCostFactor;
  // Hash the password
  bcrypt.hash(password, costFactor, function(err, passwordHash) {
    if (err) {
      return next(err);
    }
    // Create a new document from the JSON in the request body
    const newUser = new User(req.body);
    newUser.set('password', passwordHash);
    // Save that document
    newUser.save(function(err, savedUser) {
      if (err) {
        return next(err);
      }
      debug(`New user "${savedUser.username}"`);
      // Send the saved document in the response
      res.status(201).send(savedUser);
    });
  });
});

/**
 * @api {patch} /users/:userId Partially update an user
 * @apiName UpdateUser
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiDescription Partially updates a user's data (only the properties found in the request body will be updated).
 *
 * @apiUse UserIdInUrlPath
 * @apiUse UserInRequestBody
 * @apiUse UserInResponseBody
 * @apiUse UserNotFoundError
 * @apiUse UserValidationError
 * @apiUse UserAuthorizationError
 * @apiUse UserUnauthorizedError
 *
 * @apiExample Example
 *     PATCH /users/58b2926f5e1def0123e97bc0 HTTP/1.1
 *     Content-Type: application/json
 *
 *     {
 *       "username": "Poire",
 *       "password": "Tre$M4uvais"
 *     }
 *
 * @apiSuccessExample 200 OK
 *     HTTP/1.1 200 OK
 *     Content-Type: application/json
 *
 *     {
 *       "_id": "58b2926f5e1def0123e97bc0",
 *       "username": "Poire",
 *       "email": "gateau@gmail.com",
 *       "registrationDate":"2020-10-27T13:19:32.249Z"
 *     }
 */
router.patch('/:userId', utils.getUser, utils.authenticate, authorization, function(req, res, next) {

  if (req.body.username !== undefined) {
    req.user.username = req.body.username;
  }

  if (req.body.email !== undefined) {
    req.user.email = req.body.email;
  }

  if (req.body.password !== undefined) {
    // req.user.password = req.body.password;
    const newPassword = req.body.password;
    const costFactor = config.bcryptCostFactor;
    bcrypt.hash(newPassword, costFactor, function(err, newPasswordHash) {
      if (err) {
        return next(err);
      }
      req.user.password = newPasswordHash;
      req.user.save(function(err, savedUser) {
        if (err) {
          return next(err);
        }

        debug(`Updated user "${savedUser.username}"`);
        res.send(savedUser);
      });
  })
}

  req.user.save(function(err, savedUser) {
    if (err) {
      return next(err);
    }

    debug(`Updated user "${savedUser.username}"`);
    res.send(savedUser);
  });
});


/**
 * @api {delete} /users/:userId Delete an user
 * @apiName DeleteUser
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiDescription Permanently deletes an user.
 *
 * @apiUse UserIdInUrlPath
 * @apiUse UserNotFoundError
 * @apiUse UserAuthorizationError
 * @apiUse UserUnauthorizedError
 *
 * @apiExample Example
 *     DELETE /users/5f981e64eeac3042b0e27b86 HTTP/1.1
 *
 * @apiSuccessExample 204 No Content
 *     HTTP/1.1 204 No Content
 */
router.delete('/:userId', utils.getUser, utils.authenticate, authorization, function(req, res, next) {

  req.user.remove(function(err) {
    if (err) {
      return next(err);
    }

    debug(`Deleted user "${req.user.username}"`);
    res.sendStatus(204);
  });
});


// Authorization to do something with the id of user in the param
function authorization(req, res, next) {
  if (req.currentUserId != req.user._id) {
    return res.status(403).send("You're not allowed to do that")
  }
next();
}

/**
 * @apiDefine UserIdInUrlPath
 * @apiParam (URL path parameters) {String} userId The unique identifier of the user to retrieve
 */

/**
 * @apiDefine UserInRequestBody
 * @apiParam (Request body) {String{/^[a-zA-Z0-9]+$/}} username The username of the user (must be unique)
 * @apiParam (Request body) {String{/\S+@\S+\.\S+/}} email The email of the user (must be unique)
 * @apiParam (Request body) {String} password The password of the user that will be hashed
 */

/**
 * @apiDefine UserInResponseBody
 * @apiSuccess (Response body) {String} userId An Id which is referencing the user (eg: `5f981e64eeac3042b0e27b86`)
 * @apiSuccess (Response body) {String{/^[a-zA-Z0-9]+$/}} username The username of the user
 * @apiSuccess (Response body) {String{/\S+@\S+\.\S+/}} email The email of the user
 * @apiSuccess (Response body) {Date} registrationDate The date at which the user was created
 */

 /**
 * @apiDefine UserIncludes
 */

/**
 * @apiDefine UserNotFoundError
 *
 * @apiError {Object} 404/NotFound No User was found corresponding to the ID in the URL path
 *
 * @apiErrorExample {json} 404 Not Found
 *     HTTP/1.1 404 Not Found
 *     Content-Type: text/plain
 *
 *     No User found with ID 5f981e64eeac3042b0e27b86
 */

/**
 * @apiDefine UserValidationError
 *
 * @apiError {Object} 422/UnprocessableEntity Some of the User's properties are invalid
 *
 * @apiErrorExample {json} 422 Unprocessable Entity
 *     HTTP/1.1 422 Unprocessable Entity
 *     Content-Type: application/json
 *
 *     {
 *       "errors": {
 *         "email": ValidatorError: is invalid {
 *           "properties": [Object],
 *           "kind": "regexp",
 *           "path": "email",
 *           "value": "lauraineemail",
 *           "reason": undefined,
 *           [Symbol(mongoose:validatorError)]: true
 *         }
 *       },
 *      "_message": "User validation failed"
 *     }
 */

 /**
 * @apiDefine UserAuthorizationError
 *
 * @apiError {Object} 403/Forbidden You're not allowed to do that
 *
 * @apiErrorExample {json} 403 Forbidden
 *     HTTP/1.1 403 Forbidden
 *     Content-Type: text/plain
 *
 *     You're not allowed to do that
 */

  /**
 * @apiDefine UserUnauthorizedError
 *
 * @apiError {Object} 401/Unauthorized You're not allowed to do that
 *
 * @apiErrorExample {json} 401 Unauthorized
 *     HTTP/1.1 401 Unauthorized
 *     Content-Type: text/plain
 *
 *     You're not connected you don't have access
 */
module.exports = router;
