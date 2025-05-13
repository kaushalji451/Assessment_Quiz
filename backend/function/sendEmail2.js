const nodemailer = require("nodemailer");
// Setup transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const sendEmail = async (user) => {
  let mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: "Assessment Result Notification",
    text: `Dear ${user.name},

Thank you for completing the assessment as part of our selection process.

Here are your results:

Total Questions: ${user.score.totalQuestion}

Correct Answers: ${user.score.correctAnswer}

Score Percentage: ${user.score.percentage}%

We appreciate the time and effort you invested in taking the test. Our team will review your results and get back to you shortly regarding the next steps in the selection process.

If you have any questions, feel free to reach out.

Best regards,
Ashutosh Tripathi
HR Team
Nivesh Jano`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log("Error sending email:", error);
    }
    console.log("Email sent successfully:", info.response);
  });
};
module.exports = sendEmail;
