var Todo = require('../models/Todo.js');
var todoStore = {};


todoStore.getTodos = function( userId ) {
    return Todo.find( { userId: userId } );
}

todoStore.addTodo = function( userId, todoText ){
  console.log("Add Todo:", todoText)
  return new Todo({
      userId: userId,
      content: todoText,
      completed: false
  }).save();

};

todoStore.removeTodo = function (userId) {
    console.log("Remove Todo:", userId);
    return Todo.findByIdAndRemove(userId);
}

todoStore.updateTodo = function ( id, newTodo ) {
    console.log("Update Todo :", newTodo );
    return Todo.findByIdAndUpdate( id, {
        content: newTodo.content,
        completed : newTodo.completed
    });
};

module.exports = todoStore;
