const mongoose = require("mongoose");
const Question = require("../models/question");
const initdata = require("./data");
const dotenv = require("dotenv")
dotenv.config();
const MONGO_URL = process.env.MONGO_URL
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

const initDb = async () => {
let data = await Question.insertMany(initdata.data);
  console.log("data was initilize",data);
};
initDb();
