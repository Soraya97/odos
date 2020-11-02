const express = require('express');
const router = express.Router();
const User = require('../models/user');
const config = require('../config');
const bcrypt = require('bcrypt');
const debug = require('debug')('demo:people');
const utils = require('./utils');

// ------ WEBSOCKET ------
const webSocket = require('../websocket/dispatcher');

/**
 * @api {get} /users Retrieve all users
 * @apiName RetrieveUsers
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiDescription Retrieves a paginated??? list of users ordered by usernames???? (in alphabetical order).
 *
 * @apiUse UserInResponseBody
 */
router.get('/', function(req, res, next) {
  User
    .find()
    .sort('username')
    .exec(function(err, users) {
      if (err) {
        return next(err);
      }

      // Websocket
      const nbUsers = users.length;
      webSocket.nbUsers(nbUsers);

      res.send(users);
    });
});

/**
 * @api {get} /users/:id Retrieve a user
 * @apiName RetrieveUser
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiDescription Retrieve one user
 *
 * @apiUse UserIdInUrlPath
 * @apiUse UserInResponseBody
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
router.get('/:id', getUser, utils.authenticate, function(req, res, next) {
  // Check the authorization of the user. Is he authorized to check this thing ?
  if (req.currentUserId != req.user._id) {
    return res.status(403).send("You can't check someone else's data.")
  }
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
 * @apiSuccess (Response body) {String} id A unique identifier for the user generated by the server
 *
 * @apiExample Example
 *     POST / HTTP/1.1
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
      res.send(savedUser);
    });
  });
});

/**
 * @api {patch} /users/:id Partially update an user
 * @apiName UpdateUser
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiDescription Updates the new data on the old user's data
 *
 * @apiUse UserIdInUrlPath
 * @apiUse UserInRequestBody
 * @apiUse UserInResponseBody
 *
 * @apiExample Example
 *     PUT /api/movies/58b2926f5e1def0123e97bc0 HTTP/1.1
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
router.patch('/:id', getUser, utils.authenticate, function(req, res, next) {
  // Check the authorization of the user. Is he authorized to change this thing ?
  if (req.currentUserId != req.user._id) {
    return res.status(403).send("You can't change someone else's data.")
  }

  if (req.body.username !== undefined) {
    req.user.username = req.body.username;
  }

  if (req.body.email !== undefined) {
    req.user.email = req.body.email;
  }

  if (req.body.password !== undefined) {
    req.user.password = req.body.password;
  }

  req.user.save(function(err, savedUser) {
    if (err) {
      return next(err);
    }

    // debug(`Updated user "${savedUser.username}"`);
    res.send(savedUser);
  });
});



/**
 * @api {delete} /:id Delete an user
 * @apiName DeleteUser
 * @apiGroup User
 * @apiVersion 1.0.0
 * @apiDescription Permanently deletes an user.
 *
 * @apiUse UserIdInUrlPath
 *
 * @apiExample Example
 *     DELETE /users/5f981e64eeac3042b0e27b86 HTTP/1.1
 *
 * @apiSuccessExample 204 No Content
 *     HTTP/1.1 204 No Content
 */
/* DELETE user */
router.delete('/:id', getUser, utils.authenticate, function(req, res, next) {
  // Check the authorization of the user. Is he authorized to delete this thing?
  if (req.currentUserId != req.user._id) {
    return res.status(403).send("You can't delete another user.")
  }
  req.user.remove(function(err) {
    if (err) {
      return next(err);
    }

    // debug(`Deleted user "${req.user.username}"`);
    res.send(`"${req.user.username}" deleted`).sendStatus(204);
  });
});


// Get the user by id
function getUser(req, res, next) {
  // get the id of the user by the param
  const id = req.params.id;
  // if (!ObjectId.isValid(id)) {
  //   return userNotFound(res, id);
  // }

  // get the user by id
  User.findById(req.params.id, function(err, user) {
    if (err) {
      return next(err);
    }
    // } else if (!user) {
    //   return userNotFound(res, id);
    // }
    req.user = user;
    next();
  });
}




/**
 * @apiDefine UserIdInUrlPath
 * @apiParam (URL path parameters) {String} id The unique identifier of the user to retrieve
 */

/**
 * @apiDefine UserInRequestBody
 * @apiParam (Request body) {String} id An Id which is referencing the user (eg: `5f981e64eeac3042b0e27b86`)
 * @apiParam (Request body) {String{/^[a-zA-Z0-9]+$/}} username The username of the user (must be unique and cannot be blank)
 * @apiParam (Request body) {String{/\S+@\S+\.\S+/}} email The email of the user (must match an email form, must be unique and cannot be blank)
 * @apiParam (Request body) {String} password The password of the user that is put in hash (cannot be blank)
 */

/**
 * @apiDefine UserInResponseBody
 * @apiSuccess (Response body) {String} id An Id which is referencing the user
 * @apiSuccess (Response body) {String{/^[a-zA-Z0-9]+$/}} username The username of the user
 * @apiSuccess (Response body) {String{/\S+@\S+\.\S+/}} email The email of the user
 * @apiSuccess (Response body) {String} registrationDate The date at which the user was created
 */




module.exports = router;
