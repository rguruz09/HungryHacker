# HungryHacker

This is a online ordering web application which developed in NodeJS for  web server, AngularJS for frontend and MongoDB for storing the data.


Structure:
There are two versions of the application in two separate folders.

1. Without Bonus: This is basic version of application without any bonus features implemented. All the requirements are covered.
2. With Bonus: This implementation has additional features which helps in easy scaling of the application.
	The application is spilt into two, HungryHacker_Client and HungryHacker_Server. 
	Client code consist of web server code and frontend implemented in NodeJS and AngularJS.
	Server code consists of Backend Database implementation with Messaging interface.
	  
 

Usage:

For basic version:
1. Clone the project.
2. Navigate to HungryHacker_Basic folder.
3. Install the application, npm install
4. Start the server, node server.js
5. View in browser at, http://localhost:8080


For MQ version:
1. Clone the project.
2. Install the RabbitMQ from https://www.rabbitmq.com/download.html
3. Navigate to HungryHacker_Server folder and run npm install.
4. Start the server, node MQServer.js 
5. Navigate to HungryHacker_Client folder and run npm install.
6. Start the client, node server.js 
5. View in browser at, http://localhost:8080
