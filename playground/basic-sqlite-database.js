	var Sequelize = require('sequelize');
	var sequelize = new Sequelize(undefined, undefined, undefined,{
				'dialect': 'sqlite',
				'storage': __dirname+'/basic-sqlite-database.sqlite'

	});

	var Todo = sequelize.define('todo',{
			description:{
					type: Sequelize.STRING,
					allowNull: false,
					validate:{
						len: [1,250]
					}

			},
			completed:{

					type: Sequelize.BOOLEAN,
					allowNull: false,
					defaultValue: false
			}

	});

	sequelize.sync({
		// force: true
	}).then(function(){

			console.log('Everything is synced');

			return Todo.findById(3).then(function(todo){
					if(todo){
						console.log(todo.toJSON());

					}else{
						console.log('Todo with id 2 does not exist');

					}

			}).catch(function(e){

				console.log(e);
			})
			// Todo.create({

			// 		description: 'Take out Trash',
			// 		completed: false

			// }).then(function(todo){
			// 	return Todo.create({

			// 		description: 'clean office'

			// 	});

			// 	}).then(function(){
			// 		// return Todo.findById(1);
			// 		return Todo.findAll({
			// 			where:{
			// 				description : {
			// 					$like: '%Office%'
			// 				}
			// 			}

			// 		});

			// }).then(function(todos){
			// 	if(todos){
			// 		todos.forEach(function(todo){
			// 			console.log(todo.toJSON());
			// 		});
					
			// 	}else{
			// 		console.log('No todo found');
			// 	}

			// }).catch(function(e){
			// 	console.log(e);

			// });

	});