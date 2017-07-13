import { Router } from 'express'
import validate from 'express-validation'

import * as BlueprintConroller from '../controllers/blueprint.controller'

const router = new Router()

router.get('/', BlueprintConroller.getAllBlueprints)

router.get('/available', BlueprintConroller.getAvailableBlueprints)

router.get(
  '/:blueprintID',
  validate(BlueprintConroller.validation.correctBlueprintId),
  BlueprintConroller.getBlueprint
)

router.post(
  '/:blueprintID/complete',
  validate(BlueprintConroller.validation.correctBlueprintId),
  BlueprintConroller.completeBlueprint
)

router.post(
  '/:blueprintID/uncomplete',
  validate(BlueprintConroller.validation.correctBlueprintId),
  BlueprintConroller.uncompleteBlueprint
)

router.post(
  '/',
  validate(BlueprintConroller.validation.createBlueprint),
  BlueprintConroller.createBlueprint
)

router.delete(
  '/:blueprintID',
  validate(BlueprintConroller.validation.correctBlueprintId),
  BlueprintConroller.deleteBlueprint
)

export default router
