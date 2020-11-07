const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

// Define the schema for users
const userSchema = new Schema({
  username: {
      type : String,
      match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
      required: [true, "can't be blank"],
      unique: true,

  },
  email:{
      type : String,
      match: [/\S+@\S+\.\S+/, 'is invalid'],
      required: [true, "can't be blank"],
      unique: true,
  },
  password:{
      type : String,
      required: [true, "can't be blank"],
  },
  registrationDate:{
    type: Date,
    default: Date.now
  },
});

userSchema.plugin(uniqueValidator, {message: 'This username {VALUE} is already taken'});

// Do not send the password in the response
userSchema.set('toJSON', {
   transform: transformJsonUser
});
function transformJsonUser(doc, json, options) {
  // Remove the hashed password and __v from the generated JSON.
  delete json.password;
  delete json.__v;
  return json;
}

// Create the model from the schema and export it
module.exports = mongoose.model('User', userSchema);
