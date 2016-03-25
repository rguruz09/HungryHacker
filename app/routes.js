var Food = require('./models/food');

function getFoods(res) {
    Food.find(function (err, foods) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(foods); // return all todos in JSON format
    });
}
;


function getTotal(res){

    // db.foods.aggregate([{$group : { _id : null,     total : { $sum : "$food_cost" } }}])

    Food.aggregate([{$group : { _id : null,     total : { $sum : "$food_cost" } }}], function(err, food){
        if(err)
            res.send(err);

        console.log(food.length);
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
        

        });
};

module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/foods', function (req, res) {
        // use mongoose to get all todos in the database
        getFoods(res);
    });

    // create todo and send back all todos after creation
    app.post('/api/foods', function (req, res) {

        // create a todo, information comes from AJAX request from Angular
        Food.create({
            food_name: req.body.food_name,
            food_desc: req.body.food_desc,
            food_cost: req.body.food_cost,
            done: false
        }, function (err, food) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            getFoods(res);
        });

    });

    // delete a todo
    app.delete('/api/foods/:food_id', function (req, res) {
        Food.remove({
            _id: req.params.food_id
        }, function (err, food) {
            if (err)
                res.send(err);

            getFoods(res);
        });
    });

    //get total cost
    app.get('/api/total', function (req, res) {
        // use mongoose to get all todos in the database
        getTotal(res);
    });


    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};