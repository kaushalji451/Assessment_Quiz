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
  if (!req.body) {
    return res.status(400).json({ message: "No data provided" });
  }
  try {
    let user = new User(req.body);
    let result = await user.save();
    res.status(200).json({ message: "success", result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/assessment/questions", async (req, res) => {
  let { userId } = req.query;
  if (!userId) {
    return res.status(400).json({ message: "No userId provided" });
  }
  try {
    let user = await User.findById(userId);
    let questions = await Question.find({
      questiontype: { $in: ["Aptitude", "Personality Test", user.position] },
    });
    res.status(200).json({ message: "success", questions });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/assessment/score", async (req, res) => {
  // let {correctAnswer, timeLeft, totalQuestion} = req.body;
  let { userId } = req.query;
  let { correctAnswer, timeLeft, totalQuestion, percentage } = req.body;
  if (!userId) {
    return res.status(400).json({ message: "No userId provided" });
  }
  if (!correctAnswer || !timeLeft || !totalQuestion || !percentage) {
    return res.status(400).json({ message: "No data provided" });
  }
  try {
    let score = new Score({
      correctAnswer,
      timeLeft,
      totalQuestion,
      percentage,
    });
    let scoreData = await score.save();
    let user = await User.findById(userId);
    user.score = scoreData._id;
    await user.save();
    res.status(200).json({ message: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/assessment/sendEmail", async (req, res) => {
  let { userId } = req.query;
  if (!userId) {
    return res.status(400).json({ message: "No userId provided" });
  }
  try {
    let user = await User.findById(userId).populate("score");
    sendEmailCandidate(user);
    sendEmailHr(user);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
