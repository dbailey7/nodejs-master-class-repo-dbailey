/*
 * This is a test module for the stripe.com update sku API.  Enjoy watching!
 * To run this, you must replace the strings beginning with "YOUR-" with your own values.
 */

var stripe = require("stripe")("YOUR-API-KEY");

stripe.skus.update(
  "sku_EJxb2UWDRniiXa",
  {
    metadata: {item_description: 'T-Shirt'},
    //type: 'good',
    attributes: [
      "size", "gender"
    ],
  }, function(err, sku) {
  // asynchronously called
    if(!err, sku){
      console.log('Success: sku for ', sku.metadata.item_description, ' was updated okay.');
      console.log('Sku is ', sku);
    } else {
      console.log('Error: sku update failed; error was: ', err);
    }
});
