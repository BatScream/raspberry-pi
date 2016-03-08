var mailer = require("nodemailer");
var Gpio = require('onoff').Gpio;
var pir = new Gpio(17, 'in');
var transporter = mailer.createTransport({
  service: 'Gmail',
  auth: {
    user: '*****',
    pass: '*****'
  }
});

var mailOptions = {
  from: 'PI Sensor Alert <*****>',
  to: '*****',
  subject: 'Batscream PI Sensor alert',
  html: '<b>Mr. Clement</b>,<br/><br/>Someone has approached your desk. <br/><br/> At : ' + Date() + ' <br/> Regards,<br/><i>BatScream  PI</i>'
};


var id = setInterval(function() {
  var read = pir.readSync();
  if (read === 1) {
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Message sent: ' + info.response);
      }
    });
  }

}, 2*60*1000)

