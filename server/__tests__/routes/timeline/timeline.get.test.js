/* global describe it before */
import { expect } from 'chai'

import server from '../../../__mocks__/utils/server.mock'
import BlueprintFactory from '../../../__mocks__/factories/blueprint.factory'
import BlueprintTask from '../../../source/models/task.blueprint.model'
import CompletedTask from '../../../source/models/task.completed.model'

const ENDPOINT = '/timeline'

let testBlueprint
let testBlueprint2
let testBlueprint3
let testCompletedTask
let testCompletedTask1
let testCompletedTask2
let testCompletedTask3

describe('GET ' + ENDPOINT, () => {
  before(async () => {
    await BlueprintTask.remove()
    await CompletedTask.remove()
    testTile = await Tile.create(TileFactory.generate())
  })

  describe('Get', () => {
    it('should get a timeline for current week', done => {
      server
        .get(ENDPOINT)
        .end((err, res) => {
          const { body, status } = res

          expect(err).to.be.null

          done()
        })
    })
  })
})
