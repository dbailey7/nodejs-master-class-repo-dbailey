/*
 * Request handlers
 */

// Dependencies
var _data = require('./data');
var helpers = require('./helpers');
var config = require('./config');

// Container for the handlers
var handlers = {};

/*
// Sample handler
handlers.sample = function(data, callback){
	// Callback an http status code, and a payload object
	callback(406, {'name' : 'sample handler'});
};
*/

/*
 * HTML API Handlers ...
 */

// Index handler
handlers.index = function(data, callback){

  // Reject any request that isn't a GET
  if(data.method == 'get'){

    // Prepare data for interpolation
    var templateData = {
      'head.title': 'Tony Maroni\'s Pizza House',
      'head.description': 'Now, that\'s a tasty pizza!',
      'body.class': 'index'
    };

    // Read in a template as a string
    helpers.getTemplate('index', templateData, function(err, str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str, templateData, function (err, str){
          if(!err && str){
            // Return that page as html
            callback(200, str, 'html');
          } else {
            callback(500, undefined, 'html');
          }
        });
      } else {
        callback(500, undefined, 'html');
      }
    });
  } else {
    callback(405, undefined, 'html');
  }

};

// Create Account handler
handlers.accountCreate = function(data, callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){

    // Prepare data for interpolation
    var templateData = {
      'head.title': 'Create an Account',
      'head.description': 'Signup is easy and only takes a few seconds.',
      'body.class': 'accountCreate'
    };

    // Read in a template as a string
    helpers.getTemplate('accountCreate', templateData, function(err, str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str, templateData, function (err, str){
          if(!err && str){
            // Return that page as html
            callback(200, str, 'html');
          } else {
            callback(500, undefined, 'html');
          }
        });
      } else {
        callback(500, undefined, 'html');
      }
    });
  } else {
    callback(405, undefined, 'html');
  }
};

// Create New Session handler
handlers.sessionCreate = function(data, callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){

    // Prepare data for interpolation
    var templateData = {
      'head.title': 'Login to your Account',
      'head.description': 'Please enter your phone number and password to access your account.',
      'body.class': 'sessionCreate'
    };

    // Read in a template as a string
    helpers.getTemplate('sessionCreate', templateData, function(err, str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str, templateData, function (err, str){
          if(!err && str){
            // Return that page as html
            callback(200, str, 'html');
          } else {
            callback(500, undefined, 'html');
          }
        });
      } else {
        callback(500, undefined, 'html');
      }
    });
  } else {
    callback(405, undefined, 'html');
  }
};


// Edit your account
handlers.accountEdit = function(data, callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Account Settings',
      //'head.description' : 'Don\'t need this metadata.',
      'body.class' : 'accountEdit'
    };
    // Read in a template as a string
    helpers.getTemplate('accountEdit', templateData, function(err, str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str, templateData, function(err, str){
          if(!err && str){
            // Return that page as HTML
            callback(200, str, 'html');
          } else {
            callback(500, undefined, 'html');
          }
        });
      } else {
        callback(500, undefined, 'html');
      }
    });
  } else {
    callback(405, undefined, 'html');
  }
};

// Session has been deleted
handlers.sessionDeleted = function(data, callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Logged Out',
      'head.description' : 'You have been logged out of your account.',
      'body.class' : 'sessionDeleted'
    };
    // Read in a template as a string
    helpers.getTemplate('sessionDeleted', templateData, function(err, str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str, templateData, function(err, str){
          if(!err && str){
            // Return that page as HTML
            callback(200, str, 'html');
          } else {
            callback(500, undefined, 'html');
          }
        });
      } else {
        callback(500, undefined, 'html');
      }
    });
  } else {
    callback(405, undefined, 'html');
  }
};

