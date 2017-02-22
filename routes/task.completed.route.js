import express from 'express'
import * as TaskCompletedLib from '../libs/task.completed.lib'

const router = express.Router()

router.get('/completed',                 (x,y) => TaskCompletedLib.getAllCompleted(x,y))
router.get('/completed/:completedID',    (x,y) => TaskCompletedLib.getCompleted(x,y))
router.post('/completed/:blueprintID',   (x,y) => TaskCompletedLib.createCompleted(x,y))
router.delete('/completed/:completedID', (x,y) => TaskCompletedLib.deleteCompleted(x,y))

export default router