var Food = require('./models/food');

function getFoods(res) {
    Food.find(function (err, foods) {

        if (err) {
            res.send(err);
        }
        res.json(foods); 
    });
};


function getTotal(res){

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

    app.get('/api/foods', function (req, res) {
        getFoods(res);
    });


    app.post('/api/foods', function (req, res) {

        Food.create({
            food_name: req.body.food_name,
            food_desc: req.body.food_desc,
            food_cost: req.body.food_cost,
            done: false
        }, function (err, food) {
            if (err){
                res.send(err);
            }else{
                getFoods(res);    
            }            
        });

    });


    app.delete('/api/foods/:food_id', function (req, res) {
        Food.remove({
            _id: req.params.food_id
        }, function (err, food) {
            if (err){
                res.send(err);
            }else{
                getFoods(res);    
            }            
        });
    });

    app.get('/api/total', function (req, res) {
        getTotal(res);
    });


    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });

};