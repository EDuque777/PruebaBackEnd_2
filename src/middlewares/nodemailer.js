const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'esteban.duque911@gmail.com',
    pass: 'zpfcnghfleafiuvk'
  },
    tls: {
    rejectUnauthorized: false
  }
});
transporter.verify().then(() => {
  console.log('Ready for send mails');
})

module.exports = transporter