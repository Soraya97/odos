const express = require('express');
const router = express.Router({
  mergeParams: true
});
const List = require('../models/list');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const debug = require('debug')('demo:lists');
const utils = require('./utils');

// ------ WEBSOCKET ------
const webSocket = require('../websocket/dispatcher');

/**
 * @api {get} /users/:userId/lists Retrieve all lists
 * @apiName RetrieveLists
 * @apiGroup List
 * @apiVersion 1.0.0
 * @apiDescription Retrieves a list of lists
 *
 * @apiUse ListInResponseBody
 * @apiUse ListIncludes
 * @apiUse ListNotFoundError
 * @apiUse ListAuthorizationError
 *
 * @apiExample Example
 *     GET /users/5f981e64eeac3042b0e27b86/lists HTTP/1.1
 *
 * @apiSuccessExample 200 OK
 *     HTTP/1.1 200 OK
 *     Content-Type: application/json
 *
 *     [{
 *        "picture":[],
 *        "public":true,
 *        "_id":"5f9fc0c61704e25b2c33e410",
 *        "name":"Chat",
 *        "creationDate":"2020-11-02T08:18:14.908Z",
 *        "modificationDate":"2020-11-02T08:18:14.908Z",
 *        "user":"5f981e64eeac3042b0e27b86","__v":0},
 *      {
 *        "picture":[],
 *        "public":true,
 *        "_id":"5f9fc06afa4bf011e030625c",
 *        "name":"Party",
 *        "creationDate":"2020-11-02T08:16:42.329Z",
 *        "modificationDate":"2020-11-02T08:16:42.329Z",
 *        "user":"5f981e64eeac3042b0e27b86","__v":0}
 *     }]
 */
router.get('/', utils.authenticate, authorization, function(req, res, next) {
  // Find the lists
  List
    .find({
      user: req.currentUserId
    })
    // .populate('user')
    // .populate('picture')
    .sort('name')
    .exec(function(err, lists) {
      if (err) {
        return next(err);
      }

      // Websocket
      const nbLists = lists.length;
      webSocket.nbLists(nbLists);

      res.send(lists);
    });

    //   Picture.aggregate([
    //     {
    //       $lookup: {
    //         from: 'pictures',
    //         localField: '_id',
    //         foreignField: 'userId',
    //         as: 'nbPictures'
    //       }
    //     },
    //     {
    //       $unwind: '$nbPictures'
    //     },
    //       {
    //       $group: {
    //         _id: '$_id',
    //         username: { $first: '$username' },
    //         nbPictures: { $sum: 1}
    //       }
    //     },
    //     {
    //       $sort: {
    //         username: 1
    //       }
    //     },
    //   ],function (err, pictures) => {
    //     if (err) {
    //       return next(err);
    //     }
    //
    //
    //   const aggregatedDocuments = results.map(result => new Person(result));
    //   res.send(aggregatedDocuments);
    // });
});

/**
 * @api {get} /users/:userId/lists/:listId Retrieve a list
 * @apiName RetrieveList
 * @apiGroup List
 * @apiVersion 1.0.0
 * @apiDescription Retrieves one list.
 *
 * @apiUse ListIdInUrlPath
 * @apiUse ListInResponseBody
 * @apiUse ListIncludes
 * @apiUse ListNotFoundError
 * @apiUse ListAuthorizationError
 *
 * @apiExample Example
 *     GET /users/5f981e64eeac3042b0e27b86/lists/5f98321aabf23b2cfce0fe76 HTTP/1.1
 *
 * @apiSuccessExample 200 OK
 *     HTTP/1.1 200 OK
 *     Content-Type: application/json
 *
 *     [{
 *        "picture":[],
 *        "public":true,
 *        "_id":"5f98321aabf23b2cfce0fe76",
 *        "name":"Vacances",
 *        "creationDate":"2020-10-27T14:43:38.484Z",
 *        "modificationDate":"2020-10-27T14:43:38.485Z",
 *        "user":"5f981e64eeac3042b0e27b86","__v":0}
 *      }]
 */
router.get('/:listId', utils.authenticate, getList, authorizationUserList, function(req, res, next) {
  // Find the list
  res.send(req.list);
  // List
  //   .find(req.list)
  //   .populate('user')
  //   .populate('picture')
  //   .exec(function(err, list) {
  //     if (err) {
  //       return next(err);
  //     }
  //     res.send(list);
  //   });
});


