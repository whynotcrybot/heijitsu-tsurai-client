import Joi from 'joi'
import HTTPStatus from 'http-status'

import BlueprintTask from '../models/task.blueprint.model.js'

export const validation = {
  createBlueprint: {
    // options: {
    //   allowUnknownBody: false
    // },
    body: {
      title: Joi.string().required()
      // type: Joi.string().only(['singular', 'repeating'])
    }
  },
  correctBlueprintId: {
    params: {
      blueprintID: Joi.string().alphanum().length(24).required()
    }
  }
}

export async function getAllBlueprints (req, res, next) {
  try {
    return res.json(await BlueprintTask.findAll())
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

export async function completeBlueprint (req, res, next) {
  try {
    const blueprint = await BlueprintTask.findById(req.params.blueprintID)
      .select({completed: {$slice: -1}})
      .populate('completed')

    if (!blueprint.active) {
      return res.status(HTTPStatus.BAD_REQUEST).send('task is not active')
    }

    if (blueprint.wasCompletedToday()) {
      return res.status(HTTPStatus.BAD_REQUEST).send('task is completed today')
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

    if (!blueprint) {
      return res.sendStatus(HTTPStatus.NOT_FOUND)
    }

    await blueprint.remove()
    return res.sendStatus(HTTPStatus.OK)
  } catch (err) {
    err.status = HTTPStatus.BAD_REQUEST
    return next(err)
  }
}
