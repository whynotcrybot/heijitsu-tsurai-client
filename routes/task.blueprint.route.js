import express from 'express'
import * as TaskBlueprintLib from '../libs/task.blueprint.lib'

const router = express.Router()

router.get('/blueprints',                (x,y) => TaskBlueprintLib.getAllBlueprints(x,y))
router.get('/blueprints/available',      (x,y) => TaskBlueprintLib.getAvailableBlueprints(x,y))
router.get('/blueprint/:blueprintID',    (x,y) => TaskBlueprintLib.getBlueprint(x,y))
router.post('/blueprint',                (x,y) => TaskBlueprintLib.createBlueprint(x,y))
router.delete('/blueprint/:blueprintID', (x,y) => TaskBlueprintLib.deleteBlueprint(x,y))

export default router