import { Router } from 'express'
import validate from 'express-validation'

import * as BlueprintConroller from '../controllers/blueprint.controller'

const router = new Router()

router.get('/', BlueprintConroller.getAllBlueprints)

router.get('/available', BlueprintConroller.getAvailableBlueprints)

router.get('/:blueprintID', BlueprintConroller.getBlueprint)

router.post('/:blueprintID/complete', BlueprintConroller.completeBlueprint)

router.post('/:blueprintID/uncomplete', BlueprintConroller.uncompleteBlueprint)

router.post(
  '/',
  validate(BlueprintConroller.validation.createBlueprint),
  BlueprintConroller.createBlueprint
)

router.delete('/:blueprintID', BlueprintConroller.deleteBlueprint)

export default router
