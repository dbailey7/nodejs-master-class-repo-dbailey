/*
 * This is a test module for the stripe.com create product API.  Enjoy watching!
 * To run this, you must replace the strings beginning with "YOUR-" with your own values.
 */

var stripe = require("stripe")("YOUR-API-KEY");

stripe.products.create({
  name: 'T-Shirt',
  type: 'good',
  attributes: [
    'size', 'gender'
  ]
}, function(err, product) {
  // asynchronously called
  if(!err, product){
    console.log('Success: product ', product.name, ' was created okay.');
    console.log('Product is ', product);
  } else {
    console.log('Error: product creation failed; error was: ', err);
  }
});
