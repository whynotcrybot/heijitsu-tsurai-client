import express from 'express'
import * as TaskCompletedLib from '../libs/task.completed.lib'

const router = express.Router()

router.get('/tasks/completed',       (x,y) => TaskCompletedLib.getAll(x,y))
router.get('/task/completed/:id',    (x,y) => TaskCompletedLib.getTask(x,y))
router.post('/task/completed/:id',   (x,y) => TaskCompletedLib.createNewCompletedTask(x,y))
router.delete('/task/completed/:id', (x,y) => TaskCompletedLib.deleteSpecificCompletedTask(x,y))

export default router