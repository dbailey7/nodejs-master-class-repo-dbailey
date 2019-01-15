/*
 * This is a test module for the stripe.com update product API.  Enjoy watching!
 */

var stripe = require("stripe")("sk_test_UQemyl39wvtyhlN1ktMXobGY");

stripe.products.update(
  "prod_EJxLg9at4VLayF",
  {
    name: 'T-Shirt',
    //type: 'good',
    attributes: [
      "size", "gender"
    ],
  }, function(err, product) {
  // asynchronously called
    if(!err, product){
      console.log('Success: product ', product.name, ' was updated okay.');
      console.log('Product is ', product);
    } else {
      console.log('Error: product update failed; error was: ', err);
    }
});
