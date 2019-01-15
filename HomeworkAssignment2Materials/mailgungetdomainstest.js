/*
 * This is a test module for the mailgun.com get domains API.  Enjoy watching!
 * To run this module you must replace the strings starting with YOUR- to your
 * appropriate values.  Enjoy watching!
 */

var DOMAIN = 'YOUR-DOMAIN';
var mailgun = require('mailgun-js')({
  apiKey: "YOUR-API-KEY",
  domain: DOMAIN
});

mailgun.get('/domains', function (error, body) {
  if(!error, body){
    console.log('Success: get domains was tested okay.');
    console.log('Body is ', body);
  } else {
    console.log('Error: get domains failed; error was: ', error);
  }
});
