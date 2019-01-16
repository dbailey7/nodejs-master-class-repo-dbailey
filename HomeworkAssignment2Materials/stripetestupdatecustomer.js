/*
 * This is a test module for the stripe.com update customer API.  Enjoy watching!
 * To run this, you must replace the strings beginning with "YOUR-API-KEY" with 
 * your own value.
 */

var stripe = require("stripe")("YOUR-API-KEY");

stripe.customers.update("cus_EJO6jdcPDBFIa1", {
  metadata: {name: "Joseph Horatio Blowe"},
  email: "joe.blowe.7@gmail.com",
  shipping:
     { address:
       { city: 'Philadelphia',
         country: 'United States',
         line1: '2234 Fitzwater Street',
         line2: '',
         postal_code: '19146',
         state: 'PA',
       },
       name: 'Joseph Horatio Thadeus Blowe',
       phone: '2152345789'
     },
  description: "Customer update for joe.blowe.7@gmail.com"
}, function(err, customer) {
  // asynchronously called
  if(!err, customer){
    console.log('Success: ', customer.id, " ", customer.description, 'was made okay.');
    console.log('Customer name ', customer.shipping.name, 'was updated okay.');
  } else {
    console.log('Error: customer update failed; error was: ', err);
  }
});
