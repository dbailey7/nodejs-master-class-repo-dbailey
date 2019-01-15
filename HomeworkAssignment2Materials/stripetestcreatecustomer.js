/*
 * This is a test module for the stripe.com customer creation API.  Enjoy watching!
 * To run this, you must replace the string beginning with "YOUR-" with your own values.
 */

var stripe = require("stripe")("YOUR-API-KEY");

stripe.customers.create({
  metadata: {name: "Joseph Horatio Blowe"},
  shipping.name: "Joseph Horatio Thadeus Blowe"
  description: "Customer object for joe.blowe.7@gmail.com",
  source: "tok_amex" // obtained with Stripe.js
}, function(err, customer) {
  // asynchronously called
  if(!err, customer){
    console.log('Success: ', customer.id, " ", customer.description, 'was created okay.');
    console.log('Customer name: ', customer.shipping.name);
  } else {
    console.log('Error: customer creation failed; error was: ', err);
  }
});
