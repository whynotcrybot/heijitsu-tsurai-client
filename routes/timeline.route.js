import express from 'express'
import * as Timeline from '../controllers/timeline.controller'

const router = express.Router()

router.get('/timeline',
  (x,y) => Timeline.getTimeline(x,y))

export default router