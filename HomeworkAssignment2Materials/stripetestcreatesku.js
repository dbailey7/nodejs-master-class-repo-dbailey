/*
 * This is a test module for the stripe.com create sku API.  Enjoy watching!
 */

var stripe = require("stripe")("sk_test_UQemyl39wvtyhlN1ktMXobGY");

stripe.skus.create({
  product: 'prod_EJwc4aeyZZ4Z5A',
  metadata: {
    item_description: "T-Shirt"
  },
  //attributes: {size: 'Extra Large', gender: 'Male'},
  price: 800,
  currency: 'usd',
  inventory: {type: 'finite', quantity: 500}
}, function(err, sku) {
  // asynchronously called
  if(!err, sku){
    console.log('Success: sku for ', sku.metadata.item_description, ' was created okay.');
  } else {
    console.log('Error: sku creation failed; error was: ', err);
  }
});
