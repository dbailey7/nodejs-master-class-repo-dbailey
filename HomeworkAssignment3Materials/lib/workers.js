/*
 * Module to handle our worker-related tasks
 */

// Dependencies
var path = require('path');
var fs = require('fs');
var _data = require('./data');
var http = require('http');
var https = require('https');
var helpers = require('./helpers');
var url = require('url');
var _logs = require('./logs');
var util = require('util');
var debug = util.debuglog('workers');

// Instantiate the worker object
var workers = {};

// Rotate (compress) the log files
workers.rotateLogs = function(){
  // List all of the (non-compressed) log files
  _logs.list(false, function(err, logs){
    if(!err && logs && logs.length > 0){
      logs.forEach(function(logName){
        // Compress the data to a different file
        var logId = logName.replace('.log', '');
        var newFileId = logId + '-' + Date.now();
        _logs.compress(logId, newFileId, function(err){
          if(!err){
            // Truncate the log
            _logs.truncate(logId, function(err){
              if(!err){
                debug("Success truncating logfile.")
              } else {
                debug("Error truncating logfile.")
              }
            })
          } else {
            debug("Error compressing one of the log files.")
          }
        })
      });
    } else {
      debug("Error: could not find any logs to rotate.")
    }
  });
};

// Timer to execute the log rotation process once a day
workers.logRotationLoop = function(){
  setInterval(function(){
    workers.rotateLogs();
  },1000 * 60 * 60 * 24);
};


// The workers module init script
workers.init = function(){

  // Send a start message to the console in yellow
  console.log('\x1b[33m%s\x1b[0m','Background workers are running.');

  // Execute all the orders immediately
  workers.gatherAllOrders();

  // Call the loop so the orders will execute ongoingly ...
  workers.loop();

  // Compress all of the logs immediately
  workers.rotateLogs();

  //Call the compression loop so logs will be compressed ongoingly
  workers.logRotationLoop();
};

// Lookup all orders, get their data, and send off to the validator
workers.gatherAllOrders = function(){
  // Get all of the orders
  _data.list('orders', function(err, orders){
    if(!err && orders && orders.length > 0){
      orders.forEach(function(order){
        // Read in the order data
        _data.read('orders', order, function(err, originalOrderData){
          if(!err && originalOrderData){
            // Pass it to the order validator, and let that function continue the function or log the error(s) as needed
            workers.validateOrderData(originalOrderData);
          } else {
            debug("Error reading one of the order's data: ", err, ".");
          }
         });
      });
    } else {
      // Note to Self (regarding learning mnemonics):
      // Why no calback, here?  'Cuz this is a function that has no response
      // with status to pass back to a requester, as the HTTP ones require! (:>)
      // We just need to pass around the data and report errors and do.  Got it?
      debug('Error is ', err);
      debug('Error: Oops, could not find any orders to process.');
    }
  });
};

// Sanity-check the order-data,
workers.validateOrderData = function(originalOrderData){
  originalOrderData = typeof(originalOrderData) == 'object' && originalOrderData !== null ? originalOrderData : {};
  originalOrderData.id = typeof(originalOrderData.id) == 'string' && originalOrderData.id.trim().length == 20 ? originalOrderData.id.trim() : false;
  originalOrderData.userPhone = typeof(originalOrderData.userPhone) == 'string' && originalOrderData.userPhone.trim().length == 10 ? originalOrderData.userPhone.trim() : false;
  originalOrderData.toppings = typeof(originalOrderData.toppings) == 'object' && originalOrderData.toppings instanceof Array && originalOrderData.toppings.length > 0 ? originalOrderData.toppings : false;

  // If all orders pass, pass the data along to the next step in the process
  if(originalOrderData.id && originalOrderData.userPhone && originalOrderData.toppings){
    workers.performCheck(originalOrderData);
  } else {
    // If orders fail, log the error and fail silently
    debug("Error: one of the orders is not properly formatted. Skipping.");
  }
};

