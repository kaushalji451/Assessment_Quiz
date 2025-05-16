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

const sendEmailforRegistration = async (user) => {
  let mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: "Registration Confirmation - Nivesh Jano",
    text: `Dear ${user.name},

Thank you for registering with Nivesh Jano!

We’ve received your details and are excited to have you as part of our assessment process. Below is a summary of your registration:

Name: ${user.name}
Email: ${user.email}

Our team will carefully review your submission and contact you soon regarding the next steps in the selection process.

If you have any questions in the meantime, feel free to reach out.

Warm regards,  
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
module.exports = sendEmailforRegistration;
