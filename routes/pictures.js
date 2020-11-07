// ------ REQUIRE ------
const express = require('express');
const router = express.Router({
  mergeParams: true
});
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const debug = require('debug')('demo:people');
const utils = require('./utils');

// ------ WEBSOCKET ------
const webSocket = require('../websocket/dispatcher');

// ------ MODELS ------
const Picture = require('../models/picture');
const List = require('../models/list');


// ------ RESOURCES ODOS ------

/**
 * @api {get} /users/:userId/pictures Retrieve all pictures
 * @apiName RetrieveAllPictures
 * @apiGroup Picture
 * @apiVersion 1.0.0
 * @apiDescription Retrieves a list of picture ordered by picture (in alphabetical order).
 *
 * @apiUse PictureIdInUrlPath
 * @apiUse PictureInResponseBody
 * @apiUse PictureIncludes
 * @apiUse PictureNotFoundError
 *
 * @apiExample Example
 *     GET /users/5f981e64eeac3042b0e27b86/pictures/ HTTP/1.1
 *
 * @apiSuccessExample 200 OK
 *     HTTP/1.1 200 OK
 *     Content-Type: application/json
 *
 *     [{
 *        "description": "Plage de sable",
 *        "location": {
 *          "type": "Point",
 *           "coordinates": [
 *              48.862725,
 *              2.287592
 *            ]
 *         },
 *        "picture": "https://www.partir.com/images/plages/thailande-plage-rai-leh.jpg",
 *        "creation_date": "2020-11-06T08:53:12.467Z",
 *        "last_mod_date": "2020-11-06T08:53:12.467Z",
 *        "userId": "5f981e64eeac3042b0e27b86",
 *        "id": "5fa50ef8ab605f53789adb8c"
 *      },
 *      {
 *        "description": "Parc en Suisse",
 *        "location": {
 *          "type": "Point",
 *           "coordinates": [
 *              50.52464,
 *              2.1246
 *            ]
 *         },
 *        "picture": "https://www.coucoulasuisse.com/images/parc-national-suisse.jpg",
 *        "creation_date": "2020-10-06T09:53:12.467Z",
 *        "last_mod_date": "2020-10-06T09:53:12.467Z",
 *        "userId": "5f981e64eeac3042b0e27b86",
 *        "id": "5fa50ef8ab605f53798dddd8c"
 *      }]
 */

/* GET pictures listing. */
router.get('/', utils.getUser, function (req, res, next) {
  Picture
  .find({
    userId: req.params.userId
  })
  .sort('picture')
  .exec(function (err, pictures) {
    if (err) {
      return next(err);
    }
    res.send(pictures);
  });
});


/**
 * @api {get} /users/:userId/pictures/:pictureId Retrieve a picture
 * @apiName RetrievePicture
 * @apiGroup Picture
 * @apiVersion 1.0.0
 * @apiDescription Retrieves one Picture.
 *
 * @apiUse PictureIdInUrlPath
 * @apiUse PictureInResponseBody
 * @apiUse PictureIncludes
 * @apiUse PictureNotFoundError
 *
 * @apiExample Example
 *     GET /users/5f981e64eeac3042b0e27b86/pictures/5fa50ef8ab605f53789adb8c HTTP/1.1
 *
 * @apiSuccessExample 200 OK
 *     HTTP/1.1 200 OK
 *     Content-Type: application/json
 *
 *     {
 *        "description": "Plage de sable",
 *        "location": {
 *          "type": "Point",
 *           "coordinates": [
 *              48.862725,
 *              2.287592
 *            ]
 *         },
 *        "picture": "https://www.partir.com/images/plages/thailande-plage-rai-leh.jpg",
 *        "creation_date": "2020-11-06T08:53:12.467Z",
 *        "last_mod_date": "2020-11-06T08:53:12.467Z",
 *        "userId": "5f981e64eeac3042b0e27b86",
 *        "id": "5fa50ef8ab605f53789adb8c"
 *      }
 */
router.get('/:pictureId', utils.getUser, getPicture, function (req, res, next) {
  res.send(req.picture);
});

