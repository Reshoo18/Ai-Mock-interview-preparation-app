const nodemailer = require("nodemailer");

const sendOtpEmail = async (email, otp) => {
  try {

    const transporter = nodemailer.createTransport({

      host: "smtp.gmail.com",
      port: 587,
      secure: false,

      requireTLS: true,

      tls: {
        family: 4,
        rejectUnauthorized: false,
      },

      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Interview Prep AI OTP",

      html: `
        <h2>Your OTP Code</h2>
        <h1>${otp}</h1>
        <p>This OTP expires in 5 minutes.</p>
      `,
    });
    console.log("BEFORE EMAIL SEND");
    console.log("OTP EMAIL SENT");
    console.log("AFTER EMAIL SEND");
  } catch (error) {

    console.log("EMAIL ERROR:");
    console.log(error);
    
    throw error;
  }
};

module.exports = sendOtpEmail;