const express = require('express');
const router = express.Router({
  mergeParams: true
});
const List = require('../models/list');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const debug = require('debug')('demo:people');

// GET list of all lists
router.get('/', function(req, res, next) {
  // res.send('lists')
  List
    .find()
    .sort('name')
    .exec(function(err, lists) {
      if (err) {
        return next(err);
      }
      res.send(lists);
    });
});

router.get('/:listId', getList, function(req, res, next) {
  // res.send(req.list);
  List
    .find(req.list)
    .populate('user')
    .exec(function(err, list) {
      if (err) {
        return next(err);
      }
      res.send(list);
      // res.send(list.user.username);
    });
});
// 5f85b4c7f80b3609a0f7b821 -> Asiro (5f85b4a7f80b3609a0f7b820)
// 5f85b4e9f80b3609a0f7b822 -> Asyx (5f85b496f80b3609a0f7b81f)

// POST new list
router.post('/', getList, function(req, res, next) {
  // Retrieve the user ID from the URL.
  const user = req.params.userId;
  const picture = req.body.picture;
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


// PUT the name of a list
router.patch('/:listId', getList, function(req, res, next) {
  // res.send(req.list.name);
  // Update all properties (regardless of whether they are in the request body or not)
  if (req.body.name !== undefined) {
    req.list.name = req.body.name;
  }

  if (req.body.public !== undefined) {
    req.list.public = req.body.public;
  }

  if (req.body.picture !== undefined) {
    req.list.picture = req.body.picture;
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


//DELETE one list
router.delete('/:listId', getList, function(req, res, next) {
  req.list.remove(function(err) {
    if (err) {
      return next(err);
    }

    debug(`Deleted list "${req.list.name}"`);
    res.sendStatus(204);
  });
});

// Get the list by id
function getList(req, res, next) {
  // get the id of the list by the param
  const listId = req.params.listId;
  // if (!ObjectId.isValid(listId)) {
  //   return listNotFound(res, listId);
  // }
  // get the list by id
  List.findById(req.params.listId, function(err, list) {
    if (err) {
      return next(err);
    }
    // } else if (!list) {
    //   return listNotFound(res, listId);
    // }

    req.list = list;
    next();
  });
}

module.exports = router;
