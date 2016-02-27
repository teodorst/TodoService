var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var TodoSchema = new Schema({
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
});

module.exports = mongoose.model('Todo', TodoSchema);
