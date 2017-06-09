var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');
const nodemailer = require('nodemailer');



function sendMail(recipient, subject){
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
      host: 'smtp.example.com',
      port: 465,
      secure: true, // secure:true for port 465, secure:false for port 587
      auth: {
          user: 'username@example.com',
          pass: 'userpass'
      }
  });

  let mailOptions = {
      from: '"Xavier Insurance" <xaiver@xavierinsurance.com>', // sender address
      to: recipient, // list of receivers
      subject: 'Your insurance quotes for the day', // Subject line
      text: subject, // plain text body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
  });
}
var recipients = {};

const timeInterval =  60 * 60 * 1000;
setInterval(function() {
  console.log("Sending out emails!");
  var keys = Object.keys(recipients);

  for(var i in keys) {

    var subject = 'Xavier Quote Summary \n';
    var entries = recipients[keys[i]];

    console.log(entries);

    var counter = 1;
    for(entry in entries) {
      var data = entries[entry];
      console.log(entries[entry]);
      subject += `Quote ${counter} : ${data.quote.owner_name} , ${data.quote.model}, ${data.annual_premium}, ${data.timestamp} \n`
      counter++;
    }

    console.log(subject);

    // sendMail(entries, subject);

  }

  recipients = {};
}, timeInterval);

router.post('/', (req, res) => {
  const payload = req.body;

  var context = this;
    fetch('https://j950rrlta9.execute-api.us-east-2.amazonaws.com/v1/ArgoChallenge', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': 'L0Q3GvXCwB9jVSmvaJbw5augw4xHCvMy4Egqim2p'
  },
  body: JSON.stringify( {
    owner_name: payload.ownerName,
    model: payload.jetModel,
    seat_capacity: parseInt(payload.seatCapacity),
    manufactured_date: payload.manDate,
    purchase_price: parseInt(payload.purPrice),
    broker_email: payload.brokEmail
    })
  }).then(function(response) {

    return response.json();
  }).then(function(object) {
    const errors = object.errors;

    if(!object.ok) {
      return res.status(200).json({
                    message: "success",
                    errors: errors,
                  });
    }

    var data = object.data;

    const time = new Date().getTime();
    data.timestamp = time;


    if(payload.brokEmail in recipients) {
      console.log("email exists pushing to previous entry");
      recipients[payload.brokEmail].push( data );
    } else {
      recipients[payload.brokEmail] = [];
      recipients[payload.brokEmail].push( data );
    }

    console.log(recipients[payload.brokEmail]);

    console.log("recipients output !  ");
    console.log(recipients);
    return res.status(200).json({
                  message: "success",
                  errors: errors,
                  quote: data.quote,
                  premium: data.annual_premium
                });

  }).catch(function(error) {
    console.log(error);
  });

});

function validateQuoteForm(payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';

  console.log(payload);

  if (!payload || typeof payload.ownerName !== 'string' || payload.ownerName.trim().length === 0) {
    isFormValid = false;
    errors.ownerName = 'Please provide your full name';
  }

  if (!payload || payload.jetModel.trim().length === 0) {
    isFormValid = false;
    errors.jetModel = 'The jetModel selected is not correct.';
  }

  if (!payload || payload.seatCapacity.trim().length === 0) {
    isFormValid = false;
    errors.seatCapacity = 'The Seat Capacity input is incorrect.';
  }

  if (!payload || payload.manDate.trim().length === 0) {
    isFormValid = false;
    errors.manDate = 'The Date input is incorrect.';
  }

  if (!payload || payload.purPrice.trim().length === 0) {
    isFormValid = false;
    errors.purPrice = 'The Purchase price input is incorrect.';
  }

  if (!payload || typeof payload.brokEmail !== 'string' || payload.brokEmail.trim().length === 0) {
    isFormValid = false;
    errors.brokEmail = 'Please provide your email address.';
  }


  if (!isFormValid) {
    message = 'Check the form for errors.';
  }

  return {
    success: isFormValid,
    message,
    errors
  };
}


module.exports = router;