// Account has been deleted account
handlers.accountDeleted = function(data, callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Account DEleted',
      'head.description' : 'Your account has been deleted.',
      'body.class' : 'accountDeleted'
    };
    // Read in a template as a string
    helpers.getTemplate('accountDeleted', templateData, function(err, str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str, templateData, function(err, str){
          if(!err && str){
            // Return that page as HTML
            callback(200, str, 'html');
          } else {
            callback(500, undefined, 'html');
          }
        });
      } else {
        callback(500, undefined, 'html');
      }
    });
  } else {
    callback(405, undefined, 'html');
  }
};

// Create an order
handlers.ordersCreate = function(data, callback){

  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Create a New Order',
      'body.class' : 'ordersCreate'
    };

    // Read in a template as a string
    helpers.getTemplate('ordersCreate', templateData, function(err, str){

      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str, templateData, function(err, str){
          if(!err && str){
            // Return that page as HTML
            callback(200, str, 'html');
          } else {
            callback(500, undefined, 'html');
          }
        });
      } else {
        callback(500, undefined, 'html');
      }
    });
  } else {
    callback(405, undefined, 'html');
  }
};

// Order Information (View all orders)
handlers.ordersList = function(data, callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Order Information',
      'body.class' : 'ordersList'
    };
    // Read in a template as a string
    helpers.getTemplate('ordersList', templateData, function(err, str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str, templateData, function(err, str){
          if(!err && str){
            // Return that page as HTML
            callback(200, str, 'html');
          } else {
            callback(500, undefined, 'html');
          }
        });
      } else {
        callback(500, undefined, 'html');
      }
    });
  } else {
    callback(405, undefined, 'html');
  }
};

// Edit an order
handlers.ordersEdit = function(data, callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Prepare data for interpolation
    var templateData = {
      'head.title' : 'Order Details',
      'body.class' : 'ordersEdit'
    };
    // Read in a template as a string
    helpers.getTemplate('ordersEdit', templateData, function(err, str){
      if(!err && str){
        // Add the universal header and footer
        helpers.addUniversalTemplates(str, templateData, function(err, str){
          if(!err && str){
            // Return that page as HTML
            callback(200, str, 'html');
          } else {
            callback(500, undefined, 'html');
          }
        });
      } else {
        callback(500, undefined, 'html');
      }
    });
  } else {
    callback(405, undefined, 'html');
  }
};

// Favicon handler
handlers.favicon = function(data, callback){
  // Reject any request that is not a get
  if(data.method == 'get'){
    // Read in the favicon's data
    helpers.getStaticAsset('pizza-favicon.ico', function(err, data){
      if(!err && data){
        callback(200, data, 'favicon');
      } else {
        callback(500);
      }
    });
  } else {
    callback(405);
  }
}

// Public assets
handlers.public = function(data, callback){
  // Reject any request that isn't a GET
  if(data.method == 'get'){
    // Get the filename being requested
    var trimmedAssetName = data.trimmedPath.replace('public/', '').trim();
    if(trimmedAssetName.length > 0){
      // Read in the asset's data
      helpers.getStaticAsset(trimmedAssetName, function(err, data){
        if(!err && data){
          // Detrmine the content type, default to plain text
          var contentType = 'plain';

          if(trimmedAssetName.indexOf('.css') > -1){
            contentType = 'css';
          }

          if(trimmedAssetName.indexOf('.png') > -1){
            contentType = 'png';
          }
          if(trimmedAssetName.indexOf('.jpg') > -1){
            contentType = 'jpg';
          }

          if(trimmedAssetName.indexOf('.ico') > -1){
            contentType = 'favicon';
          }

          // Callback the data
          callback(200, data, contentType);

        } else {
          callback(404);
        }
      });
    } else {
      callback(404);
    }
  } else {
    callback(405);
  }
};

/*
 * JSON API Handlers ...
 */

// Ping handler
handlers.ping = function(data, callback){
 callback(200);
};

// Not found handler
handlers.notFound = function(data, callback){
 console.log('Ooooo, we didn\'t find a handler!')
	callback(404);
};

