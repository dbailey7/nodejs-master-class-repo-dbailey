/*
 * This is a test module for the stripe.com list all customers API.  Enjoy watching!
 * To run this, you must replace the strings beginning with "YOUR-" with your own values.
 */

var stripe = require("stripe")("YOUR-API-KEY");

stripe.customers.list(
  { limit: 20 },
  function(err, customers) {
    // asynchronously called
    if(!err, customers){
      console.log('Success: customers are: ', customers, '.');
    } else {
      console.log('Error: customers listing failed; error was: ', err);
    }
  }
);
