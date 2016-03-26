var Food = require('./models/food');
var mq_client = require('./rpc/client');

function getFoods(res) {


    var msg_payload = {};

    mq_client.make_request('get_foods',msg_payload, function(err,results){
        console.log(results);
        if(err){
            throw err;
        }   
        else 
        {
            res.json(results);
        }  
    });
}
;


function getTotal(res){

    var msg_payload = {};

    mq_client.make_request('get_total',msg_payload, function(err,food){
        console.log(food);
        if(err){
            throw err;
        }   
        else 
        {
            if(food.length > 0){
                var ttl = food[0].total;
                ttl = ttl + ttl*0.075;
                console.log(ttl);
                res.json({
                    total : ttl
                } );    
            }else{
                console.log(ttl);
                res.json({
                    total : 0
                } );    
            }
        }  
    });
};

module.exports = function (app) {

    // GET API for getting all the food orders
    app.get('/api/foods', function (req, res) {
        getFoods(res);
    });


    // POST API for adding new food item
    app.post('/api/foods', function (req, res) {

        var food_name = req.body.food_name;
        var food_desc = req.body.food_desc;
        var food_cost = req.body.food_cost;

        var msg_payload = {"food_name" : food_name, "food_desc" : food_desc, "food_cost" : food_cost};
        mq_client.make_request('add_food',msg_payload, function(err,food){
            if(err){
                console.log("Error");
                res.send(err);
            }   
            else 
            {
                console.log("results from post food");
                getFoods(res);
            }  
        });
    });


    // DELETE API to delete a food
    app.delete('/api/foods/:food_id', function (req, res) {
        Food.remove({
            _id: req.params.food_id
        }, function (err, food) {
            if (err){                
                res.send(err);
            }
            else{
                getFoods(res);
            }
        });
    });


    //GET API to get the total cost
    app.get('/api/total', function (req, res) {
        getTotal(res);
    });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};