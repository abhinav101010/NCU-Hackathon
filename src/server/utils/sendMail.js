const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendTeamCode = async (email, teamCode) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Hackathon Registration Successful",
    html: `
      <h2>Welcome to the Hackathon 🚀</h2>
      <p>Your Team Code:</p>
      <h1>${teamCode}</h1>
      <p>Keep this code safe.</p>
    `,
  });
};

module.exports = sendTeamCode;