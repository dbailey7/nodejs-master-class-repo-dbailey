/*
 * This is a test module for the mailgun.com create domain API.  Enjoy watching!
 * To run this, you must replace the strings beginning with "YOUR-" with your 
 * own values.
 */

var DOMAIN = 'YOUR-DOMAIN';
var mailgun = require('mailgun-js')({
  apiKey: "YOUR-API-KEY",
  domain: DOMAIN
});

mailgun.post('/domains',
  {
    "name": "YOUR-DOMAIN",
    "smtp_password": "YOUR-SMTP-PASSWORD"
  },
  function (error, body) {
    if(!error, body){
      console.log('Success: create domain was tested okay.');
      console.log('Body is ', body);
    } else {
      console.log('Error: get domain failed; error was: ', error);
    }
  }
);
