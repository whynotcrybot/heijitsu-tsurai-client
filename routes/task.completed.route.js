import express from 'express'
import * as TaskCompletedLib from '../libs/task.completed.lib'

const router = express.Router()

router.get('/tasks/completed',                (x,y) => TaskCompletedLib.getAll(x,y))
router.get('/task/completed/:completedID',    (x,y) => TaskCompletedLib.getTask(x,y))
router.post('/task/completed/:blueprintID',   (x,y) => TaskCompletedLib.createNewCompletedTask(x,y))
router.delete('/task/completed/:completedID', (x,y) => TaskCompletedLib.deleteSpecificCompletedTask(x,y))

export default router