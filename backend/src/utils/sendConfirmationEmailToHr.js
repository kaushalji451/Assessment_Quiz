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

const sendConfirmationEmailToHr = async (user) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_HR,
    subject: `New Registration Received - ${user.name} - Nivesh Jano`,
    text: `Hello Ashutosh,

A new registration has been submitted on Nivesh Jano.

Here are the user details:
Registration Id : ${user.registrationId}
Name: ${user.name}
Email: ${user.email}
Phone: ${user.phoneno || "N/A"}
Date of Birth: ${user.dob || "N/A"}
Gender: ${user.gender || "N/A"}
Degree: ${user.degree || "N/A"}
Department: ${user.department || "N/A"}

Please review the submission and proceed with the assessment process.

Best regards,
Nivesh Jano Team
`,
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Confirmation email sent to HR:", info.messageId);
  } catch (error) {
    console.error("Error sending email to HR:", error);
  }
};

module.exports = sendConfirmationEmailToHr;
