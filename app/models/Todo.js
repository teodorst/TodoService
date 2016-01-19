var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var Todo = mongoose.model("Todo"  , new Schema({
    userId: {
        type: mongoose.Schema.Types.String,
        required: true
    },

    content: {
        type: mongoose.Schema.Types.String,
        required: true
    },

    completed: {
        type: mongoose.Schema.Types.Boolean,
        required: true
    }
}));

module.exports = Todo;
