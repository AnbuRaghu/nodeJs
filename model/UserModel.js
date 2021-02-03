const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// this model or schema must be designed with respect to our mongodb collection
// we need to create the schema spec
// name
// password
// email
// date of creation

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = User = mongoose.model("users", UserSchema);
//    exporting<==User       it will create a collection called users based on schema spec.
