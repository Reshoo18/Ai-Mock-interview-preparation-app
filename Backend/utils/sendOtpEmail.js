const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendOtpEmail = async (email, otp) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "OTP Verification",
      html: `<h2>Your OTP is ${otp}</h2>`,
    });

    console.log("EMAIL SENT:", info.messageId);

    return true;
  } catch (error) {
    console.log("EMAIL ERROR:", error);
    return false;
  }
};

module.exports = sendOtpEmail;