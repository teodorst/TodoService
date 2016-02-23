var mongoose = require('mongoose');
var Todo = require('../models/Todo.js');
mongoose.Promise = require('q').Promise;
mongoose.connect('mongodb://localhost/todos');


var db;
var todoStore = {};

todoStore.connect = function(connectionURL) {
    db = mongoose.connection;
    db.on('error', function() {
        console.log("connection error");
    });
    db.once("open", function() {
        console.log("DB connection ................ OK ");
    });
}

todoStore.getTodos = function( userId ) {
    return Todo.find( { userId: userId } );    
}

todoStore.addTodo = function( userId, todoText ){
    
    return new Todo({
        userId: userId,
        content: todoText,
        completed: false
    }).save();

}

todoStore.removeTodo = function (userId) {
    console.log("okkk");
    return Todo.findByIdAndRemove(userId);
}

todoStore.updateTodo = function ( id, newTodo ) {
    console.log( newTodo );
    return Todo.findByIdAndUpdate( id, { 
        content: newTodo.content,
        completed : newTodo.completed
    });
}; 

module.exports = todoStore;