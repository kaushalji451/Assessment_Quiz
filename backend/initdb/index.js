const mongoose = require("mongoose");
const Question = require("../models/question");
const initdata = require("./data");


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

const initDb = async () => {
let data = await Question.insertMany(initdata.data);
  console.log("data was initilize",data);
};
initDb();