// Perform the check, send the originalCheck data and the outcome of the order process to the next step in the process
workers.performCheck = function(originalOrderData){

  // Prepare the intial order outcome
  var orderOutcome = {
    'error': false,
    'responseCode': false
  };

  // Mark that the outcome has not been sent yet
  var outcomeSent = false;

  // Parse the hostname and path out of the originalOrderData
  var parsedUrl = url.parse(originalOrderData.protocol + '://' + originalOrderData.url, true);
  var hostName = parsedUrl.hostname;
  var path = parsedUrl.path; // Using path not pathname because we want the query string

  // Construct the request
  var requestDetails = {
    'protocol': originalOrderData.protocol+':',
    'hostname': hostName,
    'method': originalOrderData.method.toUpperCase(),
    'path': path,
    'timeout': originalOrderData.timeoutSeconds * 1000
  };

  // Instantiate the request object (using either the http or https module)
  var _moduleToUse = originalOrderData.protocol == 'http' ? http : https;
  var req = _moduleToUse.request(requestDetails, function(res){
    // Grab the status of the sent request
    var status =  res.statusCode;

    // Update the orderOutcome and pass the data along
    orderOutcome.responseCode = status;
    if(!outcomeSent){
       workers.processCheckOutcome(originalOrderData, orderOutcome);
         outcomeSent = true;
    }
  });

  // Bind to the error event so it doesn't get thrown
  req.on('error', function(e){
    // Update the orderOutcome and pass the data along
    orderOutcome.error = {'error': true, 'value': e};
    if(!outcomeSent){
       workers.processCheckOutcome(originalOrderData, orderOutcome);
       outcomeSent = true;
    }
  });

  // Bind to the timeout event
  req.on('timeout', function(){
    // Update the orderOutcome and pass the data along
    orderOutcome.error = {'error': true, 'value': 'timeout'};
    if(!outcomeSent){
       workers.processCheckOutcome(originalOrderData, orderOutcome);
       outcomeSent = true;
    }
  });

  // End the request
  req.end();
};

// Process the order outcome, update the order data as needed, trigger an alert if needed
// Special logic for accomodating a order that has never been tested before (don't alert on that one)
workers.processCheckOutcome = function(originalOrderData, orderOutcome){

  // Decide if the order toppings are considered selected or unselected
  var state = !orderOutcome.error && orderOutcome.responseCode &&
    originalOrderData.toppings.indexOf(orderOutcome.responseCode) > -1 ?
    'selected' : 'unselected';

  // Decide if an alert is warranted
  var alertWarranted = originalOrderData.lastChecked &&
    originalOrderData.state !== state ? true : false;

  // Log the outcome
  var timeOfCheck = Date.now();
  workers.log(originalOrderData, orderOutcome, state, alertWarranted, timeOfCheck);


  // Update the order data
  var newOrderData = originalOrderData;
  newOrderData.state = state;
  newOrderData.lastChecked = timeOfCheck;


  // Save the updates
  _data.update('orders', newOrderData.id, newOrderData, function(err){
    if(!err){
      // Send the new order data to the next phase in the process if needed
      if(alertWarranted){
        workers.alertUserToStatusChange(newOrderData);
      } else {
        debug("Order outcome has not changed, no alert needed.");
      }
    } else {
      debug("Error trying to save updates to one of the orders.");
    }
  });
};

// Alert the user as to a change in their order status
workers.alertUserToStatusChange = function(newOrderData){
  var msg = 'Alert: Your order for ' + newOrderData.method.toUpperCase() +
    ' ' + newOrderData.protocol + '://' + newOrderData.url + ' is currently ' +
    newOrderData.state;
    helpers.sendTwilioSms(newOrderData.userPhone, msg, function(err){
      if(!err){
        debug("Success: User was alerted to a status change in their order, via sms: ",msg, ".");
      } else {
        debug("Error: Could not send sms alert to user who had a state change in their order",err, ".");
      }
    });
};

workers.log = function(originalOrderData, orderOutcome, state, alertWarranted, timeOfCheck){
  // Form the log data
  var logData = {
    'order': originalOrderData,
    'outcome': orderOutcome,
    'state': state,
    'alert': alertWarranted,
    'time': timeOfCheck
  };

  // Convert data to a string
  var logString = JSON.stringify(logData);

  // Determine the name of the log file
  var logFileName = originalOrderData.id;

  // Append the log string to the log file
  _logs.append(logFileName, logString, function(err){
    if(!err){
      debug("Logging to the file succeeded.");
    } else {
      debug("Logging to the file failed.");
    }
  });
};


// Timer to execute the worker-process once per minute
workers.loop = function(){
  setInterval(function(){
    workers.gatherAllOrders();
  },1000 * 60);
};

// Export the module
module.exports = workers;
