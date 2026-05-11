// const { Resend } = require("resend");

// const resend = new Resend(
//   process.env.RESEND_API_KEY
// );

// const sendOtpEmail = async (email, otp) => {

//   try {

//     const response = await resend.emails.send({

//       from: "onboarding@resend.dev",

//       to: email,

//       subject: "Interview Prep AI OTP",

//       html: `
//         <h2>Your OTP Code</h2>
//         <h1>${otp}</h1>
//         <p>This OTP expires in 5 minutes.</p>
//       `,
//     });

//     console.log("EMAIL SENT");
//     console.log(response);

//   } catch (error) {

//     console.log("EMAIL ERROR");
//     console.log(error);

//     throw error;
//   }
// };

// module.exports = sendOtpEmail;

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOtpEmail = async (email, otp) => {
  try {
    const info = await transporter.sendMail({
      from: `"Interview Prep AI" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "OTP Verification",
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>Interview Prep AI</h2>
          <p>Your OTP is:</p>
          <h1>${otp}</h1>
          <p>This OTP will expire in 5 minutes.</p>
        </div>
      `,
    });

    console.log("EMAIL SENT:", info.messageId);

    return true;
  } catch (error) {
    console.log("EMAIL ERROR:", error);
    return false;
  }
};