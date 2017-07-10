import { Router } from 'express'

import TaskBlueprintRoute from './task.blueprint.route'
import TimelineRoute from './timeline.route'

const router = new Router()

router.use('/blueprints', TaskBlueprintRoute)
router.use('/timeline', TimelineRoute)

export default router
