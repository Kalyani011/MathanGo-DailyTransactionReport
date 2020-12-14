const nodemailer = require("nodemailer");

function sendEmail(report) {
  let messageText = "\nNumber of Transactions:" + report.numberOfTransactions + "\nNumber of Successful Transactions: " + report.numberOfSuccessfulTransactions + "\nVolume(INR): " + report.volumeInINR;

  var transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });
  const message = {
    from: process.env.USERNAME, // Sender address
    to: 'kalyanikawale@gmail.com', // List of recipients
    subject: 'Daily Transaction Report', // Subject line
    text: messageText,
    attachments: [{
      filename: 'DailyTransactions.csv',
      path: './DailyTransactions.csv'
    }]
  };
  transport.sendMail(message, function(err, info) {
    if (err) {
      console.log(err)
    } else {
      console.log(info);
    }
  });
}

module.exports = sendEmail;
