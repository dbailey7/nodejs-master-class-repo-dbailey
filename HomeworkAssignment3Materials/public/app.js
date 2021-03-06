/*
 * Front-end logic for the application
 */

// Container for the front-end application
var app = {};

//console.log("Hello, Console World!");

// Config
app.config = {
  'sessionToken': false
};

// AJAX Client (for the RESTful API)
app.client = {};

// Interface for making API calls
app.client.request = function(headers, path, method, queryStringObject,
  payload, callback){

  // Set defaults
  headers = typeof(headers) == 'object' && headers !== null ? headers : {};
  path = typeof(path) == 'string' ? path : '/';
  method = typeof(method) == 'string' && ['POST', 'GET', 'PUT', 'DELETE'].indexOf(method.toUpperCase()) > -1 ? method.toUpperCase() : 'GET';
  queryStringObject = typeof(queryStringObject) == 'object' && queryStringObject !== null ? queryStringObject : {};
  payload = typeof(payload) == 'object' && payload !== null ? payload : {};
  callback = typeof(callback) == 'function' ? callback : false;

  // For each query string parameter sent, add it to the path
  var requestUrl = path + '?';
  var counter = 0;
  for(var queryKey in queryStringObject){
     if(queryStringObject.hasOwnProperty(queryKey)){
       counter++;
       // If at least one query string parameter has already been added, preprend new ones with an ampersand
       if(counter > 1){
         requestUrl += '&';
       }
       // Add the key and value
       requestUrl += queryKey + '=' + queryStringObject[queryKey];
     }
  }

  // Form the xml http request (xhr) as a JSON type
  var xhr = new XMLHttpRequest();
  xhr.open(method, requestUrl, true);
  xhr.setRequestHeader("Content-type", "application/json");

  // For each header sent, add it to the request
  for(var headerKey in headers){
     if(headers.hasOwnProperty(headerKey)){
       xhr.setRequestHeader(headerKey, headers[headerKey]);
     }
  }

  // If there is a current session token set, add it as a header
  if(app.config.sessionToken){
    xhr.setRequestHeader("token", app.config.sessionToken.id);
  }

  // When the request comes back, handle the response
  xhr.onreadystatechange = function() {
      if(xhr.readyState == XMLHttpRequest.DONE) {
        var statusCode = xhr.status;
        var responseReturned = xhr.responseText;

        // Callback if requested
        if(callback){
          try{
            var parsedResponse = JSON.parse(responseReturned);
            callback(statusCode, parsedResponse);
          } catch(e){
            callback(statusCode, false);
          }
        }
      }
  }

  // Send the payload as JSON
  var payloadString = JSON.stringify(payload);
  xhr.send(payloadString);

};

// Bind the logout button
app.bindLogoutButton = function(){
  document.getElementById("logoutButton").addEventListener("click", function(e){

    // Stop it from redirecting anywhere
    e.preventDefault();

    // Log the user out
    app.logUserOut();

  });
};

// Log the user out then redirect them
app.logUserOut = function(redirectUser){
  // Set redirectUser to default to true
  redirectUser = typeof(redirectUser) == 'boolean' ? redirectUser : true;

  // Get the current token id
  var tokenId = typeof(app.config.sessionToken.id) == 'string' ? app.config.sessionToken.id : false;

  // Send the current token to the tokens endpoint to delete it
  var queryStringObject = {
    'id': tokenId
  };
  app.client.request(undefined, 'api/tokens', 'DELETE', queryStringObject, undefined, function(statusCode, responsePayload){
    // Set the app.config token as false
    app.setSessionToken(false);

    // Send the user to the logged out page
    if(redirectUser){
      window.location = '/session/deleted';
    }

  });
};

