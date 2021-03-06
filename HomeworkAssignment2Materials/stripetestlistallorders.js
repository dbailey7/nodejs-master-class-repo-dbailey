/*
 * This is a test module for the stripe.com list all orders API.  Enjoy watching!
 * To run this, you must replace the string beginning with "YOUR-API-KEY" with 
 * your own value.
 */

var stripe = require("stripe")("YOUR-API-KEY");

stripe.orders.list(
  { limit: 20 },
  function(err, orders) {
  // asynchronously called
  if(!err, orders){
    console.log('Success: orders are ', orders);
  } else {
    console.log('Error: all orders list creation failed; error was: ', err);
  }
});
