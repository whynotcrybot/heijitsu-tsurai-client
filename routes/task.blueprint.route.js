import express from 'express'
import * as TaskBlueprintLib from '../libs/task.blueprint.lib'

const router = express.Router()

router.get('/tasks',                (x,y) => TaskBlueprintLib.getAll(x,y))
router.get('/task/:blueprintID',    (x,y) => TaskBlueprintLib.getTask(x,y))
router.post('/task',                (x,y) => TaskBlueprintLib.createNewTask(x,y))
router.delete('/task/:blueprintID', (x,y) => TaskBlueprintLib.deleteSpecificTask(x,y))

export default router