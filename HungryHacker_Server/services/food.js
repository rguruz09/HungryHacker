/**
 * http://usejsdoc.org/
 */
var mongoose = require('mongoose');

module.exports = mongoose.model('Food', {
    food_name: {
        type: String
    },
    food_desc: {
        type: String
    },
    food_cost: {
        type: Number
    }
});