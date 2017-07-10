import { Router } from 'express'
import * as TaskBlueprintLib from '../controllers/task.blueprint.controller'

const router = new Router()

router.get('/',
  (x, y) => TaskBlueprintLib.getAllBlueprints(x, y))

router.get('/available',
  (x, y) => TaskBlueprintLib.getAvailableBlueprints(x, y))

router.get('/:blueprintID',
  (x, y) => TaskBlueprintLib.getBlueprint(x, y))

router.post('/:blueprintID/complete',
  (x, y) => TaskBlueprintLib.completeBlueprint(x, y))

router.post('/:blueprintID/uncomplete',
  (x, y) => TaskBlueprintLib.uncompleteBlueprint(x, y))

router.post('/',
  (x, y) => TaskBlueprintLib.createBlueprint(x, y))

router.delete('/:blueprintID',
  (x, y) => TaskBlueprintLib.deleteBlueprint(x, y))

export default router