// Users handlers
handlers.users = function(data, callback){
  // Figure out what method is requested and pass it along to subhandlers
  var acceptableMethods = ['post', 'get', 'put', 'delete'];
  if(acceptableMethods.indexOf(data.method) > -1){
    handlers._users[data.method](data, callback);
  } else {
    callback(405);  // 405 is http status code for method not allowed
  }
};

// Container for the users subhandlers
handlers._users = {};

// Users - post subhandler
// Required data: firstname, lastname, phone, password, tosAgreement (um, terms of svc)
// Optional data: none
handlers._users.post = function(data, callback){
  // Check that all required fields are valid
  var firstName = typeof(data.payload.firstName) == 'string'  && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
  var lastName = typeof(data.payload.lastName) == 'string'  && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
  var phone = typeof(data.payload.phone) == 'string'  && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;
  var password = typeof(data.payload.password) == 'string'  && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
  var tosAgreement = typeof(data.payload.tosAgreement) == 'boolean'  && data.payload.tosAgreement == true ? true : false;

  if(firstName && lastName && phone && password && tosAgreement){
    // Insure the user doesn't already exist
    _data.read('users', phone, function(err, data){
      if(err){
        // err means phone not in system, which is good here, so go on with ...
        // Hash the password
        var hashedPassword = helpers.hash(password);
        //Create the user object
        if(hashedPassword){
          var userObject = {
            'firstName': firstName,
            'lastName': lastName,
            'phone': phone,
            'hashedPassword': hashedPassword,
            'tosAgreement': true
          };
          // Store the user
          _data.create('users', phone, userObject, function(err){
            if(!err){
              callback(200);
            } else {
              callback(500, {'Error': 'Could not create the new user.'});
            }
          });
        } else {
          callback(500, {'Error': 'Could not hash the user\'s password.'});
        }

      } else {
        // No err means user with this phone number already exists, which is bad
        callback(400, {'Error': 'A user with this phone number already exists.'});
      }
    });
  } else {
    // Oops, missing fields encountered
    callback(400, {'Error': 'Missing required fields in _users.post.'});
  }

};

// Users - get subhandler
// Required data: phone
// Optional data: none
handlers._users.get = function(data, callback){
  // Check that the phone number is valid
  var phone = typeof(data.queryStringObject.phone) == 'string' && data.queryStringObject.phone.trim().length == 10 ? data.queryStringObject.phone.trim() : false;
  if(phone){
    // Get the token from the headers
    var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
    // Verify that the given token is valid for the phone number
    handlers._tokens.verifyToken(token, phone, function(tokenIsValid){
      if(tokenIsValid){
        // Lookup the user
        _data.read('users', phone, function(err, data){
          if(!err && data){
            // Remove the hashed password from the user object before returing it to the requester
            delete data.hashedPassword;
            callback(200, data);
          } else {
            callback(404, {'Error': 'Not found, phone number.'});
          }
        });
      } else {
        callback(403, {'Error': 'Missing required token in header, or token is invalid.'})
      }
    });
  } else {
    callback(400, {'Error': 'Missing required phone number field.'})
  }
};

