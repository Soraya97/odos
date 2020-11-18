// ------ REQUIRE ------
const WebSocket = require('ws');

// ------ LOGGER ------
const { createLogger } = require('../config');

// ------ MODELS ------
const Picture = require('../models/picture');

// ------ VARIABLES ------
let tabCreateUsers = [];



// ------ FUNCTIONS ------
exports.createBackendDispatcher = function(server) {
    // SETUP
    const logger = createLogger('Websocket Odos');

    // COMMUNICATIONS
    const wss = new WebSocket.Server({
        server
    });

    // Handle new user connections.
    wss.on('connection', function(ws) {
        logger.info('New WebSocket user connected');
        tabCreateUsers.push(ws);

        // Forget the mapping when the client disconnects.
        ws.on('close', () => {
            logger.info(`You are disconnected`);
            tabCreateUsers.splice(tabCreateUsers.indexOf(ws), 1);
        });
    });
};

// Counting the number of users
exports.nbUsers = function(users){
    tabCreateUsers.forEach(ws => {
        ws.send('There are ' + users + ' users');
    })
};

// Counting the number of pictures
exports.nbPictures = function(){
  Picture.count(function(err, count) {
    if (err) {
      return;
    }
    tabCreateUsers.forEach(ws => {
      ws.send('There are ' + count + ' pictures');
    })
  });
};

// Get the new pictureNotFound
exports.newPicture = function(picture){
  tabCreateUsers.forEach(ws => {
      ws.send('There is a new picture: ' + picture);
  })
};

// Counting the number of lists
exports.nbLists = function(lists){
    tabCreateUsers.forEach(ws => {
        ws.send('There are ' + lists + ' lists');
    })
};
