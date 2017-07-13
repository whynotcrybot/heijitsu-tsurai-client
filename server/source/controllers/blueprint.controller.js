import Joi from 'joi'
import HTTPStatus from 'http-status'

import BlueprintTask from '../models/task.blueprint.model.js'

export const validation = {
  createBlueprint: {
    options: {
      allowUnknownBody: false
    },
    body: {
      title: Joi.string().required(),
      type: Joi.string().only(['singular', 'repeating'])
    }
  }
}

export async function getAllBlueprints (req, res, next) {
  try {
    return res.json(await BlueprintTask.find().populate('completed'))
  } catch (e) {
    e.status = HTTPStatus.BAD_REQUEST
    return next(e)
  }
}

export async function getAvailableBlueprints (req, res, next) {
  try {
    return res.json(await BlueprintTask.findAvailable())
  } catch (e) {
    e.status = HTTPStatus.BAD_REQUEST
    return next(e)
  }
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

export function completeBlueprint1 (req, res) {
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

export async function completeBlueprint (req, res, next) {
  try {
    const blueprint = await BlueprintTask.findById(req.params.blueprintID)
      .select({completed: {$slice: -1}})
      .populate('completed')

    if (!blueprint.active) {
      return res.status(HTTPStatus.BAD_REQUEST).send('task is not active')
    }

    if (blueprint.completed.length) {
      const lastCompletedTask = blueprint.completed[blueprint.completed.length - 1]
      const lastCompletedAt = lastCompletedTask.completedAt.toDateString()
      const currentDate = new Date().toDateString()

      if (lastCompletedAt === currentDate) {
        return res.status(HTTPStatus.BAD_REQUEST).send('task is completed today')
      }
    }

    await blueprint.complete()

    return res.sendStatus(HTTPStatus.OK)
  } catch (err) {
    err.status = HTTPStatus.BAD_REQUEST
    return next(err)
  }
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

export async function createBlueprint (req, res, next) {
  try {
    const blueprint = await BlueprintTask.create(req.body)
    return res.status(HTTPStatus.CREATED).json(blueprint)
  } catch (e) {
    e.status = HTTPStatus.BAD_REQUEST
    return next(e)
  }
}

export async function deleteBlueprint (req, res, next) {
  try {
    const blueprint = await BlueprintTask.findById(req.params.blueprintID)

    await blueprint.remove()
    return res.sendStatus(HTTPStatus.OK)
  } catch (err) {
    err.status = HTTPStatus.BAD_REQUEST
    return next(err)
  }
}
