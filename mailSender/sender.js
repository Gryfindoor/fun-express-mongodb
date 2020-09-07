const nodemailer = require("nodemailer");

const mailPassword = process.env.EMAIL_PASSWORD;
const email = process.env.EMAIL_ADRESS;

const mailSend = async (mailRecipient, subject, data) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: email,
      pass: mailPassword,
    },
  });

  const mailOptions = {
    from: email,
    to: `${mailRecipient}`,
    subject: `${subject}`,
    html: data,
  };
  

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = mailSend;
