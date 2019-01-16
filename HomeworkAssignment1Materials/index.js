/*
 * Primary file for the API
 *
 *
 * Hello!  This version of index.js was produced in order to console log out the
 * string "Hello, Happy World!" for the Homework Assignment 1 requirement.
 *
 */

// Dependencies
var http = require('http');
var url = require('url');

// The server should respond to all requests with a string
var server = http.createServer(function(req, res){

// Get the URL and parse it
var parsedUrl = url.parse(req.url, true);

// Get the path
var path = parsedUrl.pathname;
var trimmedPath = path.replace(/^\/+|\/+$/g, '');

// Get the query string as an object
var queryStringObject = parsedUrl.query;

// Get the HTTP method
var method = req.method.toLowerCase();

// Get the headers as an object
var headers = req.headers;

// Send the response
res.end('Hello, Happy World!\n');
console.log('Hello, Happy World!');

});

// Start the server, and have it listen on port 3000
server.listen(12321, function(){
        console.log("The server is now listening on port 12321 ...")
});
