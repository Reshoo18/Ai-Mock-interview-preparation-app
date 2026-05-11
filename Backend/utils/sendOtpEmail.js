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

    console.log("SENDING EMAIL TO:", email);

    const info = await transporter.sendMail({
      from: `"Interview Prep AI" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "OTP Verification",
      html: `
        <h2>Your OTP is ${otp}</h2>
        <p>This OTP expires in 5 minutes.</p>
      `,
    });

    console.log("EMAIL SENT SUCCESSFULLY");
    console.log(info);

    return true;

  } catch (error) {

    console.log("EMAIL ERROR:");
    console.log(error);

    return false;
  }
};

module.exports = sendOtpEmail;