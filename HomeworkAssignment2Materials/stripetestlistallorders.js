/*
 * This is a test module for the stripe.com list all orders API.  Enjoy watching!
 */

var stripe = require("stripe")("sk_test_UQemyl39wvtyhlN1ktMXobGY");

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
