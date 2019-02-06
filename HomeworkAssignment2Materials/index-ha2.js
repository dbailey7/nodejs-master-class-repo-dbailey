/*
 * Primary file for the API
 */

// Dependencies

// Declare the app
var ha2-app = {};

// Init the app
ha2-app.init = function(){

	// Start the server
	server.init();

	// Start the workers
	workers.init();

};

// execute the app
ha2-app.init();

// Export the app
module.exports = ha2-app;

//
