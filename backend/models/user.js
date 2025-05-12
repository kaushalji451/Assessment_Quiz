const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  phoneno: {
    type: Number,
    require: true,
  },
  position: {
    type: String,
    require: true,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
