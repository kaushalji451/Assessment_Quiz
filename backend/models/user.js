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
  score: {
    type: Schema.Types.ObjectId,
    ref: "Score",
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