// Bind the forms
app.bindForms = function(){
  //console.log('D E B U G --> app.js line 125 document.querySelector("form") value is ', document.querySelector("form"));
  if(document.querySelector("form")){
    var allForms = document.querySelectorAll("form");
    for(var i = 0; i < allForms.length; i++){
        allForms[i].addEventListener("submit", function(e){

        // Stop it from submitting
        e.preventDefault();
        var formId = this.id;
        var path = this.action;
        var method = this.method.toUpperCase();

        // Hide the error message (if it's currently shown due to a previous error)
        document.querySelector("#" + formId + " .formError").style.display = 'none';

        // Hide the success message (if it's currently shown due to a previous error)
        if(document.querySelector("#" + formId + " .formSuccess")){
          document.querySelector("#" + formId + " .formSuccess").style.display = 'none';
        }

        // Turn the inputs into a payload
        var payload = {};
        var elements = this.elements;
        for(var i = 0; i < elements.length; i++){
          if(elements[i].type !== 'submit'){
            // Determine class of element and set value accordingly
            var classOfElement = typeof(elements[i].classList.value) == 'string' && elements[i].classList.value.length > 0 ? elements[i].classList.value : '';
            var valueOfElement = elements[i].type == 'checkbox' && classOfElement.indexOf('multiselect') == -1 ? elements[i].checked : classOfElement.indexOf('intval') == -1 ? elements[i].value : parseInt(elements[i].value);
            var elementIsChecked = elements[i].checked;
            // Override the method of the form if the input's name is _method
            var nameOfElement = elements[i].name;
            if(nameOfElement == '_method'){
              method = valueOfElement;
            } else {
              // Create a payload field named "method" if the elements name is actually httpmethod
              if(nameOfElement == 'httpmethod'){
                nameOfElement = 'method';
              }
              // Create an payload field named "id" if the elements name is actually uid
              if(nameOfElement == 'uid'){
                nameOfElement = 'id';
              }
              // If the element has the class "multiselect" add its value(s) as array elements
              if(classOfElement.indexOf('multiselect') > -1){
                if(elementIsChecked){
                  payload[nameOfElement] = typeof(payload[nameOfElement]) == 'object' && payload[nameOfElement] instanceof Array ? payload[nameOfElement] : [];
                  payload[nameOfElement].push(valueOfElement);
                }
              } else {
                payload[nameOfElement] = valueOfElement;
              }

            }
          }
        }

        // If the method is DELETE, the payload should be a queryStringObject instead
        var queryStringObject = method == 'DELETE' ? payload : {};

        // Call the API
        app.client.request(undefined, path, method, queryStringObject, payload, function(statusCode, responsePayload){
          // Display an error on the form if needed
          if(statusCode !== 200){

            if(statusCode == 403){
              // log the user out
              app.logUserOut();

            } else {
              // Try to get the error from the api, or set a default error message
              var error = typeof(responsePayload.Error) == 'string' ? responsePayload.Error : 'An error has occured, please try again';

              // Set the formError field with the error text
              document.querySelector("#" + formId + " .formError").innerHTML = error;

              // Show (unhide) the form error field on the form
              document.querySelector("#" + formId + " .formError").style.display = 'block';
            }
          } else {
            // If successful, send to form response processor
            app.formResponseProcessor(formId, payload, responsePayload);
          }

        });
      });
    }
  }
};

// Form response processor
app.formResponseProcessor = function(formId, requestPayload, responsePayload){
  var functionToCall = false;
  // If account creation was successful, try to immediately log user in
  if(formId == 'accountCreate'){
    //console.log('The account creation form (accountCreate) was successfully submitted.');
    // Take the phone and password, and use it to log the user in
    var newPayload = {
      'phone': requestPayload.phone,
      'password': requestPayload.password
    };

    app.client.request(undefined, 'api/tokens', 'POST', undefined, newPayload, function(newStatusCode, newResponsePayload){
      // Display an error on the form if needed
      if(newStatusCode !== 200){

        // Set the formError field with the error text
        document.querySelector("#" + formId + " .formError").innerHTML = 'Sorry, an error has occured. Please try again.';

        // Show (unhide) the form error field on the form
        document.querySelector("#" + formId + " .formError").style.display = 'block';

      } else {
        // If successful, set the token and redirect the user
        app.setSessionToken(newResponsePayload);
        window.location = '/orders/all';
      }
    });
  }
  // If login was successful, set the token in localstorage and redirect the user
  if(formId == 'sessionCreate'){
    app.setSessionToken(responsePayload);
    window.location = '/orders/all';
  }

  // If forms saved successfully and there are success messages, show them
  var formsWithSuccessMessages = ['accountEdit1', 'accountEdit2', 'ordersEdit1'];
  if(formsWithSuccessMessages.indexOf(formId) > -1){
    document.querySelector("#" + formId + " .formSuccess").style.display = 'block';
  }

  // If user just deleted account, redirect to the account deleted page
  if(formId == 'accountEdit3'){
    app.logUserOut(false);
    window.location = '/account/deleted';
  }

  // If the user just created a new order successfully, redirect back to the Order Information page
  if(formId == 'ordersCreate'){
    window.location = '/orders/all';
  }

  // If the user just deleted a order, redirect them to the Order Information page
  if(formId == 'ordersEdit2'){
    window.location = '/orders/all';
  }

};

// Get the session token from localstorage and set it in the app.config object
app.getSessionToken = function(){
  var tokenString = localStorage.getItem('token');
  if(typeof(tokenString) == 'string'){
    try{
      var token = JSON.parse(tokenString);
      app.config.sessionToken = token;
      if(typeof(token) == 'object'){
        app.setLoggedInClass(true);
      } else {
        app.setLoggedInClass(false);
      }
    }catch(e){
      app.config.sessionToken = false;
      app.setLoggedInClass(false);
    }
  }
};

