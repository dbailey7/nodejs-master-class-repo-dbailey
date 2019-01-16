/*
 * This is a test module for the stripe.com list all skus API.  Enjoy watching!
 * To run this, you must replace the string beginning with "YOUR-API-KEY" with
 * your own value.
 */

var stripe = require("stripe")("YOUR-API-KEY");

stripe.skus.list(
  { limit: 20 },
  function(err, skus) {
  // asynchronously called
  if(!err, orders){
    console.log('Success: skus are:\n', skus);
  } else {
    console.log('Error: all skus list creation failed; error was: ', err);
  }
});