// Users - put subhandler
// Required data: phone
// Optional data: firstname, lastname, password, tosAgreement
handlers._users.put = function(data, callback){
  // Check for the required field
  var phone = typeof(data.payload.phone) == 'string'  && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;

  // Check for the optional fields
  var firstName = typeof(data.payload.firstName) == 'string'  && data.payload.firstName.trim().length > 0 ? data.payload.firstName.trim() : false;
  var lastName = typeof(data.payload.lastName) == 'string'  && data.payload.lastName.trim().length > 0 ? data.payload.lastName.trim() : false;
  var password = typeof(data.payload.password) == 'string'  && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;

  // Error if the phone is invalid
  if(phone){
    // Error if nothing is sent to Update
    if(firstName || lastName || password){
      // Get the token from the headers
      var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
      // Verify that the given token is valid for the phone number
      handlers._tokens.verifyToken(token, phone, function(tokenIsValid){
        if(tokenIsValid){
          // Lookup the user
          _data.read('users', phone, function(err, userData){
            if(!err && userData){
              // Update the fields necessary
              if(firstName){
                userData.firstName = firstName;
              }
              if(lastName){
                userData.lastName = lastName;
              }
              if(password){
                userData.hashedPassword = helpers.hash(password);
              }
              // Store the newly updated fields
              _data.update('users', phone, userData,function(err){
                if(!err){
                  callback(200);
                } else {
                  callback(500,{'Error' : 'Could not update the user.'});
                }
              });
            } else {
              callback(400,{'Error' : 'Specified user does not exist.'});
            }
          });
        } else {
          callback(403,{"Error" : "Missing required token in header, or token is invalid."});
        }
      });
    } else {
      callback(400,{'Error' : 'Missing fields to update.'});
    }
  } else {
    callback(400,{'Error' : 'Missing required field.'});
  }
};

// Users - delete subhandler
// Required data: phone
// Cleanup old orders associated with the user
handlers._users.delete = function(data, callback){
  // Check that the phone number is valid
  var phone = typeof(data.queryStringObject.phone) == 'string' && data.queryStringObject.phone.trim().length == 10 ? data.queryStringObject.phone.trim() : false;
  if(phone){
    // Get the token from the headers
    var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
    // Verify that the given token is valid for the phone number
    handlers._tokens.verifyToken(token, phone, function(tokenIsValid){
      if(tokenIsValid){
        // Lookup the user
        _data.read('users', phone, function(err, userData){
          if(!err && data){
            _data.delete('users', phone, function(err){
              if(!err){
                // Delete each of the orders associated with the user
                var userOrders = typeof(userData.orders) == 'object' && userData.orders instanceof Array ? userData.orders : [];
                var ordersToDelete = userOrders.length;
                if(ordersToDelete > 0){
                  var ordersDeleted = 0;
                  var deletionErrors = false;
                  // Loop thru the orders
                  userOrders.forEach(function(orderId){
                    // Delete the order
                    _data.delete('orders', orderId, function(err){
                      if(err){
                        deletionErrors = true;
                      }
                      ordersDeleted++;
                      if(ordersDeleted == ordersToDelete){
                        if(!deletionErrors){
                          callback(200);
                        } else {
                          callback(500, {'Error': 'Errors encountered while attempting to delete all of the user\'s orders. All orders may not have been deleted from the system successfully.'});
                        }
                      }
                    });
                  });
                } else {
                  callback(200);
                }
              } else {
                callback(500, {'Error': 'Could not delete the specified user.'});
              }
            });
          } else {
            callback(400, {'Error': 'Could not find the specified user.'});
          }
        });
      } else {
        callback(403, {'Error': 'Missing required token in header, or token is invalid.'});
      }
    });
  } else {
    callback(400, {'Error': 'Missing required phone number field.'});
  }
};

// Tokens handlers
handlers.tokens = function(data, callback){
  // Figure out what method is requested and pass it along to subhandlers
  var acceptableMethods = ['post', 'get', 'put', 'delete'];
  if(acceptableMethods.indexOf(data.method) > -1){
    handlers._tokens[data.method](data, callback);
  } else {
    callback(405);  // 405 is http status code for method not allowed
  }
};

// Container for the tokens subhandlers/methods
handlers._tokens = {};

