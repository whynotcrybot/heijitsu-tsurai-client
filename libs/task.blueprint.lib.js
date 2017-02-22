import BlueprintTask from '../models/task.blueprint.model.js'

export {
  getAll,
  getTask,
  createNewTask,
  deleteSpecificTask
}

function getAll(req, res){
  BlueprintTask
    .findAll()
    .then(tasks => res.json(tasks))
    .catch(error => console.error('Error: ', error))
}

function getTask(req, res){
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
    .get(blueprintID)
    .then(x => res.json(x))
    .catch(error => {
      console.error("Error:", error)
      res.json({error})
    })
}

function createNewTask(req, res){
  const task = new BlueprintTask({
	  title  : req.body.title,
		active : true,
		type	 : req.body.type
	});

	task
    .save()
  	.then((task) => res.json(task))
    .catch(error => {
      console.error("Error:", error)
      res.json({error})
    })
}

//todo: rething and rewrite
function deleteSpecificTask(req, res){
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
    .delete(blueprintID)
    .then(x => res.json(x))
    .catch(error => {
      console.error("Error:", error)
      res.json({error})
    })
}