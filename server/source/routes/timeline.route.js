import { Router } from 'express'
import * as TimelineController from '../controllers/timeline.controller'

const router = new Router()

router.get('/', TimelineController.getTimeline)

export default router
