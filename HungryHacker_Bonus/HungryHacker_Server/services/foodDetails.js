var Food = require('./food');

function handle_request_get_foods (msg,callback) {

	console.log("In handle_get_drivers_queue request:");	
		
	Food.find(function (err, foods) {
		if (err) {
			callback(err,null);
		}else{
			console.log("After successful res");
			callback(null,foods);
			}
     });
}

function handle_request_get_total (msg,callback) {

	Food.aggregate([{$group : { _id : null,     total : { $sum : "$food_cost" } }}], function(err, food){
		if(err){
			callback(err,null);
		}			
		else{
			callback(null,food);
		}
			
  });
}

function handle_request_add_food (msg,callback) {

	var req_food_name = msg.food_name;
	var req_food_desc = msg.food_desc;
	var req_food_cost = msg.food_cost;
	
	console.log("Adding - "+ req_food_name + " "+  req_food_desc + " " +req_food_cost);
	
	Food.create({
	    food_name: req_food_name,
	    food_desc: req_food_desc,
	    food_cost: req_food_cost
	}, function (err, food) {
		if(err){
			callback(err,null);
		}			
		else{
			callback(null,food);
		}			
	});
}


exports.handle_request_add_food = handle_request_add_food;
exports.handle_request_get_total = handle_request_get_total;
exports.handle_request_get_foods = handle_request_get_foods;
