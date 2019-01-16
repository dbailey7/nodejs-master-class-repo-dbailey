/*
 * This is a test module for the stripe.com delete product API.  Enjoy watching!
 */

var stripe = require("stripe")("sk_test_UQemyl39wvtyhlN1ktMXobGY");

stripe.products.delete(
  "prod_EJxLg9at4VLayF",
  function(err, product) {
  // asynchronously called
  if(!err, product){
    console.log('Success: product ', product.name, ' was deleted okay.');
    console.log('Product is ', product);
  } else {
    console.log('Error: product deletion failed; error was: ', err);
  }
});
