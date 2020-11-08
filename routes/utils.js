// ------ REQUIRE ------
const jwt = require('jsonwebtoken');
const config = require('../config');
const formatLinkHeader = require('format-link-header');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// ------ MODELS ------
const User = require('../models/user');


/**
 * @api {get} / Get the user by id
 * @apiName GetUser
 * @apiGroup Utils
 * @apiVersion 1.0.0
 * @apiDescription file where the functions that are used in multiple files are located
 *
 * @apiError {Object} 404/NotFound No User was found corresponding to the ID in the URL path
 * @apiErrorExample {json} 404 Not Found
 *     HTTP/1.1 404 Not Found
 *     Content-Type: text/plain
 *
 *     No User found with ID 5f981e64eeac3042b0e27b86
 *
 * @apiError {Object} 401/Unauthorized Something went wrong
 * @apiErrorExample {json} 401 Unauthorized
 *     HTTP/1.1 401 Unauthorized
 *     Content-Type: text/plain
 *
 *     Authorization header is missing
 */
// Get the user by id
exports.getUser = function(req, res, next) {
  // get the id of the user by the param
  const id = req.params.userId;
  if (!ObjectId.isValid(id)) {
    return userNotFound(res, id);
  }

  // get the user by id
  User.findById(req.params.userId, function(err, user) {
    if (err) {
      return next(err);
    } else if (!user) {
      return userNotFound(res, id);
    }
    req.user = user;
    next();
  });
}

// Responds with 404 Not Found and a message indicating that the picture with the specified ID was not found
function userNotFound(res, userId) {
  return res.status(404).type('text').send(`No user found with ID ${userId}`);
}

// Route protections, not accessible until someone is authenticated
// It uses the token
exports.authenticate = function(req, res, next) {
  // Ensure the header is present.
  const authorization = req.get('Authorization');
  if (!authorization) {
    return res.status(401).send('Authorization header is missing');
  }

  // Check that the header has the correct format.
  const match = authorization.match(/^Bearer (.+)$/);
  if (!match) {
    return res.status(401).send('Authorization header is not a bearer token');
  }

  // Extract and verify the JWT.
  const token = match[1];
  jwt.verify(token, config.secretKey, function(err, payload) {
    if (err) {
      return res.status(401).send('Your token is invalid or has expired');
    } else {
      req.currentUserId = payload.sub;
      next(); // Pass the ID of the authenticated user to the next middleware.
    }
  });
}

/**
 * @api {Parse} / Parses the pagination parameters
 * @apiName ParsesParam
 * @apiGroup Utils
 * @apiVersion 1.0.0
 * @apiDescription Parses the pagination parameters (i.e. page & page size) from the request.
 *
 * @apiParam {ExpressRequest} req The Express request object
 * @apiSuccess {Number} return An object with "page" and "pageSize" properties
 */
exports.getPaginationParameters = function(req) {

  // Parse the "page" URL query parameter indicating the index of the first element that should be in the response
  let page = parseInt(req.query.page, 10);
  if (isNaN(page) || page < 1) {
    page = 1;
  }

  // Parse the "pageSize" URL query parameter indicating how many elements should be in the response
  let pageSize = parseInt(req.query.pageSize, 10);
  if (isNaN(pageSize) || pageSize < 0 || pageSize > 100) {
    pageSize = 100;
  }

  return { page, pageSize };
};

/**
 * @api {Add} / Add a link to header
 * @apiName AddLink
 * @apiGroup Utils
 * @apiVersion 1.0.0
 * @apiDescription Adds a Link header to the response (if applicable).
 *
 * @apiParam {String} resourceHref The hyperlink reference of the collection (e.g. "/api/people")
 * @apiParam {Number} page The page being listed
 * @apiParam {Number} pageSize The page size
 * @apiParam {Number} total The total number of elements
 * @apiParam {ExpressResponse} res The Express response object
 */
exports.addLinkHeader = function(resourceHref, page, pageSize, total, res) {

  const links = {};
  const url = config.baseUrl + resourceHref;
  const maxPage = Math.ceil(total / pageSize);

  // Add first & prev links if current page is not the first one
  if (page > 1) {
    links.first = { rel: 'first', url: `${url}?page=1&pageSize=${pageSize}` };
    links.prev = { rel: 'prev', url: `${url}?page=${page - 1}&pageSize=${pageSize}` };
  }

  // Add next & last links if current page is not the last one
  if (page < maxPage) {
    links.next = { rel: 'next', url: `${url}?page=${page + 1}&pageSize=${pageSize}` };
    links.last = { rel: 'last', url: `${url}?page=${maxPage}&pageSize=${pageSize}` };
  }

  // If there are any links (i.e. if there is more than one page),
  // add the Link header to the response
  if (Object.keys(links).length >= 1) {
    res.set('Link', formatLinkHeader(links));
  }
}

/**
 * Returns true if the specified property is among the "include" URL query parameters sent by the client
 */
exports.responseShouldInclude = function(req, property) {

  // Get the "include" URL query parameter
  let propertiesToInclude = req.query.include;
  if (!propertiesToInclude) {
    return false;
  }

  // If it's not an array, wrap it into an array
  if (!Array.isArray(propertiesToInclude)) {
    propertiesToInclude = [ propertiesToInclude ];
  }

  // Check whether the property is inside the array
  return propertiesToInclude.indexOf(property) >= 0;
};
