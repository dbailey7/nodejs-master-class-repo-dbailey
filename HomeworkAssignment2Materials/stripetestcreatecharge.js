/*
 * This is a test module for the stripe.com charge API.  Enjoy watching!
 */

var stripe = require("stripe")("sk_test_UQemyl39wvtyhlN1ktMXobGY");

stripe.charges.create({
  amount: 2000,
  currency: "usd",
  source: "tok_amex", // obtained with Stripe.js
  description: "Charge for joe.blowe.7@gmail.com"
}, function(err, charge) {
  // asynchronously called
  if(!err, charge){
    console.log('Success: ', charge.description, 'of $', charge.amount/100, 'was made okay.');
  } else {
    console.log('Error: charge failed; error was: ', err);
  }
});
