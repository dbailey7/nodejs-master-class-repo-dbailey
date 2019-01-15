/*
 * This is a test module for the stripe.com delete customer API.  Enjoy watching!
 */

var stripe = require("stripe")("sk_test_UQemyl39wvtyhlN1ktMXobGY");
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
