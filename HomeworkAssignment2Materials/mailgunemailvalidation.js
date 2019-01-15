/*
 * This is a test module for the mailgun.com email validation API.  Enjoy watching!
 * To run this, you must replace the strings beginning with "YOUR-" with your own values.
 */

var DOMAIN = 'YOUR-DOMAIN';
var mailgun = require('mailgun-js')({
  apiKey: "YOUR-API-KEY",
  domain: DOMAIN
});

mailgun.validate('YOUR-VERIFIED_RECIPIENT-EMAIL', function (error, body) {
  if(!error, body){
    console.log('Success: domain ', sku.metadata.item_description, ' was validated okay.');
    console.log('Body is ', body);
  } else {
    console.log('Error: domain validation failed; error was: ', error);
  }
});