/**
 * @api {post} /users/:userId/pictures Create a picture
 * @apiName CreatePicture
 * @apiGroup Picture
 * @apiVersion 1.0.0
 * @apiDescription Create a new Picture.
 *
 * @apiUse PictureInRequestBody
 * @apiUse PictureInResponseBody
 * @apiUse PictureValidationError
 * @apiUse PictureNotFoundError
 * @apiSuccess (Response body) {String} id A unique identifier for the picture generated by the server
 * @apiUse UserAuthorizationError
 * @apiUse UserUnauthorizedError
 *
 * @apiExample Example
 *     POST /users/5f981e64eeac3042b0e27b86/pictures HTTP/1.1
 *     Content-Type: application/json
 *
 *     {
 *         "description": "Plage de sable",
 *         "location":
 *            {
 *              "type": "Point",
 *              "coordinates": [100.878393, 12.930719]
 *            },
 *          "picture":"https://www.partir.com/images/plages/thailande-plage-rai-leh.jpg"
 *      }
 *
 * @apiSuccessExample 201 Created
 *     HTTP/1.1 201 Created
 *     Content-Type: application/json
 *     Location: https://odos-archioweb.herokuapp.com/5fa50ef8ab605f53789adb8c
 *
 *     {
 *        "description": "Plage de sable",
 *        "location": {
 *          "type": "Point",
 *           "coordinates": [
 *              48.862725,
 *              2.287592
 *            ]
 *         },
 *        "picture": "https://www.partir.com/images/plages/thailande-plage-rai-leh.jpg",
 *        "creation_date": "2020-11-06T08:53:12.467Z",
 *        "last_mod_date": "2020-11-06T08:53:12.467Z",
 *        "userId": "5f981e64eeac3042b0e27b86",
 *        "id": "5fa50ef8ab605f53789adb8c"
 *      }
 */
router.post('/', utils.getUser, utils.authenticate, authorization, function (req, res, next) {
  // Retrieve the user ID from the URL.
  const user = req.params.userId;
  // Create a new picture from the JSON in the request body
  const newPicture = new Picture(req.body);
  newPicture.set('userId', user);
  // Save that document
  newPicture.save(function (err, savedPicture) {
    if (err) {
      return next(err);
    }
    // Send the saved document in the response
    debug(`New picture "${savedPicture.description}"`);
    res.status(201).send(savedPicture);
  });
});


/**
 * @api {patch} /users/:userId/pictures/:pictureId Partially update a picture
 * @apiName PartiallyUpdatePicture
 * @apiGroup Picture
 * @apiVersion 1.0.0
 * @apiDescription Partially updates a picture's data (only the properties found in the request body will be updated).
 * All properties are optional.
 *
 * @apiUse PictureIdInUrlPath
 * @apiParam (Request body) {String{3...50}} description The description of the picture (must be unique)
 * @apiParam (Request body) {String} picture The url of the picture
 * @apiUse PictureInResponseBody
 * @apiUse PictureNotFoundError
 * @apiUse PictureValidationError
 * @apiUse UserAuthorizationError
 * @apiUse UserUnauthorizedError
 *
 * @apiExample Example
 *     PATCH /users/5f981e64eeac3042b0e27b86/pictures/5fa50ef8ab605f53789adb8c HTTP/1.1
 *     Content-Type: application/json
 *
 *     {
 *       "description": "Plage de sable à Pattaya"
 *     }
 *
 * @apiSuccessExample 200 OK
 *     HTTP/1.1 200 OK
 *     Content-Type: application/json
 *
 *     {
 *        "description": "Plage de sable à Pattaya",
*         "location": {
 *          "type": "Point",
 *           "coordinates": [
 *              48.862725,
 *              2.287592
 *            ]
 *         },
 *        "picture": "https://www.partir.com/images/plages/thailande-plage-rai-leh.jpg",
 *        "creation_date": "2020-11-06T08:53:12.467Z",
 *        "last_mod_date": "2020-12-06T11:54:16.467Z",
 *        "userId": "5f981e64eeac3042b0e27b86",
 *        "id": "5fa50ef8ab605f53789adb8c"
 *      }
 */
router.patch('/:pictureId', utils.authenticate, utils.getUser, getPicture, authorizationUserPicture, function (req, res, next) {
  // res.send(req.picture.name);
  // Update all properties (regardless of whether they are in the request body or not)
  if (req.body.description !== undefined) {
    req.picture.description = req.body.description;
  }

  if (req.body.picture !== undefined) {
    req.picture.picture = req.body.picture;
  }

  req.picture.last_mod_date = new Date();

  req.picture.save(function (err, savedPicture) {
    if (err) {
      return next(err);
    }

    debug(`Updated picture "${savedPicture.description}"`);
    res.send(savedPicture);
  });
});


