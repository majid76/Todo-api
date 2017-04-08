
var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');

var app = express();
var PORT = process.env.PORT || 3000;

var todos = [];
var todoNextId = 1;

app.use(bodyParser.json());

app.get('/', function(req,res){
	res.send('Todo API root');

});

app.get('/todos',function(req,res){
	res.json(todos);

});

app.get('/todos/:id',function(req,res){
	var todoId = parseInt(req.params.id,10);
	var matchedTodo = _.findWhere(todos,{id: todoId});
	// var matchedTodo ;
	// res.send('Asking for todo with id of '+ todoId);

	// todos.forEach(function(todo){
	// 	if(todo.id === todoId ){
	// 		matchedTodo = todo;
	// 	}
	// });

	if(matchedTodo){
		res.json(matchedTodo);
		
	} else{

		res.status(404).send();
	}

});

app.post('/todos',function(req,res){
	var body = req.body;
	body.id = todoNextId++;
	todos.push(body);
	console.log('description: '+ body.description );
	res.json(todos);

});


app.listen(PORT, function(){
	console.log('Express listening on port: '+PORT);

});