// Set (or remove) the loggedIn class from the body
app.setLoggedInClass = function(add){
  var target = document.querySelector("body");
  if(add){
    target.classList.add('loggedIn');
  } else {
    target.classList.remove('loggedIn');
  }
};

// Set the session token in the app.config object as well as localstorage
app.setSessionToken = function(token){
  app.config.sessionToken = token;
  var tokenString = JSON.stringify(token);
  localStorage.setItem('token', tokenString);
  if(typeof(token) == 'object'){
    app.setLoggedInClass(true);
  } else {
    app.setLoggedInClass(false);
  }
};

// Renew the token
app.renewToken = function(callback){
  var currentToken = typeof(app.config.sessionToken) == 'object' ? app.config.sessionToken : false;
  if(currentToken){
    // Update the token with a new expiration
    var payload = {
      'id' : currentToken.id,
      'extend' : true,
    };
    app.client.request(undefined, 'api/tokens', 'PUT', undefined, payload, function(statusCode, responsePayload){
      // Display an error on the form if needed
      if(statusCode == 200){
        // Get the new token details
        var queryStringObject = {'id' : currentToken.id};
        app.client.request(undefined, 'api/tokens', 'GET', queryStringObject, undefined, function(statusCode, responsePayload){
          // Display an error on the form if needed
          if(statusCode == 200){
            app.setSessionToken(responsePayload);
            callback(false);
          } else {
            app.setSessionToken(false);
            callback(true);
          }
        });
      } else {
        app.setSessionToken(false);
        callback(true);
      }
    });
  } else {
    app.setSessionToken(false);
    callback(true);
  }
};

// Load data on the page
app.loadDataOnPage = function(){
  // Get the current page from the body class
  var bodyClasses = document.querySelector("body").classList;
  var primaryClass = typeof(bodyClasses[0]) == 'string' ? bodyClasses[0] : false;

  // Logic for account settings page
  if(primaryClass == 'accountEdit'){
    app.loadAccountEditPage();
  }

  // Logic for Order Information page
  if(primaryClass == 'ordersList'){
    app.loadOrdersListPage();
  }

  // Logic for order details page
  if(primaryClass == 'ordersEdit'){
    app.loadOrdersEditPage();
  }

};

// Load the account edit page specifically
app.loadAccountEditPage = function(){
  // Get the phone number from the current token, or log the user out if none is there
  var phone = typeof(app.config.sessionToken.phone) == 'string' ? app.config.sessionToken.phone : false;
  if(phone){
    // Fetch the user data
    var queryStringObject = {
      'phone' : phone
    };
    app.client.request(undefined, 'api/users', 'GET', queryStringObject, undefined, function(statusCode, responsePayload){
      if(statusCode == 200){
        // Put the data into the forms as values where needed
        document.querySelector("#accountEdit1 .firstNameInput").value = responsePayload.firstName;
        document.querySelector("#accountEdit1 .lastNameInput").value = responsePayload.lastName;
        document.querySelector("#accountEdit1 .displayPhoneInput").value = responsePayload.phone;
        document.querySelector("#accountEdit1 .emailInput").value = responsePayload.email;

        // Put the hidden phone field into both forms
        var hiddenPhoneInputs = document.querySelectorAll("input.hiddenPhoneNumberInput");
        for(var i = 0; i < hiddenPhoneInputs.length; i++){
            hiddenPhoneInputs[i].value = responsePayload.phone;
        }

      } else {
        // If the request comes back as something other than 200, log the user our (on the assumption that the api is temporarily down or the users token is bad)
        app.logUserOut();
      }
    });
  } else {
    app.logUserOut();
  }
};

