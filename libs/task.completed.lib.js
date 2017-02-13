import BlueprintTask from '../models/task.blueprint.model.js'
import CompletedTask from '../models/task.completed.model.js'

export function getAll(req, res){
  CompletedTask
    .findAll()
    .then(tasks => res.json(tasks))
    .catch(error => console.error('Error: ', error))
}

export function getTask(req, res){
  const completedID = req.params.completedID

  if (!completedID.match(/^[0-9a-fA-F]{24}$/)) {
    return res.json({
      message: "id is malformed"
    })
  }

  if (!completedID.length) {
    return res.json({
      message: "id is empty"
    })
  }

  CompletedTask
    .get(completedID)
    .then(task => res.json(task))
    .catch(error => {
      console.error("Error:", error)
      res.json({error})
    })
}

export function createNewCompletedTask(req, res){
  const blueprintID = req.params.blueprintID

  if (!blueprintID.match(/^[0-9a-fA-F]{24}$/)) {
    return res.json({
      message: "id is malformed"
    })
  }

  if (!blueprintID.length) {
    return res.json({
      message: "id is empty"
    })
  }

  BlueprintTask
    .doesExist(blueprintID)
    .then(exists => {
      if(!exists) throw "task not found"
    })
    .then(
      () => CompletedTask
        .findOne()
        .select({createdAt: true})
        .sort({createdAt: -1})
    )
    .then(task => {
      if(task && task.createdAt.toDateString() === (new Date).toDateString()){
        throw "today's task is already completed"
      }
    })
    .then(() => CompletedTask.add(blueprintID))
    .then(task => res.json(task))
    .catch(error => {
      console.log(error)
      res.json({error: error})
    })
}

export function deleteSpecificCompletedTask(req, res){
  res.send('uncomplete a specific task')
}