const express = require("express");
const app = express();
const port = 8080;
const cors = require("cors");
const mongoose = require("mongoose");
const Question = require("./models/question");
const User = require("./models/user");

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

app.post("/user", async (req, res) => {
  let user = new User(req.body);
  console.log(user);
  let result = await user.save();
  res.json({ message: "successs", result });
});

app.get("/questions", async (req, res) => {
  let { userId } = req.query;
  let user = await User.findById(userId);

  let questions = await Question.find({
    questiontype: { $in: ["Aptitude", "Personality Test", user.position] },
  });
  res.json({ message: "successs", questions});
});

app.listen(port, () => {
  console.log(`server is listning on port ${port}`);
});
