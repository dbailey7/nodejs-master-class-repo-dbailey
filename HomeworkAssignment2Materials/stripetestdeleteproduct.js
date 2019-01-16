/*
 * This is a test module for the stripe.com delete product API.  Enjoy watching!
 * To run this, you must replace the string beginning with "YOUR-API-KEY" with
 * your own value.
 */

var stripe = require("stripe")("YOUR-API-KEY");

stripe.products.del(
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
