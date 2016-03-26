var amqp = require('amqp'), util = require('util');
var mongoose = require('mongoose'); 
var database = require('./services/database'); 

var food = require('./services/foodDetails'), 
http = require('http');

mongoose.connect(database.localUrl); 

var cnn = amqp.createConnection({
	host : '127.0.0.1'
});


cnn.on('ready', function() {
	console.log("listening on Food application");
	

	//saveNewCard_queue
	cnn.queue('get_foods', function(q){
		q.subscribe(function(message, headers, deliveryInfo, m){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			food.handle_request_get_foods(message, function(err,res){
				console.log("After getting food details" + res);
				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		});
	});
	
	
	
	
	cnn.queue('get_total', function(q){
		q.subscribe(function(message, headers, deliveryInfo, m){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			food.handle_request_get_total(message, function(err,res){
				console.log("After finding total" + res);
				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		});
	});
	
	
	
	
	cnn.queue('add_food', function(q){
		q.subscribe(function(message, headers, deliveryInfo, m){
			util.log(util.format( deliveryInfo.routingKey, message));
			util.log("Message: "+JSON.stringify(message));
			util.log("DeliveryInfo: "+JSON.stringify(deliveryInfo));
			food.handle_request_add_food(message, function(err,res){
				console.log("After Adding" + res);
				//return index sent
				cnn.publish(m.replyTo, res, {
					contentType:'application/json',
					contentEncoding:'utf-8',
					correlationId:m.correlationId
				});
			});
		});
	});
	
	
});