// Load the Order Information page specifically
app.loadOrdersListPage = function(){
  // Get the phone number from the current token, or log the user out if none is there
  var phone = typeof(app.config.sessionToken.phone) == 'string' ? app.config.sessionToken.phone : false;
  if(phone){
    // Fetch the user data
    var queryStringObject = {
      'phone' : phone
    };
    app.client.request(undefined, 'api/users', 'GET', queryStringObject, undefined, function(statusCode, responsePayload){
      if(statusCode == 200){

        // Determine how many orders the user has
        var allOrders = typeof(responsePayload.orders) == 'object' && responsePayload.orders instanceof Array && responsePayload.orders.length > 0 ? responsePayload.orders : [];
        console.log('D E B U G --> app.js line 419 Number of orders: ' + allOrders.length + '; responsePayload.orders: \n' + responsePayload.orders);
        if(allOrders.length > 0){

          // Show each created order as a new row in the table
          allOrders.forEach(function(orderId){
            // Get the data for the order
            var newQueryStringObject = {
              'id' : orderId
            };
            app.client.request(undefined, 'api/orders', 'GET', newQueryStringObject, undefined, function(statusCode, responsePayload){
              console.log('D E B U G --> app.js line 429 responsePayload is \n', responsePayload);
              if(statusCode == 200){
                var orderData = responsePayload;
                // Make the order data into a table row
                var table = document.getElementById("ordersListTable");
                var tr = table.insertRow(-1);
                tr.classList.add('orderRow');
                var td0 = tr.insertCell(0);
                var td1 = tr.insertCell(1);
                var td2 = tr.insertCell(2);
                var td3 = tr.insertCell(3);
                var td4 = tr.insertCell(4);
                td0.innerHTML = responsePayload.email;
                td1.innerHTML = responsePayload.address;
                td2.innerHTML = responsePayload.phone;
                td3.innerHTML = responsePayload.toppings;
                td4.innerHTML = '<a href="/orders/edit?id=' + responsePayload.id + '">View / Edit / Delete</a>';
              } else {
                console.log("Error trying to load order ID: ", orderId);
              }
            });
          });

          if(allOrders.length < 5){
            // Show the createOrder Call To Action
            document.getElementById("createOrderCTA").style.display = 'block';
          }

        } else {
          // Show 'you have no orders' message
          document.getElementById("noOrdersMessage").style.display = 'table-row';

          // Show the createOrder Call To Action
          document.getElementById("createOrderCTA").style.display = 'block';

        }
      } else {
        // If the request comes back as something other than 200, log the user out (on the assumption that the api is temporarily down or the users token is bad)
        app.logUserOut();
      }
    });
  } else {
    app.logUserOut();
  }
};

// Load the orders edit page specifically
app.loadOrdersEditPage = function(){
  // Get the order id from the query string, if none is found then redirect back to Order Information
  var id = typeof(window.location.href.split('=')[1]) == 'string' && window.location.href.split('=')[1].length > 0 ? window.location.href.split('=')[1] : false;
  //console.log('D E B U G --> app.js line 479 You are here at the top of the app.loadOrdersEditPage function!');
  if(id){
    // Fetch the order data
    var queryStringObject = {
      'id' : id
    };
    app.client.request(undefined, 'api/orders', 'GET', queryStringObject, undefined, function(statusCode, responsePayload){
      //console.log('D E B U G --> app.js line 486 You are here at the top of the app.client.request function in the loadOrdersEditPage!');
      if(statusCode == 200){

        // Put the hidden id field into both forms
        var hiddenIdInputs = document.querySelectorAll("input.hiddenIdInput");
        for(var i = 0; i < hiddenIdInputs.length; i++){
            hiddenIdInputs[i].value = responsePayload.id;
        }

        // Put the data into the top form as values where needed
        document.querySelector("#ordersEdit1 .displayIdInput").value = responsePayload.id;
        document.querySelector("#ordersEdit1 .emailInput").value = responsePayload.email;
        document.querySelector("#ordersEdit1 .addressInput").value = responsePayload.address;
        document.querySelector("#ordersEdit1 .phoneInput").value = responsePayload.phone;
        var toppingsCheckboxes = document.querySelectorAll("#ordersEdit1 input.toppingsInput");
        console.log('D E B U G --> app.js line 501 toppingsCheckboxes length: ' + toppingsCheckboxes.length);
        for(var i = 0; i < toppingsCheckboxes.length; i++){
          if(responsePayload.toppings.indexOf(toppingsCheckboxes[i].value) > -1){
            toppingsCheckboxes[i].checked = true;
            console.log('D E B U G --> app.js line 505 You will receive a value for toppingsCheckboxes index value: ' + i);
          } else {
            console.log('D E B U G --> app.js line 507 You will NOT receive a value for toppingsCheckboxes index value: ' + i);
          }
        }
      } else {
        // If the request comes back as something other than 200, redirect back to the Order Information page
        window.location = '/orders/all';
      }
    });
  } else {
    window.location = '/orders/all';
  }
};

// Loop to renew token often
app.tokenRenewalLoop = function(){
  setInterval(function(){
    app.renewToken(function(err){
      if(!err){
        var nowsers = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        console.log("Token renewed successfully at time: " + nowsers);
      }
    });
  },1000 * 60);
};

// Init (bootstrapping)
app.init = function(){
  // Bind all form submissions
  app.bindForms();

  // Bind logout button
  app.bindLogoutButton();

  // Get the token from localstorage
  app.getSessionToken();

  // Renew token
  app.tokenRenewalLoop();

  // Load data on page
  app.loadDataOnPage();

};

// Call the init processes after the window loads
window.onload = function(){
  app.init();
};