//Tokens - post
// Required data: phone, password
// Optional data: none
handlers._tokens.post = function(data, callback){
  // Check that all required fields are valid
  var phone = typeof(data.payload.phone) == 'string'  && data.payload.phone.trim().length == 10 ? data.payload.phone.trim() : false;
  var password = typeof(data.payload.password) == 'string'  && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false;
  if(phone && password){
    // Lookup the user that matches that phone number
    _data.read('users', phone, function(err, userData){
      if(!err && userData){
        // Hash the sent password, and compare it to the password stored in the user Object
        var hashedPassword = helpers.hash(password);
        if(hashedPassword == userData.hashedPassword){
          // If valid, create a new token with a random name.  Set expiration date 1 hour
          var tokenId = helpers.createRandomString(20);
          var expires = Date.now() + 1000 * 60 * 60;
          var tokenObject = {
            'phone': phone,
            'id': tokenId,
            'expires': expires
          };

          // Store the token
          _data.create('tokens', tokenId, tokenObject, function(err){
            if(!err){
              callback(200, tokenObject);
            } else {
              callback(500, {'Error': 'Could not create the new token.'});
            }
          });
        } else {
          callback(400, {'Error': 'Password did not match the specified user\'s stored password.'});
        }
      } else {
        callback(400, {'Error': 'Could not find the specifed user.'});
      }
    });
  } else {
    callback(400, {'Error': 'Missing required fields in _tokens.post.'});
  }
};

//Tokens - get
// Required data: id
// Optional data: none
handlers._tokens.get = function(data, callback){
  // Check that the id is valid
  var id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;
  if(id){
    // Lookup the token
    _data.read('tokens', id, function(err, tokenData){
      if(!err && tokenData){
        callback(200, tokenData);
      } else {
        callback(404, {'Error': 'Not found, id.'});
      }
    });
  } else {
    callback(400, {'Error': 'Missing required id field, or field invalid.'})
  }
};

//Tokens - put
// Required data: id, extend (this is a bool that effectivly resets the expires)
// Optional data: none
handlers._tokens.put = function(data, callback){
  // Check that the id is valid
  var id = typeof(data.payload.id) == 'string' && data.payload.id.trim().length == 20 ? data.payload.id.trim() : false;
  var extend = typeof(data.payload.extend) == 'boolean' && data.payload.extend == true ? true : false;
  if(id && extend){
    // Lookup the token
    _data.read('tokens', id, function(err, tokenData){
      if(!err && tokenData){
        // Check to see if the token isn't already expired
        if(tokenData.expires > Date.now()){
          // Set the expiration time to an hour from now
          tokenData.expires = Date.now() * 1000 * 60 * 60;

          // Store the new updated token expiration
          _data.update('tokens', id, tokenData, function(err){
            if(!err){
              callback(200);
            } else {
              callback(500, {'Error': 'Could not update the token\'s expiration.'});
            }
          });
        } else {
          callback(400, {'Error': 'The token has already expired and can\'t be extended.'});
        }
      } else {
        callback(400, {'Error': 'Specified token does not exist.'});
      }
    });
  } else {
    callback(400, {'Error': 'Missing required fields(s), of field(s) are invalid.'});
  }
};

//Tokens - delete
// Required data: id
// Optional data: none
handlers._tokens.delete = function(data, callback){
  // Check that the id is valid
  var id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;
  if(id){
    // Lookup the token
    _data.read('tokens', id, function(err, tokenData){
      if(!err && tokenData){
        _data.delete('tokens', id, function(err){
          if(!err){
          callback(200);
          } else {
            callback(500, {'Error': 'Could not delete the specified token.'});
          }
        });
      } else {
        callback(400, {'Error': 'Could not find the specified token.'});
      }
    });
  } else {
    callback(400, {'Error': 'Missing required token field.'});
  }
};

// Helper function to verify if a given token id is currently valid for a given user
handlers._tokens.verifyToken = function(id, phone, callback){
  // lookup the token
  _data.read('tokens', id, function(err, tokenData){
    if(!err && tokenData){
      if(tokenData.phone == phone && tokenData.expires > Date.now()) {
        callback(true);
      } else {
        callback(false);
      }
    } else {
      callback(false);
    }
  });
};

