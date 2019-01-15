/*
 * This is a test module for the mailgun.com email test send API.  Enjoy watching!
 */

var DOMAIN = 'YOUR-DOMAIN';
var mailgun = require('mailgun-js')({
  apiKey: "YOUR-API-KEY,
  domain: DOMAIN
});

var data = {
  to: 'YOUR-VERIFIED-EMAIL',
  from: 'Excited Sandbox User <YOUR-SANDBOX-EMAIL>',
  subject: 'Hello',
  text: 'Testing some Mailgun awesomness!'
};

mailgun.messages().send(data, function (error, body) {
  if(!error, body){
    console.log('Success: test message ', data.text, ' was sent okay.');
    console.log('Body is ', body);
  } else {
    console.log('Error: message test send failed; error was: ', error);
  }
});
