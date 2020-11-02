// ------ REQUIRE ------
const express = require('express');
const router = express.Router({
  mergeParams: true
});const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const debug = require('debug')('demo:people');
const utils = require('./utils');

// ------ WEBSOCKET ------
const webSocket = require('../websocket/dispatcher');

// ------ MODELS ------
const Picture = require('../models/picture');
const List = require('../models/list');


// ------ RESOURCES ODOS ------
/* GET pictures listing. */
router.get('/', utils.authenticate, authorization, function (req, res, next) {
  Picture
  .find({
    userId: req.currentUserId
  })
  .sort('picture')
  .exec(function (err, pictures) {
    if (err) {
      return next(err);
    }
    res.send(pictures);
  });
});


/* GET one specific picture */
router.get('/:pictureId', utils.authenticate, getPicture, authorizationUserPicture, function (req, res, next) {
  res.send(req.picture);
});


// -- POST --
/**
 * Create a picture
 * Example : http://localhost:3000/users/:uersId/pictures
 * Example body for Postman :
  {
       "description": "First picture",
       "location":
       {
            "type": "Point",
            "coordinates": [ 48.862725, 2.287592 ]
       },
        "picture": "https://source.unsplash.com/random"
  }
 */

/* POST new picture */
router.post('/', utils.authenticate, authorization, getPicture, function (req, res, next) {
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


//   /* PATCH one picture */
router.patch('/:pictureId', utils.authenticate, getPicture, authorizationUserPicture, function (req, res, next) {
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



///* DELETE one picture */
router.delete('/:pictureId', utils.authenticate, getPicture, authorizationUserPicture, function (req, res, next) {
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
  const pictureId = req.params.pictureId;
  // if (!ObjectId.isValid(pictureId)) {
  //   return pictureNotFound(res, pictureId);
  // }
  // get the picture by id
  Picture.findById(req.params.pictureId, function (err, picture) {
    if (err) {
      return next(err);
    } // else if (!picture) {
    //   return pictureNotFound(res, pictureId);
    // }

    req.picture = picture;
    next();
  });
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
 * getPicture: loads the picture corresponding to the ID in the URL path.
 * Responds with 404 Not Found if the ID is not valid or the picture doesn't exist.
 */
// function getPicture(req, res, next) {
//
//   const pictureId = req.params.id;
//   if (!ObjectId.isValid(pictureId)) {
//     return pictureNotFound(res, pictureId);
//   }
//
//   let query = Picture.findById(pictureId)
//   // Populate the picture if indicated in the "include" URL query parameter
//   if (utils.responseShouldInclude(req, 'picture')) {
//     query = query.populate('pictureId');
//   }
//
//   query.exec(function (err, picture) {
//     if (err) {
//       return next(err);
//     } else if (!picture) {
//       return pictureNotFound(res, pictureId);
//     }
//
//     req.picture = picture;
//     next();
//   });
// }

/**
 * Responds with 404 Not Found and a message indicating that the movie with the specified ID was not found.
 */
function pictureNotFound(res, pictureId) {
  return res.status(404).type('text').send(`No picture found with ID ${pictureId}`);
}

module.exports = router;
