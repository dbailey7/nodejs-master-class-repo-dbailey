/*
 * This is a module to send an email to notify a Tony's Pizza House customer that their
 * pizza order is on its way!  If you want to acctually run this example, you must replace 
 * the strings beginning with "YOUR-" with your own values.
 */

var DOMAIN = 'YOUR-DOMAIN';
var mailgun = require('mailgun-js')({
  apiKey: "YOUR-API-KEY",
  domain: DOMAIN
});

var data = {
  to: 'YOUR-VERIFIED-EMAIL',
  from: 'Tony's Pizza House <YOUR-SANDBOX-EMAIL>',
  subject: 'Your Order Form Tony's Pizza House',
  text: 'Your tasty pizza is on its way!'
};

mailgun.messages().send(data, function (error, body) {
  if(!error, body){
    console.log('Success: test message ', data.text, ' was sent okay.');
    console.log('Body is ', body);
  } else {
    console.log('Error: message test send failed; error was: ', error);
  }
});
