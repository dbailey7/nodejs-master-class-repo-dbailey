/*
 * This is a test module for the stripe.com retrieve order API.  Enjoy watching!
 * To run this, you must replace the string beginning with "YOUR-API-KEY" with 
 * your own value.
 */

var stripe = require("stripe")("YOUR-API-KEY");

stripe.orders.retrieve("or_1DtH5zA1C24GEPq7iLPnn799",
  function(err, order) {
  // asynchronously called
  if(!err, order){
    //console.log('Success: order ', order.items.description, ' was created okay.');
    console.log('Success: order ', order.id, ' was retrieved okay.');
    console.log('Order description is ', order.items[0].description);
    console.log('Order status is ', order.status);
  } else {
    console.log('Error: order retrieval failed; error was: ', err);
  }
});
