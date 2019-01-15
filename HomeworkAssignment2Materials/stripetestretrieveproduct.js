/*
 * This is a test module for the stripe.com retrieve product API.  Enjoy watching!
 */

var stripe = require("stripe")("sk_test_UQemyl39wvtyhlN1ktMXobGY");

stripe.products.retrieve(
  "prod_EJwc4aeyZZ4Z5A",
  function(err, product) {
  // asynchronously called
  if(!err, product){
    console.log('Success: product ', product.name, ' was retrieved okay.');
    console.log('Product is ', product);
  } else {
    console.log('Error: product creation failed; error was: ', err);
  }
});