/**
 * @api {post} /users/:userId/lists Create a list
 * @apiName CreateList
 * @apiGroup List
 * @apiVersion 1.0.0
 * @apiDescription Create a new list.
 *
 * @apiUse ListInRequestBody
 * @apiUse ListInResponseBody
 * @apiUse ListValidationError
 * @apiSuccess (Response body) {String} id A unique identifier for the list generated by the server
 * @apiUse ListAuthorizationError
 * 
 * @apiExample Example
 *     POST /users/5f981e64eeac3042b0e27b86/lists HTTP/1.1
 *     Content-Type: application/json
 *
 *     {
 *       "name": "Vacances",
 *     }
 *
 * @apiSuccessExample 201 Created
 *     HTTP/1.1 201 Created
 *     Content-Type: application/json
 *     Location: https://odos-archioweb.herokuapp.com/5f981e64eeac3042b0e27b86
 *
 *     [{
 *        "picture":[],
 *        "public":true,
 *        "_id":"5f98321aabf23b2cfce0fe76",
 *        "name":"Vacances",
 *        "creationDate":"2020-10-27T14:43:38.484Z",
 *        "modificationDate":"2020-10-27T14:43:38.485Z",
 *        "user":"5f981e64eeac3042b0e27b86","__v":0}
 *      }]
 */
router.post('/', utils.authenticate, authorization, function(req, res, next) {
  // Retrieve the user ID from the URL.
  const user = req.params.userId;
  // res.send(req.params.userId);
  // Create list and send response...
  const newList = new List(req.body);
  newList.set('user', user);

  newList.save(function(err, savedList) {
    if (err) {
      return next(err);
    }

    debug(`New list "${savedList.name}"`);
    res.status(201).send(savedList);
  });
});


/**
 * @api {patch} /users/:userId/lists/:listId Partially update a list and add a picture
 * @apiName PartiallyUpdateList
 * @apiGroup List
 * @apiVersion 1.0.0
 * @apiDescription Partially updates a list's data (only the properties found in the request body will be updated).
 * All properties are optional.
 *
 * @apiUse ListIdInUrlPath
 * @apiUse ListInRequestBody
 * @apiUse ListInResponseBody
 * @apiUse ListNotFoundError
 * @apiUse ListValidationError
 * @apiUse ListAuthorizationError
 * 
 * @apiExample Example
 *     PATCH /users/5f981e64eeac3042b0e27b86/lists/5f9fca8bf677aa3dcce8a620 HTTP/1.1
 *     Content-Type: application/json
 *
 *     {
 *       "name": Plages
 *     }
 *
 * @apiSuccessExample 200 OK
 *     HTTP/1.1 200 OK
 *     Content-Type: application/json
 *
 *      [{
 *        "picture":[],
 *        "public":true,
 *        "_id":"5f98321aabf23b2cfce0fe76",
 *        "name":"Plages",
 *        "creationDate":"2020-10-27T14:43:38.484Z",
 *        "modificationDate":"2020-10-27T14:43:38.485Z",
 *        "user":"5f981e64eeac3042b0e27b86","__v":0}
 *      }]
 */
router.patch('/:listId', utils.authenticate, getList, authorizationUserList, function(req, res, next) {
  // Update all properties (regardless of whether they are in the request body or not)
  if (req.body.name !== undefined) {
    req.list.name = req.body.name;
  }

  if (req.body.public !== undefined) {
    req.list.public = req.body.public;
  }

  if (req.body.picture !== undefined) {
    req.list.picture.push(req.body.picture);
  }

  req.list.modificationDate = new Date();

  req.list.save(function(err, savedList) {
    if (err) {
      return next(err);
    }

    debug(`Updated list "${savedList.name}"`);
    res.send(savedList);
  });
});

/**
* @api {delete} /users/:userId/lists/:listId/picture/:pictureId Delete a picture from a list
* @apiName DeletePictureList
* @apiGroup List
* @apiVersion 1.0.0
* @apiDescription Permanently deletes a picture from a list.
*
* @apiUse ListIdInUrlPath
* @apiUse ListNotFoundError
* @apiUse ListAuthorizationError

* @apiExample Example
*     DELETE /users/5f981e64eeac3042b0e27b86/lists/5f9fca8bf677aa3dcce8a620/picture/5f981e64eeac3042b0e27b86 HTTP/1.1
*
* @apiSuccessExample 204 No Content
*     HTTP/1.1 204 No Content
*/
router.delete('/:listId/picture/:pictureId', utils.authenticate, getList, authorizationUserList, function(req, res, next) {
  req.list.picture.splice(req.list.picture.indexOf(req.params.pictureId), 1);

  req.list.modificationDate = new Date();

  req.list.save(function(err, savedList) {
    if (err) {
      return next(err);
    }

    debug(`Picture deleted from "${savedList.name}"`);
    res.send(savedList);
  });
});


