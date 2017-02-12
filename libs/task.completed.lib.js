import BlueprintTask from '../models/task.blueprint.model.js'
import CompletedTask from '../models/task.completed.model.js'

export function getAll(req, res){
  CompletedTask
    .findAll()
    .then(tasks => res.json(tasks))
    .catch(error => console.error('Error: ', error));
}
export function getTask(req, res){
  res.send('info about specific task that is completed')
}
export function createNewCompletedTask(req, res){
  const blueprint = req.body.id;
  BlueprintTask
    .doesExist(blueprint)
    .then(x => x ? CompletedTask.add(blueprint) : "Task does not exist.")
    .then(x => res.json(x))
    .catch(error => console.error('Error: ', error));
}
export function deleteSpecificCompletedTask(req, res){
  res.send('uncomplete a specific task')
}