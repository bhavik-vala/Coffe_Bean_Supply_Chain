const Schema = require("mongoose").Schema;

//User Schema
const UserSchema = new Schema({
  id: {
    type: String,
    required: true
  },
  mail: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  actor: {
    type: String,
    required: true
  },
  privateKey: {
    type: String,
    required: true
  },
  sessionKey: {
    type: String,
    required: false
  },
  sessionCreatedOn: {
    type: Date,
    required: false
  },
  approved: {
    type: Boolean,
    default: false
  }
});

module.exports = {
  UserSchema
};
