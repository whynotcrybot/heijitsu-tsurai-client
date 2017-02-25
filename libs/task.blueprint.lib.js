import BlueprintTask from '../models/task.blueprint.model.js'

export {
  getAllBlueprints,
  getAvailableBlueprints,
  getBlueprint,
  createBlueprint,
  deleteBlueprint
}

function getAllBlueprints(req, res){
  BlueprintTask
    .find()
    .lean()
    .then(tasks => res.json(tasks))
    .catch(error => console.error('Error: ', error))
}

//TODO: continue in appropriate branch
function getAvailableBlueprints(req, res){
/*  BlueprintTask
    .findAvailable()
    .then(tasks => res.json(tasks))
    .catch(error => console.error('Error: ', error))*/
}

function getBlueprint(req, res){
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

function createBlueprint(req, res){
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
function deleteBlueprint(req, res){
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