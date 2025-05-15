const express = require("express");
const User = require("../models/user");
const sendEmailHr = require("../utils/sendEmail1");
const sendEmailCandidate = require("../utils/sendEmail2");
const main = require("../initdb/connectDb");

main()

const sendemailRoute = express.Router();

sendemailRoute.get("/", async (req, res) => {
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


module.exports = sendemailRoute;