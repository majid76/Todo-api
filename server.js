
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
	var obj = _.pick(body,'description','completed');
	if(!_.isBoolean(obj.completed) || !_.isString(obj.description) || obj.description.trim().length === 0){
		return res.status(400).send();
	}
	obj.id = todoNextId++;
	obj.description = obj.description.trim();
	todos.push(obj);
	console.log('description: '+ body.description );
	res.json(todos);


});

app.delete('/todos/:id',function(req,res){
	var todoId = parseInt(req.params.id);
	var matchedTodo = _.findWhere(todos,{id:todoId});

	if(!matchedTodo){		
			res.send('id does not exist');
			res.status(404).send();
	}else{
			
		 todos = _.without(todos,matchedTodo);
		 res.json(matchedTodo);
		 
	
	}
	
})
// var todos = [];

app.listen(PORT, function(){
	console.log('Express listening on port: '+PORT);

});