// orders
handlers.orders = function(data, callback){
  // Figure out what method is requested and pass it along to subhandlers
  var acceptableMethods = ['post', 'get', 'put', 'delete'];
  if(acceptableMethods.indexOf(data.method) > -1){
    handlers._orders[data.method](data, callback);
  } else {
    callback(405);  // 405 is http status code for method not allowed
  }
};

// Container for the orders subhandlers/methods
handlers._orders = {};

//orders - post (for use with Creating Orders)
// Required data: address, phone, toppings
// Optional data: none
handlers._orders.post = function(data, callback){
  // Check that the inputs are valid
  var address = typeof(data.payload.address) == 'string' && data.payload.address.trim().length > 0 ? data.payload.address : false;
  var phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length > 0 ? data.payload.phone.trim() : false;
  var toppings = typeof(data.payload.toppings) == 'object' && data.payload.toppings instanceof Array && data.payload.toppings.length > 0 ? data.payload.toppings : false;
console.log("D E B U G --> address, phone and toppings are: " + address + phone + toppings);
  // By the way, % 1 === 0, is how you specify a number is a 'whole number'! -- console.log(address, phone, toppings);
  if(address && phone && toppings) {
    // Get the token from the headers
    var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;

    // Lookup the user phone by reading the token
    _data.read('tokens', token, function(err, tokenData){
      if(!err && tokenData){
        var userPhone = tokenData.phone;

        // Lookup the user data
        _data.read('users', userPhone, function(err, userData){
          if(!err && userData){
            var userOrders = typeof(userData.orders) == 'object' && userData.orders instanceof Array ? userData.orders : [];

            // Verify that the user has less than the number of max-orders-per-user
            if(userOrders.length < config.maxOrders){
              // Create a random id for the order
              var orderId = helpers.createRandomString(20);

              //Create the order object, and include the user's userPhone
              var orderObject = {
                'id': orderId,
                'phone': userPhone,
                'address': address,
                'toppings': toppings
              };

              // Save the object
                _data.create('orders', orderId, orderObject, function(err){
                  if(!err){
                    // Add the orderId to the user's object
                    userData.orders = userOrders;
                    userData.orders.push(orderId);

                    // Save the new user data
                    _data.update('users', userPhone, userData, function(err){
                      if(!err){
                        // Return the data about the new order
                        callback(200, orderObject);
                      } else {
                        callback(500, {'Error' : 'Could not update the user with the new order.'});
                      }
                    });

                  } else {
                    callback(500, {'Error': 'Could not create the new order.'});
                  }
                });
            } else {
              callback(400, {'Error': 'The user already has the maximun number of orders (' + config.maxOrders + ').'});
            }
          } else {
            callback(403);
          }
        });
      } else {
        callback(403);
      }
    });
  } else {
    callback(400, {'Error': 'Missing required order inputs, or inputs are invalid.'});
  }
};

// Orders - get subhandler
// Required data: id
// Optional data: none
handlers._orders.get = function(data, callback){
  // Check that the id is valid
  var id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;
  if(id){
    // Lookup the order
    _data.read('orders', id, function(err, orderData){
      if(!err && orderData){
        // Get the token from the headers
        var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
        // Verify that the given token is valid and belongs to the user that created the order
        //console.log('This is the order data: \n', orderData);
        handlers._tokens.verifyToken(token, orderData.userPhone, function(tokenIsValid){
          if(tokenIsValid){
            // Return the order data
            //console.log('tokenIsValid is true.');
            callback(200, orderData);
          } else {
            //console.log('tokenIsValid is false.');
            callback(403);
          }
        });
      } else {
        callback(404);
      }
    });
  } else {
    callback(400, {'Error': 'Missing required field, or field is invalid.'});
  }
};

