var todoStore = require('../stores/todoStore.js')


var todoRoutes = function (app) {
    
    app.post( '/api/:userId/todos', function(req, res) {
        console.log(req.body);
        var userId = req.params.userId;
        todoStore.addTodo(userId, req.body.content)
            .then( function( todo ) {
                res.status(200).json({
                    lenght : 1,
                    todo: todo
                })
            })  
            .catch( function(err) {
                res.status(401).json();
            });
    });

    app.get( '/api/:userId/todos', function(req, res) {
        var userId = req.params.userId;
        todoStore.getTodos( userId )
            .then( function( todos ) {
                if( todos.lenght === 0 ) {
                    res.status(404).json({
                        errorMsg: 'not found'    
                    });
                }
                else {
                    res.status(200).json({
                        lenght: todos.lenght,
                        todos: todos
                    });    
                }
            })
            .catch( function(err) {
                res.status(401).json();
            });
    });     
    
    app.put( '/api/:userId/todos/:todoId', function(req, res) {
        todoStore.updateTodo( req.params.todoId, req.body)
            .then(function(data) {
                res.status(200).json({
                    lenght: 1,
                    todo: data
                });
            })
            .catch( function(err) {
                res.status(404).json();
            });
    });


    app.delete( '/api/:userId/todos/:todoId', function( req, res ){
        todoStore.removeTodo( req.params.todoId )
            .then( function( data ) {
                res.status(200).json();
            })
            .catch( function( err ) {
                res.status(404).json();
            });
    });
}

module.exports = todoRoutes;