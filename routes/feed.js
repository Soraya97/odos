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
