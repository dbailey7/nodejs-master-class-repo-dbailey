/*
 * This is a test module for the stripe.com retrieve order API.  Enjoy watching!
 */

var stripe = require("stripe")("sk_test_UQemyl39wvtyhlN1ktMXobGY");

stripe.orders.retrieve("or_1DtH5zA1C24GEPq7iLPnn799",
  function(err, order) {
  // asynchronously called
  if(!err, order){
    //console.log('Success: order ', order.items.description, ' was created okay.');
    console.log('Success: order ', order.id, ' was retrieved okay.');
  } else {
    console.log('Error: order retrieval failed; error was: ', err);
  }
});
