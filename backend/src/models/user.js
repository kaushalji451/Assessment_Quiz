const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  id:{
    type:Schema.Types.UUID,
    require:true
  },
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
  gender: {
    type: String,
    require: true,
  },
  dateOfBirth: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  degree: {
    type: String,
    require: true,
  },
  SOP: {
    type: String,
  },
  cvUrl: {
    type: String
  },
  position: {
    type: String,

  },
  score: {
    type: Schema.Types.ObjectId,
    ref: "Score",
  },
  SOP:{
    type: String,
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
