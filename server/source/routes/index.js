import { Router } from 'express'

import HealthyRoute from './healthy.route'
import TaskBlueprintRoute from './blueprint.route'
import TimelineRoute from './timeline.route'

const router = new Router()

router.use('/healthy', HealthyRoute)
router.use('/blueprints', TaskBlueprintRoute)
router.use('/timeline', TimelineRoute)

export default router
