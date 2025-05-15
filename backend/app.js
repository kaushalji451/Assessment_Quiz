const express = require("express");
const app = express();
const port = 3001;
const cors = require("cors");
const dotenv = require("dotenv");
const main = require("./initdb/connectDb")
const registrationRoute = require("./routes/registration.route");
const questionsRoute = require("./routes/questions.route");
const scoreRoute = require("./routes/score.route");
const sendemailRoute = require("./routes/sendEmail.route");
dotenv.config();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


main()

app.use("/registration",registrationRoute)
app.use("/questions",questionsRoute);
app.use("/score",scoreRoute);
app.use("/sendEmail",sendemailRoute);

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
