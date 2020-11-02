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
/**
 * Show all pictures
 * Add a aggregation to count pictures for a liste // je ne sais pas s'il faut finalement le faire ?
 * Example : http://localhost:3000/users/:userId/pictures
 * Pagination
 * Example : http://localhost:3000/users/:userId/pictures?pageSize=3
 */

router.get('/pictures', function (req, res, next) {
  Picture.find().count(function (err, total) {
    if (err) {
      return next(err);
    }

    // Parse pagination parameters from URL query parameters
    const { page, pageSize } = func.getPaginationParameters(req);

    // Aggregation
    Picture.aggregate([
      {
        $lookup: {
          from: 'lists',
          localField: '_id',
          foreignField: 'pictureId',
          as: 'listedPicture'
        }
      },
      {
        $unwind:
        {
          path: "$listedPicture",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $addFields: {
          listedPicture: {
            $cond: {
              if: '$listedPicture',
              then: 1,
              else: 0
            }
          }
        }
      },
      {
        $group: {
          _id: '$_id',
          description: { $first: '$description' },
          location: { $first: '$location' },
          picture: { $first: '$picture' },
          creation_date: { $first: '$creation_date' },
          last_mod_date: { $first: '$last_mod_date' },
          listedPicture: { $sum: '$listedPicture' }
        }
      },
      {
        $sort: {
          description: 1
        }
      },
      {
        $skip: (page - 1) * pageSize
      },
      {
        $limit: pageSize
      }
    ], (err, pictures) => {
      if (err) {
        return next(err);
      }
      console.log(pictures);

      // Add the Link header to the response
      func.addLinkHeader('/pictures', page, pageSize, total, res);

      // Websocket
      const nbPictures = pictures.length;
      webSocket.nbPictures(nbPictures);

      res.send(pictures.map(picture => {

        // Transform the aggregated object into a Mongoose model.
        const serialized = new Picture(picture).toJSON();

        // Add the aggregated property.
        serialized.listedPicture = picture.listedPicture;

        return serialized;
      }));
    });
  });
});


/* GET pictures listing. */
router.get('/', function (req, res, next) {
  Picture.find().sort('picture').exec(function (err, pictures) {
    if (err) {
      return next(err);
    }
    res.send(pictures);
  });
});

module.exports = router;
