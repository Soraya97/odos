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
 * Show all pictures
 * Pagination
 * Example : http://localhost:4000/feed?page=1&pageSize=1
 */

 /**
 * @api {get} /feed Feed of all pictures
 * @apiName RetrieveFeed
 * @apiGroup Feed
 * @apiVersion 1.0.0
 * @apiDescription Retrieves a paginated list of all pictures ordered by title (in alphabetical order).
 *
 * @apiSuccess (Response body) {String{3...50}} description The description of the picture
 * @apiSuccess (Response body) {String} location The location of the picture
 * @apiSuccess (Response body) {Number} coordinates Coordinates of the picture
 * @apiSuccess (Response body) {String} picture The url of the picture
 * @apiSuccess (Response body) {Date} creation_date The date of the picture's creation
 * @apiSuccess (Response body) {Date} last_mod_date The date at which the picture was modified
 * @apiSuccess (Response body) {Schema.Types.ObjectId} userId An Id which is referencing to the user who create the picture
 *
<<<<<<< HEAD
 * @apiParam (URL query parameters) {Date} [min_date] Select only pictures before this specified date
 * @apiParam (URL query parameters) {Date} [max_date] Select only pictures after this specified date
 * @apiParam (URL query parameters) {Number} [page] Which page to display
 * @apiParam (URL query parameters) {Number} [pageSize] How many items per page to display
=======
 * @apiParam (URL query parameters) {Date} [min_date] Select only pictures before this specified date
 * @apiParam (URL query parameters) {Date} [max_date] Select only pictures after this specified date
>>>>>>> 6c9bb946b2ec18d6c8db4096faba3e32785aa062
 *
 * @apiExample Example
 *     GET /feed?page=1&pageSize=1 HTTP/1.1
 *
 * @apiSuccessExample 200 OK
 *     HTTP/1.1 200 OK
 *     Content-Type: application/json
 *     Link: https://odos-archioweb.herokuapp.com/feed?page=1&pageSize=1;"
 *
 *    [
 *       {
 *         "location": {
 *           "type": "Point",
 *           "coordinates": [
 *               48.862725,
 *               2.287592
 *           ]
 *       },
 *         "description": "1 picture",
 *         "picture": "https://source.unsplash.com/random",
 *         "creation_date": "2020-11-04T14:36:46.995Z",
 *         "last_mod_date": "2020-11-04T14:36:46.995Z",
 *         "userId": "5fa198479bb5b63b249b06af",
 *         "id": "5fa2bc7ec26b8d62e8e1b205"
 *      },
 *      {
 *         "location": {
 *           "type": "Point",
 *           "coordinates": [
 *               48.862725,
 *               2.287592
 *           ]
 *      },
 *         "description": "2 picture",
 *         "picture": "https://source.unsplash.com/random",
 *         "creation_date": "2020-11-03T18:33:09.438Z",
 *         "last_mod_date": "2020-11-03T18:33:09.438Z",
 *         "userId": "5fa198479bb5b63b249b06af",
 *         "id": "5fa1a265b941dc1f4096ced3"
 *      }
 *    ]
 */
router.get('/', function(req, res, next) {
  // Count total pictures matching the URL query parameters
  const countQuery = queryPictures(req);
  countQuery.count(function (err, total) {
    if (err) {
      return next(err);
    }

    // Prepare the initial database query from the URL query parameters
    let query = queryPictures(req);

    // Parse pagination parameters from URL query parameters
    const { page, pageSize } = utils.getPaginationParameters(req);

    // Apply the pagination to the database query
    query = query.skip((page - 1) * pageSize).limit(pageSize);

    // Add the Link header to the response
    utils.addLinkHeader('/api/pictures', page, pageSize, total, res);

    // Populate the userId if indicated in the "include" URL query parameter
    if (utils.responseShouldInclude(req, 'user')) {
      query = query.populate('userId');
    }

    // Pictures after a date_min specified by the user
    if (req.query.date_min) {
      query = query.where('creation_date').gte(req.query.date_min);
    }

    // Pictures before a date_max specified by the user
    if (req.query.date_max) {
      query = query.where('creation_date').lte(req.query.date_max);
    }

    // Execute the query
    query.sort({ description: 1 }).exec(function (err, pictures) {
      if (err) {
        return next(err);
      }

      // Websocket
      const nbPictures = pictures.length;
      webSocket.nbPictures(nbPictures);

      res.send(pictures);
    });
  });
});

function queryPictures(req) {

  let query = Picture.find();

  if (Array.isArray(req.query.userId)) {
    const users = req.query.userId.filter(ObjectId.isValid);
    query = query.where('userId').in(users);
  } else if (ObjectId.isValid(req.query.userId)) {
    query = query.where('userId').equals(req.query.userId);
  }

  return query;
}

module.exports = router;
