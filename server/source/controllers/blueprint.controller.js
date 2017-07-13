import Joi from 'joi'
import HTTPStatus from 'http-status'

import BlueprintTask from '../models/task.blueprint.model.js'

export const validation = {
  createBlueprint: {
    options: {
      allowUnknownBody: false
    },
    body: {
      title: Joi.string().required()
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
    return res.json(await BlueprintTask.findAllBlueprints())
  } catch (e) {
    e.status = HTTPStatus.BAD_REQUEST
    return next(e)
  }
}

export async function getAvailableBlueprints (req, res, next) {
  try {
    return res.json(await BlueprintTask.findAvailableBlueprints())
  } catch (e) {
    e.status = HTTPStatus.BAD_REQUEST
    return next(e)
  }
}

export async function getBlueprint (req, res, next) {
  try {
    const blueprint = await BlueprintTask.findBlueprint(req.params.blueprintID)

    if (!blueprint) {
      return res.sendStatus(HTTPStatus.NOT_FOUND)
    }

    return res.status(HTTPStatus.OK).json(blueprint)
  } catch (err) {
    err.status = HTTPStatus.BAD_REQUEST
    return next(err)
  }
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

export async function uncompleteBlueprint (req, res, next) {
  try {
    const blueprint = await BlueprintTask.findById(req.params.blueprintID)
      .select({completed: {$slice: -1}})
      .populate('completed')

    if (!blueprint.active) {
      return res.status(HTTPStatus.BAD_REQUEST).send('task is not active')
    }

    if (!blueprint.wasCompletedToday()) {
      return res.status(HTTPStatus.BAD_REQUEST).send('task was not completed today')
    }

    await blueprint.uncomplete()

    return res.sendStatus(HTTPStatus.OK)
  } catch (err) {
    err.status = HTTPStatus.BAD_REQUEST
    return next(err)
  }
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
