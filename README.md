# nodejs-master-class-repo-dbailey

Homework Assignment #1

Course Assignments for The Node.js Master Class, from David Bailey

The first entry in this project is for Homework Assignment #1 ...

This is a simple "Hello, World!" RESTful JSON API app, that listens on 
port 12321.  Any posts to this route with the path /hello, will greet
the poster with a "Hello, World!" message and some JSON-formatted text. 
Enjoy,

David Bailey
david.bailey@technologist.com


P.S. To run this example ...

Pull the code (index.js & config.js) down to your local box.  Fire up, say, 
a BASH shell in the folder where the code is.  Then run ...
$ node index.js

Fire up another shell, again, in the folder where the code is.  Then run ...
$ curl localhost:12321/hello
