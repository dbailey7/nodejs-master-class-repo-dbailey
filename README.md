# nodejs-master-class-repo-dbailey

Homework Assignment #1

Course Assignments for The Node.js Master Class, from David Bailey

The first entry in this project is for Homework Assignment #1 ...

This is a simple "Hello, happy World!" RESTful JSON API app, that listens on 
port 12321.  Any posts to this route with the path /hello, will greet
the poster with a "Hello, Happy World!" message and some JSON-formatted text. 
Enjoy,

David Bailey
david.bailey@meedpartners.com


P.S. To run this example ...

Pull the code (index.js & config.js) from the HomeworkAssignment1Materials 
folder down to your local box where you want to run from.  Then, fire up,  
say, a BASH shell in the folder where the code is.  Then run ...
$ node index.js

Fire up another shell, again, in the folder where the code is.  Then run ...
$ curl localhost:12321/hello, or browser to localhost:12321/hello

Um, you 'do' have Node.js and curl installed, yes?

---------------------------------------------------------------------------------

Homework Assignment #2

Course Assignments for The Node.js Master Class, from David Bailey continued ...

Greetings,

This entry for this project is for meeting the requirements of The Node.js Master Class, "Homework Assignment #2". 

The requirements are:

Build an API for a pizza-delivery company. Build the API, only; a frontend is not required. The app specifications for the project are as follows:

1. New users can be created, their information can be edited, and they can be deleted. We should store their name, email address, and street address.

2. Users can log in or out by creating or destroying (deleting) a token.

3. When a user is logged in, they should be able to GET all the possible menu items (these items can be hardcoded into the application).

4. A logged-in user should be able to fill a shopping cart with menu items

5. A logged-in user should be able to create an order. You should integrate with the Sandbox of Stripe.com to accept their payment. Note: Use the stripe sandbox for your testing. Follow this link and click on the "tokens" tab to see the fake tokens that can be used server-side to confirm the integration is working properly: https://stripe.com/docs/testing#cards

6. When an order is placed, the user should be emailed a receipt. We will Integrate with the sandbox of Mailgun.com for this app (https://www.mailgun.com/), so, no DNS setup for a domain needs to be done

See my public GitHub repo (you are here) for the code and documentation for this assignment. Cheers,

David

The code modules and console output screen shots are listed in the "HomeworkAssignment2Materials.md" file in 
the "HomeworkAssignment2Materials" folder.  To actually run these examples, you'll need to replace any strings
in the code modules beginning with "YOUR-" to your own values.

---------------------------------------------------------------------------------

Any questions can be sent to me at david.bailey@meedpartners.com
