const mongoose = require("mongoose");
const { Schema } = mongoose;

const scoreSchema = new Schema({
  correctAnswer : {
    type : Number,
    required : true, 
  },
  timeLeft :  {
    type : String,
    required : true,
  },
  totalQuestion : {
    type : Number,
    required : true,
  },
  percentage : {
    type : Number,
    required : true,
  }
});

const Score = mongoose.model("Score", scoreSchema);
module.exports = Score;
