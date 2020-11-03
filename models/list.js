const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;
const uniqueValidator = require('mongoose-unique-validator');

// Schema for lists
const listSchema = new Schema({
  name: {
    type: String,
    minlength: 3,
    required: [true, 'List name is required'],
    unique: true
  },
  creationDate: {
    type: Date,
    default: Date.now
  },
  modificationDate: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  picture: [{
    type: Schema.Types.ObjectId,
    ref: 'Picture'
  }],
  public: { type: Boolean, default: false }
});

// Do not send the password in the response
listSchema.set('toJSON', {
   transform: transformJsonList
});

function transformJsonList(doc, json, options) {
  delete json.__v;
  return json;
}

listSchema.plugin(uniqueValidator, { message: 'List name {VALUE} already exists' });

// Model for lists
module.exports = mongoose.model('List', listSchema);
