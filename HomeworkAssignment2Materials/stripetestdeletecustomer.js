/*
 * This is a test module for the stripe.com delete customer API.  Enjoy watching!
 * To run this, you must replace the string beginning with "YOUR-" with your own values.
 */

var stripe = require("stripe")("YOUR-API-KEY");
var idToDelete = "cus_ELhfFx1Z79cHlV";

stripe.customers.del(
  idToDelete,
  function(err, confirmation) {
    // asynchronously called
    if(!err, confirmation){
      console.log('Success: customer: ', idToDelete, 'deleted okay.');
    } else {
      console.log('Error: customer deletion failed; error was: ', err);
    }
  }
);
