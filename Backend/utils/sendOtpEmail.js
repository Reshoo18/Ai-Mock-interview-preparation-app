const nodemailer = require("nodemailer");

const sendOtpEmail = async (email, otp) => {

  try {

    const transporter = nodemailer.createTransport({

      host: "smtp.gmail.com",

      port: 465,

      secure: true,

      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },

      family: 4, // FORCE IPV4
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

    console.log("EMAIL SENT SUCCESS");

  } catch (error) {

    console.log("EMAIL ERROR:");
    console.log(error);

    throw error;
  }
};

module.exports = sendOtpEmail;