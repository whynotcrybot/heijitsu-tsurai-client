import BlueprintTask from '../models/task.blueprint.model.js'

export function getAll(req, res){
  BlueprintTask
    .findAll()
    .then(tasks => res.json(tasks))
    .catch(error => console.error('Error: ', error));
}
export function getSpecificTask(req, res){
  res.send('info about specific task')
}
export function createNewTask(req, res){
  const task = new BlueprintTask({
	  title  : req.body.title,
		active : true,
		type	 : req.body.type
	});

	task
    .save()
  	.then((task) => res.json(task))
  	.catch((error) => console.error('Error: ', error))
}
export function deleteSpecificTask(req, res){
  res.send('delete a specific task')
}