/**
* @api {delete} /users/:userId/lists/:listId Delete a list
* @apiName DeleteList
* @apiGroup List
* @apiVersion 1.0.0
* @apiDescription Permanently deletes a list.
*
* @apiUse ListIdInUrlPath
* @apiUse ListNotFoundError
* @apiUse ListAuthorizationError

* @apiExample Example
*     DELETE /users/5f981e64eeac3042b0e27b86/lists/5f9fca8bf677aa3dcce8a620 HTTP/1.1
*
* @apiSuccessExample 204 No Content
*     HTTP/1.1 204 No Content
*/
router.delete('/:listId', utils.authenticate, getList, authorizationUserList, function(req, res, next) {
  // Delete the list
  req.list.remove(function(err) {
    if (err) {
      return next(err);
    }

    debug(`Deleted list "${req.list.name}"`);
    res.sendStatus(204);
  });
});


/** OTHERS MIDDLEWARES**/

// Get the list by id
function getList(req, res, next) {
  // get the id of the list by the param
  const id = req.params.listId;
  if (!ObjectId.isValid(id)) {
    return listNotFound(res, id);
  }

  // get the list by id
  List.findById(req.params.listId, function(err, list) {
    if (err) {
      return next(err);
    } else if (!list) {
      return listNotFound(res, id);
    }
    req.list = list;
    next();
  });
}

function listNotFound(res, listId) {
  return res.status(404).type('text').send(`No list found with ID ${listId}`);
}

// Authorization to do something with the id of user in the param and the id of the user on the list
function authorizationUserList(req, res, next) {
  // Authorization
  if (req.currentUserId != req.params.userId || req.currentUserId != req.list.user) {
    return res.status(403).send("You're not allowed to do that")
  }
  next();
}

// Authorization to do something with the id of user in the param
function authorization(req, res, next) {
  // Authorization
  if (req.currentUserId != req.params.userId) {
    return res.status(403).send("You're not allowed to do that")
  }
  next();
}


/**
 * @apiDefine ListIdInUrlPath
 * @apiParam (URL path parameters) {String} id The unique identifier of the list to retrieve
 */

/**
 * @apiDefine ListInRequestBody
 * @apiParam (Request body) {String{minlength: 3}} name The name of the list (must be unique)
 * @apiParam (Request body) {Boolean{default: false}} public Make the list private or public
 * @apiParam (Request body) {Schema.Types.ObjectId} userId An Id who is referencing to the user who create the list (eg: `5f981e64eeac3042b0e27b86`)
 * @apiParam (Request body) {Schema.Types.ObjectId} pictureId An Id who is referencing to the picture who is in the list (eg: `A CHANGER`)
 * */

/**
 * @apiDefine ListInResponseBody
 * @apiSuccess (Response body) {Boolean{default: false}} public Make the list private or public
 * @apiSuccess (Response body) {String} id An Id which is referencing the list (eg: `5f98321aabf23b2cfce0fe76`)
 * @apiSuccess (Response body) {String} name The name of the list sorted alphabetically
 * @apiSuccess (Response body) {Date} creationDate The date at which the list was created
 * @apiSuccess (Response body) {Date} modificationDate The date at which the list was modified
 * @apiSuccess (Response body) {Schema.Types.ObjectId} userId An Id who is referencing to the user who create the list
 * @apiSuccess (Response body) {Schema.Types.ObjectId} pictureId An Id who is referencing to the picture who is in the list

 */

 /**
 * @apiDefine ListIncludes
 */

/**
 * @apiDefine ListNotFoundError
 *
 * @apiError {Object} 404/NotFound No List was found corresponding to the ID in the URL path
 *
 * @apiErrorExample {json} 404 Not Found
 *     HTTP/1.1 404 Not Found
 *     Content-Type: text/plain
 *
 *     No list found with ID 5f98321aabf23b2cfce0fe76
 */

/**
 * @apiDefine ListValidationError
 *
 * @apiError {Object} 422/UnprocessableEntity Some of the List's properties are invalid
 *
 * @apiErrorExample {json} 422 Unprocessable Entity
 *     HTTP/1.1 422 Unprocessable Entity
 *     Content-Type: application/json
 *
 *     {
 *       "errors": {
 *         "name": ValidatorError: List name Oarty already exists {
 *           "properties": [Object],
 *           "kind": "unique",
 *           "path": "name",
 *           "value": "Party",
 *           "reason": undefined,
 *           [Symbol(mongoose:validatorError)]: true
 *         }
 *       },
 *      "_message": "List validation failed"
 *     }
 */

 /**
 * @apiDefine ListAuthorizationError
 *
 * @apiError {Object} 403/Forbidden You're not allowed to do that
 *
 * @apiErrorExample {json} 403 Forbidden
 *     HTTP/1.1 403 Forbidden
 *     Content-Type: text/plain
 *
 *     You're not allowed to do that
 */
module.exports = router;
