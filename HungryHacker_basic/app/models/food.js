var mongoose = require('mongoose');

module.exports = mongoose.model('Food', {
    food_name: {
        type: String,
        default: ''
    },
    food_desc: {
        type: String,
        default: ''
    },
    food_cost: {
        type: Number,
        default: ''
    }
});