import BlueprintTask from '../models/task.blueprint.model.js'

export function getAllBlueprints (req, res) {
  BlueprintTask
    .find()
    .lean()
    .then(blueprints => res.json(blueprints))
    .catch(error => {
      console.error("Error:", error)
      res.json({error})
    })
}

export function getAvailableBlueprints (req, res) {
  BlueprintTask
    .find({'active': true})
    .slice('completed', -1)
    .lean()
    .filter(bp => bp)
    .then(blueprints => res.json(blueprints))
    .catch(error => {
      console.error("Error:", error)
      res.json({error})
    })
}

export function getBlueprint (req, res) {
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

export function completeBlueprint (req, res) {
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
    .findOne({_id : blueprintID})
    //does exist?
    .then(bp => {
      if(bp) return bp
      else throw "blueprint not found"
    })
    //is active?
    .then(bp => {
      if(bp.active) return bp
      else throw "blueprint is not active"
    })
    //was not completed today?
    .then(bp => {
      if(bp.completed.length){
        const lastCompletedTask = bp.completed[bp.completed.length-1]
        const lastCompletedAt = lastCompletedTask.completedAt.toDateString()
        const currentDate = (new Date).toDateString()

        if(lastCompletedAt === currentDate)
          throw "today's task is already completed"
      }
      return bp
    })
    .then(bp => bp.complete())
    .then(bp => bp.save())
    .then(bp => res.json(bp))
    .catch(error => {
      console.error("Error:", error)
      res.json({error})
    })
}

export function uncompleteBlueprint (req, res) {
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

  //todo: complete
}

export function createBlueprint (req, res) {
  const blueprint = new BlueprintTask({
	  title  : req.body.title,
		type	 : req.body.type
	});

	blueprint
    .save()
  	.then(bp => res.json(bp))
    .catch(error => {
      console.error("Error:", error)
      res.json({error})
    })
}

export function deleteBlueprint (req, res) {
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
    .findOneAndRemove({_id : blueprintID})
    //does exist?
    .then(bp => {
      if(bp) return bp
      else throw "blueprint not found"
    })
    .then(() => res.json({message: "success"}))
    .catch(error => {
      console.error("Error:", error)
      res.json({error})
    })
}
