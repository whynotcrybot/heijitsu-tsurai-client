import HTTPStatus from 'http-status'

import BlueprintTask from '../models/task.blueprint.model.js'

export async function getTimeline (req, res, next) {
  try {
    return res.json(await BlueprintTask.getTimeline())
  } catch (e) {
    e.status = HTTPStatus.BAD_REQUEST
    return next(e)
  }
}
