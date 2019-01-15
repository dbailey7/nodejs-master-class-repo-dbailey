/*
 * This is a test module for the stripe.com retrieve customer API.  Enjoy watching!
 * To run this, you must replace the strings beginning with "YOUR-" with your own values.
 */

var stripe = require("stripe")("YOUR-API-KEY");

stripe.customers.retrieve("cus_EJO6jdcPDBFIa1",
  function(err, customer) {
  // asynchronously called
  if(!err, customer){
    console.log('Success: ', customer.id, " ", customer.description, 'was retrieved okay.');
    console.log("Customer name is: ", customer.shipping.name);
  } else {
    console.log('Error: charge failed; error was: ', err);
  }
});
