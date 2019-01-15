/*
 * This is a test module for the stripe.com create order API.  Enjoy watching!
 */

var stripe = require("stripe")("sk_test_UQemyl39wvtyhlN1ktMXobGY");

stripe.orders.create({
  currency: 'usd',
  items: [
    {
      type: 'sku',
      description: 'T-Shirt',
      quantity: 3,
      parent: 'sku_EJxb2UWDRniiXa'
    }
  ],
  shipping: {
    name: 'Joe Blowe',
    address: {
      line1: '2234 Fitzwater Street',
      city: 'Philadelphia',
      state: 'PA',
      country: 'USA',
      postal_code: '19146'
    }
  },
  email: 'joe.blowe.7@gmail.com'
}, function(err, order) {
  // asynchronously called
  if(!err, order){
    console.log('Success: order ', order.items.description, ' was created okay.');
  } else {
    console.log('Error: order creation failed; error was: ', err);
  }
});
