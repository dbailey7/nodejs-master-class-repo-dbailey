/*
 * This is a test module for the stripe.com list all products API.  Enjoy watching!
 * To run this, you must replace the strings beginning with "YOUR-API-KEY" with 
 * your own value.
 */

var stripe = require("stripe")("YOUR-API-KEY");

stripe.products.list(
  { limit: 20 },
  function(err, products) {
  // asynchronously called
  if(!err, products){
    console.log('Success: products are ', products);
  } else {
    console.log('Error: all products list creation failed; error was: ', err);
  }
});
