/*
 * This is a test module for the stripe.com create sku API.  Enjoy watching!
 */

var stripe = require("stripe")("sk_test_UQemyl39wvtyhlN1ktMXobGY");

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
