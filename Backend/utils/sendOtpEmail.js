const nodemailer = require("nodemailer");

const sendOtpEmail = async (email, otp) => {

  try {

    console.log("STEP A");

    console.log(
      "EMAIL_USER:",
      process.env.EMAIL_USER
    );

    console.log(
      "EMAIL_PASS:",
      process.env.EMAIL_PASS
    );

    const transporter =
      nodemailer.createTransport({

        service: "gmail",

        auth: {
          user:
            process.env.EMAIL_USER,

          pass:
            process.env.EMAIL_PASS,
        },

        connectionTimeout: 10000,
        greetingTimeout: 10000,
        socketTimeout: 10000,
      });

    console.log("STEP B");

    const info =
      await transporter.sendMail({

        from:
          process.env.EMAIL_USER,

        to: email,

        subject:
          "Interview Prep AI OTP",

        html: `
          <h2>Your OTP Code</h2>

          <h1>${otp}</h1>

          <p>
            This OTP expires in 5 minutes.
          </p>
        `,
      });

    console.log("STEP C");

    console.log(
      "Email sent:",
      info.response
    );

  } catch (error) {

    console.log(
      "EMAIL ERROR:"
    );

    console.log(error);

    throw error;
  }
};

module.exports =
  sendOtpEmail;