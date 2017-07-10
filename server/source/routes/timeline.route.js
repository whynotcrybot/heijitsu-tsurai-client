import { Router } from 'express'
import * as Timeline from '../controllers/timeline.controller'

const router = new Router()

router.get('/',
  (x, y) => Timeline.getTimeline(x, y))

export default router