// Orders - put subhandler (for use with handlers.ordersUpdate)
// Required data: id
// Optional data: address, phone, toppings
handlers._orders.put = function(data, callback){
  // Check for the required field
  var id = typeof(data.payload.id) == 'string'  && data.payload.id.trim().length == 20 ? data.payload.id.trim() : false;
  // Check for optional fields
  var address = typeof(data.payload.address) == 'string' && data.payload.address.trim().length > 0 ? data.payload.address : false;
  var phone = typeof(data.payload.phone) == 'string' && data.payload.phone.trim().length > 0 ? data.payload.phone.trim() : false;
  var toppings = typeof(data.payload.toppings) == 'object' && data.payload.toppings instanceof Array && data.payload.toppings.length > 0 ? data.payload.toppings : false;

  // Check that id is valid
  if(id){
    if(address || phone || toppings){
      // Lookup the order
      _data.read('orders', id, function(err, orderData){
        if(!err && orderData){
          // Get the token from the headers
          var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
          // Verify that the given token is valid and belongs to the user that created the order
          console.log('This is the order data: \n', orderData);
          handlers._tokens.verifyToken(token, orderData.userPhone, function(tokenIsValid){
            if(tokenIsValid){
              // Update the order where necessary
              if(address){
                orderData.address = address;
              }
              if(phone){
                orderData.phone = phone;
              }
              if(toppings){
                orderData.toppings = toppings;
              }

              // Store the updates
              _data.update('orders', id, orderData, function(err){
                if(!err){
                  callback(200);
                } else {
                  callback(500, {'Error': 'Could not update the order.'});
                }
              });
            } else {
              callback(403);
            }
          });
        } else {
          callback(400, {'Error': 'Check id does not exist.'});
        }
      });
    } else {
      callback(400, {'Error': 'Missing field(s) to update.'});
    }
  } else {
    callback(400, {'Error': 'Missing required field.'});
  }
};


// Orders - delete subhandler (for use with handlers.ordersEdit)
// Required data: id
// Optional data: none
handlers._orders.delete = function(data, callback){
  // Check that the id number is valid
  var id = typeof(data.queryStringObject.id) == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false;
  if(id){
    // Lookup the order
    _data.read('orders', id, function(err, orderData){
      if(!err, orderData){
        // Get the token from the headers
        var token = typeof(data.headers.token) == 'string' ? data.headers.token : false;
        // Verify that the given token is valid for the phone number
        handlers._tokens.verifyToken(token, orderData.userPhone, function(tokenIsValid){
          if(tokenIsValid){

            // Delete the order data
            _data.delete('orders', id, function(err){
              if(!err){
                // Lookup the user
                _data.read('users', orderData.userPhone, function(err, userData){
                  if(!err){
                    // Determine what the user's orders are
                    var userOrders = typeof(userData.orders) == 'object' && userData.orders instanceof Array ? userData.orders : [];

                    // Remove the order from the user's list of orders
                    var orderPosition = userOrders.indexOf(id);
                    if(orderPosition > -1){
                      userOrders.splice(orderPosition, 1);
                      // Re-save the user's data
                      userData.orders = userOrders;
                      _data.update('users', orderData.userPhone, userData, function(err){
                        if(!err){
                        callback(200);
                        } else {
                          callback(500, {'Error': 'Could not update the user\'s order data.'});
                        }
                      });
                    } else {
                        callback(500, {'Error': 'Could find the order on the user\'s object, so could not remove it.'});
                    }
                  } else {
                    callback(500, {'Error': 'Could not find the user who created the order, so could not remove the order from the list of orders on the user object.'});
                  }
                });
              } else {
                callback(500, {'Error': 'Could not delete the order data.'})
              }
            });
          } else {
            callback(403)
          }
        });
      } else {
        callback(400, {'Error': 'The specified order id does not exist.'})
      }
    });

  } else {
    callback(400, {'Error': 'Missing required id field.'});
  }
};

// Export the module
module.exports = handlers;