/**
* @api {delete} /users/:userId/pictures/:pictureId Delete a picture
* @apiName DeletePicture
* @apiGroup Picture
* @apiVersion 1.0.0
* @apiDescription Permanently deletes a picture.
*
* @apiUse PictureIdInUrlPath
* @apiUse PictureNotFoundError
* @apiUse UserAuthorizationError
* @apiUse UserUnauthorizedError
*
* @apiExample Example
*     DELETE /users/5f981e64eeac3042b0e27b86/pictures/5fa50ef8ab605f53789adb8c HTTP/1.1
*
* @apiSuccessExample 204 No Content
*     HTTP/1.1 204 No Content
*/
router.delete('/:pictureId', utils.authenticate, utils.getUser, getPicture, authorizationUserPicture, function (req, res, next) {
  req.picture.remove(function (err) {
    if (err) {
      return next(err);
    }

    debug(`Deleted picture "${req.picture.description}"`);
    res.sendStatus(204);
  });
});

// Get the picture by id
function getPicture(req, res, next) {
  // get the id of the picture by the param
  const id = req.params.pictureId;
  if (!ObjectId.isValid(id)) {
    return pictureNotFound(res, id);
  }

  // get the picture by id
  Picture.findById(req.params.pictureId, function(err, picture) {
    if (err) {
      return next(err);
    } else if (!picture) {
      return pictureNotFound(res, id);
    }
    req.picture = picture;
    next();
  });
}

/**
 * Responds with 404 Not Found and a message indicating that the movie with the specified ID was not found.
 */
function pictureNotFound(res, pictureId) {
  return res.status(404).type('text').send(`No picture found with ID ${pictureId}`);
}

// Authorization to do something with the id of user in the param
function authorization(req, res, next) {
  // Authorization
  if (req.currentUserId != req.params.userId) {
    return res.status(403).send("You're not allowed to do that")
  }
  next();
}

// Authorization to do something with the id of user in the param and the id of the user on the picture
function authorizationUserPicture(req, res, next) {
  // Authorization
  if (req.currentUserId != req.params.userId || req.currentUserId != req.picture.userId) {
    return res.status(403).send("You're not allowed to do that")
  }
  next();
}


/**
 * @apiDefine PictureIdInUrlPath
 * @apiParam (URL path parameters) {String} id The unique identifier of the picture to retrieve
 */

/**
 * @apiDefine PictureInRequestBody
 * @apiParam (Request body) {String{3...50}} description The description of the picture (must be unique)
 * @apiParam (Request body) {String} location The location of the picture
 * @apiParam (Request body) {Number{longitude/latitude}} coordinates Coordinates of the picture
 * @apiParam (Request body) {String} picture The url of the picture
 * */

/**
 * @apiDefine PictureInResponseBody
 * @apiSuccess (Response body) {String{3...50}} description The description of the picture (must be unique)
 * @apiSuccess (Response body) {String} location The location of the picture
 * @apiSuccess (Response body) {Number} coordinates Coordinates of the picture
 * @apiSuccess (Response body) {String} picture The url of the picture
 * @apiSuccess (Response body) {Date} creation_date The date of the picture's creation
 * @apiSuccess (Response body) {Date} last_mod_date The date at which the picture was modified
 * @apiSuccess (Response body) {Schema.Types.ObjectId} userId An Id which is referencing to the user who create the picture
 */

 /**
 * @apiDefine PictureIncludes
 */

/**
 * @apiDefine PictureNotFoundError
 *
 * @apiError {Object} 404/NotFound No Picture/User was found corresponding to the ID in the URL path
 *
 * @apiErrorExample {json} 404 Not Found
 *     HTTP/1.1 404 Not Found
 *     Content-Type: text/plain
 *
 *     No Picture found with ID 5fa50ef8ab605f53789adb8c
 */


/**
 * @apiDefine PictureValidationError
 *
 * @apiError {Object} 422/UnprocessableEntity Some of the Picture's properties are invalid
 *
 * @apiErrorExample {json} 422 Unprocessable Entity
 *     HTTP/1.1 422 Unprocessable Entity
 *     Content-Type: application/json
 *
 *     {
 *       "errors": {
 *         "location.coordinates": ValidatorError: 12.930719, 100.878393 is not a valid longitude/latitude(/altitude) coordinates array {
 *           "properties": [Object],
 *           "kind": "user defined",
 *           "path": "location.coordinates",
 *           "value": "[12.930719, 100.878393]",
 *           "reason": undefined,
 *           [Symbol(mongoose:validatorError)]: true
 *         }
 *       },
 *      "_message": "Picture validation failed"
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
