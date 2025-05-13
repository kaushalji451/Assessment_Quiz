const express = require("express");
const app = express();
const port = 8080;
const cors = require("cors");
const mongoose = require("mongoose");
const Question = require("./models/question");
const User = require("./models/user");
const Score = require("./models/score");
const dotenv = require("dotenv");
dotenv.config();
const sendEmailHr = require("./function/sendEmail1");
const sendEmailCandidate = require("./function/sendEmail2");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const MONGO_URL = "mongodb://127.0.0.1:27017/assisment";
main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.post("/assessment/user", async (req, res) => {
  let user = new User(req.body);
  console.log(user);
  let result = await user.save();
  res.json({ message: "successs", result });
});

app.get("/assessment/questions", async (req, res) => {
  let { userId } = req.query;
  let user = await User.findById(userId);

  let questions = await Question.find({
    questiontype: { $in: ["Aptitude", "Personality Test", user.position] },
  });
  res.json({ message: "successs", questions});
});

app.post("/assessment/score",async(req,res)=>{
  // let {correctAnswer, timeLeft, totalQuestion} = req.body;
  let {userId} = req.query;
  let {correctAnswer, timeLeft, totalQuestion,percentage} = req.body;
  let score = new Score({
    correctAnswer,
    timeLeft,
    totalQuestion,
    percentage
  });
  let scoreData = await score.save();
  let user = await User.findById(userId);
  user.score = scoreData._id;
  await user.save();
  res.json({message : "success"});
})


app.get("/assessment/sendEmail", async (req, res) => {
  let {userId} = req.query;
  let user = await User.findById(userId).populate("score");
  console.log("this is user user",user);
  sendEmailCandidate(user);
  sendEmailHr(user);
  res.json({ message: "Email sent successfully" });
});


app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
