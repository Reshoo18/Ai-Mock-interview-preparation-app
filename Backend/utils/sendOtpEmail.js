const { Resend } = require("resend");

const resend = new Resend(
  process.env.RESEND_API_KEY
);

const sendOtpEmail = async (email, otp) => {

  try {

    const response = await resend.emails.send({

      from: "onboarding@resend.dev",

      to: email,

      subject: "Interview Prep AI OTP",

      html: `
        <h2>Your OTP Code</h2>
        <h1>${otp}</h1>
        <p>This OTP expires in 5 minutes.</p>
      `,
    });

    console.log("EMAIL SENT");
    console.log(response);

  } catch (error) {

    console.log("EMAIL ERROR");
    console.log(error);

    throw error;
  }
};

module.exports = sendOtpEmail;