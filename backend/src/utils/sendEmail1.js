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
    to: [
        process.env.EMAIL_HRHEAD,
        process.env.EMAIL_HR
    ],
    subject: `Assessment Result – ${user.name}`,
    text: `Dear HR Team,,

I hope this message finds you well.

I am writing to share the assessment result for ${user.name} who recently completed our evaluation process. Below are the details:

Candidate Name: ${user.name}
Candidate Phone Number: ${user.phoneno}
Candidate Position: ${user.position}
Candidate Email: ${user.email}
Total Questions: ${user.score.totalQuestion}
Correct Answers: ${user.score.correctAnswer}
Score Percentage: ${user.score.percentage}%
Time Left: ${user.score.timeLeft} minutes

The candidate's performance has been recorded and their result has been successfully submitted to our system. An acknowledgment email has also been sent to the candidate.

Please let me know if any further action is required from my end.

Best regards,
Ashutosh Tripathi
HR Team
Nivesh Jano`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log("Error sending email:", error);
    }
    console.log("Email sent successfully:");
  });
};
module.exports = sendEmail;
